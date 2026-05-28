import { ConsentService } from "@/services/consent.service";
import { StateService } from "@/services/state.service";
import { TicketService } from "@/services/ticket.service";
import { UserService } from "@/services/user.service";
import { UserDataService } from "@/services/user-data.service";
import { NotificationService } from "@/services/notification.service";
import { FSM_STATES } from "@/bot/states/user.states";
import { ROLES } from "@/bot/constants/roles";
import {
  getTeacherByKey,
} from "@/bot/constants/categories";
import {
  getConfirmationKeyboard,
  getAfterCreateKeyboard,
  getStudentTicketActionsKeyboard,
  getDeleteConfirmKeyboard,
  getSlotSelectionKeyboard,
  getSimilarDecisionKeyboard,
  getRecommendedTeachersKeyboard,
} from "@/bot/keyboards/ticket.keyboard";
import {
  PII_WARNING,
  DELETE_DATA_PREVIEW,
  SERVICE_INTRO,
  TEACHER_VERIFICATION_TEXT,
} from "@/bot/texts/legal";
import { getBackToMenuKeyboard } from "@/bot/keyboards/menu.keyboard";
import { showMainMenu, showHelp } from "@/bot/helpers/menu.helper";
import { respondFromCallback } from "@/bot/helpers/callback-response.helper";
import { showTeacherSelectionPage } from "@/bot/helpers/teacher-selection.helper";
import {
  formatTicketCard,
  buildTicketTitle,
} from "@/bot/helpers/ticket-format";
import { STATUS_LABELS } from "@/bot/constants/statuses";
import { CLARIFICATION_LABELS } from "@/bot/constants/clarifications";
import { getConsentKeyboard } from "@/bot/keyboards/consent.keyboard";
import {
  getRoleSelectionKeyboard,
  getTeacherVerificationRequestKeyboard,
  getAdminTeacherVerificationKeyboard,
} from "@/bot/keyboards/role.keyboard";

function buildTicketSummary(payload) {
  const teacherName =
    payload.teacherDisplayName ??
    getTeacherByKey(payload.teacherKey)?.displayName ??
    "—";

  return `Проверьте обращение:

Преподаватель: ${teacherName}
Описание: ${payload.description ?? "—"}

${PII_WARNING}

Подтвердите отправку или отмените.`;
}

async function proceedAfterTeacherSelect(ctx, payload, teacherId, teacherMeta = {}) {
  const teacherUser = teacherMeta.displayName
    ? null
    : await UserService.findById(teacherId);

  const nextPayload = {
    ...payload,
    teacherId,
    teacherKey: teacherMeta.key ?? payload.teacherKey,
    teacherDisplayName:
      teacherMeta.displayName ?? teacherUser?.displayName ?? "Преподаватель",
    description: payload.draftQuestion ?? payload.description,
  };

  if (nextPayload.description) {
    await StateService.set(ctx.user.id, FSM_STATES.WAITING_CONFIRMATION, nextPayload);
    await respondFromCallback(
      ctx,
      buildTicketSummary(nextPayload),
      getConfirmationKeyboard(),
    );
    return;
  }

  await StateService.set(ctx.user.id, FSM_STATES.WAITING_DESCRIPTION, nextPayload);
  await respondFromCallback(
    ctx,
    `Кратко опишите вопрос одним сообщением.\n\n${PII_WARNING}`,
  );
}

export async function handleStudentCallback(ctx, data) {
  const { user } = ctx;

  if (data === "accept_consent") {
    await ConsentService.accept(user.id);
    await StateService.clear(user.id);
    await respondFromCallback(
      ctx,
      "Выберите роль для работы с ботом:",
      getRoleSelectionKeyboard(),
    );
    return true;
  }

  if (data === "show_legal") {
    await respondFromCallback(ctx, SERVICE_INTRO, getConsentKeyboard());
    return true;
  }

  if (data === "main_menu") {
    await StateService.clear(user.id);
    await showMainMenu(ctx);
    return true;
  }

  if (data === "role_student") {
    await UserService.setRoleStudent(user.id);
    await showMainMenu({ ...ctx, user: { ...user, role: ROLES.STUDENT } });
    return true;
  }

  if (data === "role_teacher") {
    if (user.teacherVerificationStatus === "APPROVED") {
      await showMainMenu({
        ...ctx,
        user: { ...user, role: ROLES.TEACHER, teacherVerificationStatus: "APPROVED" },
      });
      return true;
    }

    if (user.teacherVerificationStatus === "PENDING") {
      await respondFromCallback(
        ctx,
        "Ваш запрос на подтверждение преподавателя уже отправлен и ожидает решения администратора.",
        getRoleSelectionKeyboard(),
      );
      return true;
    }

    await respondFromCallback(
      ctx,
      TEACHER_VERIFICATION_TEXT,
      getTeacherVerificationRequestKeyboard(),
    );
    return true;
  }

  if (data === "request_teacher_verification") {
    const updated = await UserService.requestTeacherVerification(user.id);
    const adminMaxUserId = process.env.ADMIN_MAX_USER_ID;

    if (adminMaxUserId) {
      await NotificationService.notifyMaxUser(
        adminMaxUserId,
        `Запрос подтверждения преподавателя\n\nПользователь: ${updated.displayName ?? "без имени"}\nMAX ID: ${updated.maxUserId}\nРоль: преподаватель`,
        getAdminTeacherVerificationKeyboard(updated.id),
      );
    }

    await respondFromCallback(
      ctx,
      "Запрос отправлен администратору. После подтверждения вы сможете принимать тикеты студентов.",
      getRoleSelectionKeyboard(),
    );
    return true;
  }

  if (data === "help") {
    await showHelp(ctx);
    return true;
  }

  if (data === "create_ticket") {
    await StateService.set(user.id, FSM_STATES.WAITING_QUESTION_INPUT, {});
    await respondFromCallback(
      ctx,
      "Опишите вопрос одним сообщением. Я сначала проверю похожие уже решенные обращения.",
    );
    return true;
  }

  if (data === "similar_helped") {
    await StateService.clear(user.id);
    await respondFromCallback(
      ctx,
      "Отлично, рад что помогло. Новый тикет не создавался.",
      getBackToMenuKeyboard(user),
    );
    return true;
  }

  if (data === "similar_create") {
    const { state, payload } = await StateService.get(user.id);
    const draftQuestion = payload.draftQuestion ?? "";

    if (state !== FSM_STATES.WAITING_SIMILAR_DECISION || !draftQuestion) {
      await respondFromCallback(ctx, "Сначала отправьте вопрос.");
      return true;
    }

    const recommended = await TicketService.recommendTeachersByQuestion(draftQuestion, 3);

    if (recommended.length === 0) {
      await StateService.set(user.id, FSM_STATES.WAITING_TEACHER, { draftQuestion });
      await showTeacherSelectionPage(ctx, 0);
      return true;
    }

    const recommendationText = recommended
      .map(
        (r, i) =>
          `[${i + 1}] ${r.teacher.displayName} - ${r.teacher.expertise ?? "общая консультация"}\nзакрыл ${r.closedSimilarCount} похожих тикетов`,
      )
      .join("\n\n");

    await StateService.set(user.id, FSM_STATES.WAITING_TEACHER, {
      draftQuestion,
      recommendedTeacherKeys: recommended.map((r) => r.teacher.key),
    });

    await respondFromCallback(
      ctx,
      `По теме вашего вопроса подойдут:\n\n${recommendationText}`,
      getRecommendedTeachersKeyboard(recommended.map((r) => r.teacher)),
    );
    return true;
  }

  if (data === "manual_teacher_select") {
    const { payload } = await StateService.get(user.id);
    await StateService.set(user.id, FSM_STATES.WAITING_TEACHER, payload ?? {});
    await showTeacherSelectionPage(ctx, 0);
    return true;
  }

  if (data.startsWith("tpage_")) {
    const pagePart = data.replace("tpage_", "");

    if (pagePart === "noop") {
      return true;
    }

    const page = Number(pagePart);

    if (!Number.isFinite(page)) {
      return false;
    }

    await showTeacherSelectionPage(ctx, page);
    return true;
  }

  if (data.startsWith("pick_teacher_")) {
    const teacherId = data.replace("pick_teacher_", "");
    const teacher = await UserService.findById(teacherId);

    if (!teacher || teacher.role !== ROLES.TEACHER) {
      await respondFromCallback(ctx, "Преподаватель не найден.");
      return true;
    }

    const { payload } = await StateService.get(user.id);

    await proceedAfterTeacherSelect(ctx, payload ?? {}, teacher.id, {
      displayName: teacher.displayName,
    });
    return true;
  }

  if (data.startsWith("rec_teacher_")) {
    const key = data.replace("rec_teacher_", "");
    const teacherData = getTeacherByKey(key);

    if (!teacherData) {
      await respondFromCallback(ctx, "Преподаватель не найден.");
      return true;
    }

    const teacher = await UserService.findOrCreate(
      { id: teacherData.maxUserId, first_name: teacherData.displayName },
      ROLES.TEACHER,
    );
    const { payload } = await StateService.get(user.id);

    await proceedAfterTeacherSelect(
      ctx,
      payload ?? {},
      teacher.id,
      {
        key: teacherData.key,
        displayName: teacherData.displayName,
      },
    );
    return true;
  }

  if (data === "my_tickets") {
    const tickets = await TicketService.listByStudent(user.id);

    if (tickets.length === 0) {
      await respondFromCallback(
        ctx,
        "У вас пока нет обращений.",
        getBackToMenuKeyboard(user),
      );
      return true;
    }

    const lines = tickets
      .slice(0, 15)
      .map((t) => formatTicketCard(t))
      .join("\n\n—\n\n");

    await respondFromCallback(
      ctx,
      `Ваши обращения:\n\n${lines}`,
      {
        inline_keyboard: [
          ...tickets.slice(0, 8).map((t) => [
            {
              text: `#${t.ticketNumber} · ${STATUS_LABELS[t.status]}`,
              callback_data: `st_view_${t.id}`,
            },
          ]),
          ...getBackToMenuKeyboard(user).inline_keyboard,
        ],
      },
    );
    return true;
  }

  if (data === "delete_data") {
    await StateService.set(user.id, FSM_STATES.WAITING_DELETE_CONFIRM, {});
    await respondFromCallback(
      ctx,
      DELETE_DATA_PREVIEW,
      getDeleteConfirmKeyboard(),
    );
    return true;
  }

  if (data === "delete_confirm") {
    const { state } = await StateService.get(user.id);

    if (state !== FSM_STATES.WAITING_DELETE_CONFIRM) {
      await respondFromCallback(ctx, "Подтверждение удаления не активно.");
      return true;
    }

    await UserDataService.deleteAllUserData(user.id);
    await respondFromCallback(
      ctx,
      "Ваши данные в сервисе удалены. Чтобы снова пользоваться ботом, отправьте /start.",
    );
    return true;
  }

  if (data === "confirm_ticket") {
    const { state, payload } = await StateService.get(user.id);

    if (state !== FSM_STATES.WAITING_CONFIRMATION) {
      await respondFromCallback(
        ctx,
        "Нет активного обращения для подтверждения.",
      );
      return true;
    }

    if (payload.createdTicketId) {
      const existing = await TicketService.findByIdForStudent(
        payload.createdTicketId,
        user.id,
      );

      if (existing) {
        await respondFromCallback(
          ctx,
          `Обращение уже создано.

#${existing.ticketNumber}
Статус: ${STATUS_LABELS[existing.status]}`,
          getAfterCreateKeyboard(existing.id),
        );
        return true;
      }
    }

    if (!payload.teacherId || !payload.description) {
      await respondFromCallback(
        ctx,
        "Не хватает данных. Начните заново: /start",
      );
      await StateService.clear(user.id);
      return true;
    }

    const ticket = await TicketService.create({
      studentId: user.id,
      teacherId: payload.teacherId,
      description: payload.description,
    });

    await StateService.set(user.id, FSM_STATES.WAITING_CONFIRMATION, {
      ...payload,
      createdTicketId: ticket.id,
    });
    await StateService.clear(user.id);

    const teacherName =
      payload.teacherDisplayName ??
      getTeacherByKey(payload.teacherKey)?.displayName ??
      "—";

    await respondFromCallback(
      ctx,
      `Обращение #${ticket.ticketNumber} создано.

Преподаватель: ${teacherName}
Статус: ${STATUS_LABELS[ticket.status]}`,
      getAfterCreateKeyboard(ticket.id),
    );

    await NotificationService.notifyUserId(
      ticket.teacherId,
      `Новое обращение #${ticket.ticketNumber}
${ticket.title ?? buildTicketTitle(ticket.description)}`,
      {
        inline_keyboard: [
          [{ text: "Открыть", callback_data: `t_view_${ticket.id}` }],
        ],
      },
    );

    return true;
  }

  if (data === "cancel_ticket") {
    await StateService.clear(user.id);
    await showMainMenu(ctx);
    return true;
  }

  if (data.startsWith("st_view_")) {
    const ticketId = data.replace("st_view_", "");
    const ticket = await TicketService.findByIdForStudent(ticketId, user.id);

    if (!ticket) {
      await respondFromCallback(ctx, "Обращение не найдено.");
      return true;
    }

    await respondFromCallback(
      ctx,
      formatTicketCard(ticket, { full: true }),
      getStudentTicketActionsKeyboard(ticket),
    );
    return true;
  }

  if (data.startsWith("st_clarify_")) {
    const ticketId = data.replace("st_clarify_", "");
    const ticket = await TicketService.findByIdForStudent(ticketId, user.id);

    if (!ticket || ticket.status !== "AWAITING_CLARIFICATION") {
      await respondFromCallback(ctx, "Уточнение по этому обращению не ожидается.");
      return true;
    }

    const types = (ticket.clarificationTypes ?? [])
      .map((t) => CLARIFICATION_LABELS[t] ?? t)
      .join("\n• ");

    await StateService.set(user.id, FSM_STATES.WAITING_CLARIFICATION_REPLY, {
      ticketId,
    });

    await respondFromCallback(
      ctx,
      `Ответьте на уточнение одним сообщением.

Нужно:
• ${types || "—"}
${ticket.clarificationComment ? `\nКомментарий преподавателя: ${ticket.clarificationComment}` : ""}`,
    );
    return true;
  }

  if (data.startsWith("st_close_")) {
    const ticketId = data.replace("st_close_", "");
    const ticket = await TicketService.studentCloseAsResolved(ticketId, user.id);

    if (!ticket) {
      await respondFromCallback(ctx, "Не удалось закрыть обращение.");
      return true;
    }

    await respondFromCallback(
      ctx,
      `Обращение #${ticket.ticketNumber} закрыто.`,
      getStudentTicketActionsKeyboard(ticket),
    );

    await NotificationService.notifyUserId(
      ticket.teacherId,
      `Студент закрыл обращение #${ticket.ticketNumber} после получения ответа.`,
    );
    return true;
  }

  if (data.startsWith("st_slots_")) {
    const ticketId = data.replace("st_slots_", "");
    const ticket = await TicketService.findByIdForStudent(ticketId, user.id);
    const slots = Array.isArray(ticket?.proposedSlots) ? ticket.proposedSlots : [];

    if (!ticket || slots.length === 0) {
      await respondFromCallback(ctx, "Слоты для выбора недоступны.");
      return true;
    }

    await StateService.set(user.id, FSM_STATES.WAITING_SLOT_SELECTION, {
      ticketId,
      slots,
    });

    await respondFromCallback(
      ctx,
      "Выберите удобный слот консультации:",
      getSlotSelectionKeyboard(ticketId, slots),
    );
    return true;
  }

  if (data.startsWith("st_slot_")) {
    const parts = data.replace("st_slot_", "").split("_");
    const ticketId = parts[0];
    const slotIndex = Number(parts[1]);
    const { state, payload } = await StateService.get(user.id);

    const slots =
      payload.slots ??
      (await TicketService.findByIdForStudent(ticketId, user.id))?.proposedSlots;

    const slotList = Array.isArray(slots) ? slots : [];
    const slot = slotList[slotIndex];

    if (!slot) {
      await respondFromCallback(ctx, "Слот не найден.");
      return true;
    }

    const ticket = await TicketService.selectSlot(ticketId, user.id, slot);
    await StateService.clear(user.id);

    await respondFromCallback(
      ctx,
      `Выбран слот: ${slot}
Обращение #${ticket.ticketNumber}, статус: ${STATUS_LABELS[ticket.status]}`,
    );

    await NotificationService.notifyUserId(
      ticket.teacherId,
      `Студент выбрал слот консультации по #${ticket.ticketNumber}: ${slot}`,
      {
        inline_keyboard: [
          [{ text: "Закрыть обращение", callback_data: `t_finalize_${ticket.id}` }],
        ],
      },
    );
    return true;
  }

  if (data.startsWith("fb_yes_") || data.startsWith("fb_no_")) {
    const helpful = data.startsWith("fb_yes_");
    const ticketId = data.replace(helpful ? "fb_yes_" : "fb_no_", "");
    const ticket = await TicketService.setFeedback(
      ticketId,
      user.id,
      helpful ? "HELPFUL" : "NOT_HELPFUL",
    );

    if (!ticket) {
      await respondFromCallback(ctx, "Оценка недоступна для этого обращения.");
      return true;
    }

    await respondFromCallback(
      ctx,
      "Спасибо за оценку. Она учитывается только как метрика качества.",
    );
    return true;
  }

  return false;
}
