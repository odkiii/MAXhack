import { ConsentService } from "@/services/consent.service";
import { StateService } from "@/services/state.service";
import { TicketService } from "@/services/ticket.service";
import { UserService } from "@/services/user.service";
import { UserDataService } from "@/services/user-data.service";
import { MaxService } from "@/services/max.service";
import { NotificationService } from "@/services/notification.service";
import { FSM_STATES } from "@/bot/states/user.states";
import { ROLES } from "@/bot/constants/roles";
import {
  getTeacherByKey,
  TICKET_CATEGORIES,
  CATEGORY_LABELS,
} from "@/bot/constants/categories";
import {
  getTeacherSelectionKeyboard,
  getCategoriesKeyboard,
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
  const teacher = getTeacherByKey(payload.teacherKey);
  const categoryLabel = CATEGORY_LABELS[payload.category] ?? payload.category;

  return `Проверьте обращение:

Преподаватель: ${teacher?.displayName ?? "—"}
Категория: ${categoryLabel}
Описание: ${payload.description ?? "—"}

${PII_WARNING}

Подтвердите отправку или отмените.`;
}

export async function handleStudentCallback(ctx, data) {
  const { user, recipient } = ctx;

  if (data === "accept_consent") {
    await ConsentService.accept(user.id);
    await StateService.clear(user.id);
    await MaxService.sendMessage(
      recipient,
      "Выберите роль для работы с ботом:",
      getRoleSelectionKeyboard(),
    );
    return true;
  }

  if (data === "show_legal") {
    await MaxService.sendMessage(recipient, SERVICE_INTRO, getConsentKeyboard());
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
      await MaxService.sendMessage(
        recipient,
        "Ваш запрос на подтверждение преподавателя уже отправлен и ожидает решения администратора.",
        getRoleSelectionKeyboard(),
      );
      return true;
    }

    await MaxService.sendMessage(
      recipient,
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

    await MaxService.sendMessage(
      recipient,
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
    await MaxService.sendMessage(
      recipient,
      "Опишите вопрос одним сообщением. Я сначала проверю похожие уже решенные обращения.",
    );
    return true;
  }

  if (data === "similar_helped") {
    await StateService.clear(user.id);
    await MaxService.updateCallbackMessage(
      ctx.callbackQuery,
      "Вопрос закрыт без создания тикета.",
      getBackToMenuKeyboard(),
    );
    await MaxService.sendMessage(
      recipient,
      "Отлично, рад что помогло. Новый тикет не создавался.",
      getBackToMenuKeyboard(),
    );
    return true;
  }

  if (data === "similar_create") {
    const { state, payload } = await StateService.get(user.id);
    const draftQuestion = payload.draftQuestion ?? "";

    if (state !== FSM_STATES.WAITING_SIMILAR_DECISION || !draftQuestion) {
      await MaxService.sendMessage(recipient, "Сначала отправьте вопрос.");
      return true;
    }

    await MaxService.updateCallbackMessage(
      ctx.callbackQuery,
      "Переходим к созданию тикета…",
    );

    const recommended = await TicketService.recommendTeachersByQuestion(draftQuestion, 3);

    if (recommended.length === 0) {
      await StateService.set(user.id, FSM_STATES.WAITING_TEACHER, { draftQuestion });
      await MaxService.sendMessage(
        recipient,
        "Похожих решенных вопросов не найдено. Выберите преподавателя:",
        getTeacherSelectionKeyboard(),
      );
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

    await MaxService.sendMessage(
      recipient,
      `По теме вашего вопроса подойдут:\n\n${recommendationText}`,
      getRecommendedTeachersKeyboard(recommended.map((r) => r.teacher)),
    );
    return true;
  }

  if (data === "manual_teacher_select") {
    const { payload } = await StateService.get(user.id);
    await StateService.set(user.id, FSM_STATES.WAITING_TEACHER, payload ?? {});
    await MaxService.sendMessage(
      recipient,
      "Выберите преподавателя из справочника:",
      getTeacherSelectionKeyboard(),
    );
    return true;
  }

  if (data.startsWith("rec_teacher_")) {
    const key = data.replace("rec_teacher_", "");
    const teacherData = getTeacherByKey(key);

    if (!teacherData) {
      await MaxService.sendMessage(recipient, "Преподаватель не найден.");
      return true;
    }

    const teacher = await UserService.findOrCreate(
      { id: teacherData.maxUserId, first_name: teacherData.displayName },
      ROLES.TEACHER,
    );
    const { payload } = await StateService.get(user.id);

    await StateService.set(user.id, FSM_STATES.WAITING_CATEGORY, {
      ...payload,
      teacherKey: teacherData.key,
      teacherId: teacher.id,
    });

    await MaxService.sendMessage(
      recipient,
      "Выберите категорию обращения:",
      getCategoriesKeyboard(),
    );
    return true;
  }

  if (data === "my_tickets") {
    const tickets = await TicketService.listByStudent(user.id);

    if (tickets.length === 0) {
      await MaxService.sendMessage(
        recipient,
        "У вас пока нет обращений.",
        getBackToMenuKeyboard(),
      );
      return true;
    }

    const lines = tickets
      .slice(0, 15)
      .map((t) => formatTicketCard(t))
      .join("\n\n—\n\n");

    await MaxService.sendMessage(
      recipient,
      `Ваши обращения:\n\n${lines}`,
      {
        inline_keyboard: [
          ...tickets.slice(0, 8).map((t) => [
            {
              text: `#${t.ticketNumber} · ${STATUS_LABELS[t.status]}`,
              callback_data: `st_view_${t.id}`,
            },
          ]),
          [{ text: "В главное меню", callback_data: "main_menu" }],
        ],
      },
    );
    return true;
  }

  if (data === "delete_data") {
    await StateService.set(user.id, FSM_STATES.WAITING_DELETE_CONFIRM, {});
    await MaxService.sendMessage(
      recipient,
      DELETE_DATA_PREVIEW,
      getDeleteConfirmKeyboard(),
    );
    return true;
  }

  if (data === "delete_confirm") {
    const { state } = await StateService.get(user.id);

    if (state !== FSM_STATES.WAITING_DELETE_CONFIRM) {
      await MaxService.sendMessage(recipient, "Подтверждение удаления не активно.");
      return true;
    }

    await UserDataService.deleteAllUserData(user.id);
    await MaxService.sendMessage(
      recipient,
      "Ваши данные в сервисе удалены. Чтобы снова пользоваться ботом, отправьте /start.",
    );
    return true;
  }

  if (data.startsWith("teacher_")) {
    const teacherMeta = getTeacherByKey(data);

    if (!teacherMeta) {
      await MaxService.sendMessage(recipient, "Преподаватель не найден.");
      return true;
    }

    const teacher = await UserService.findOrCreate(
      { id: teacherMeta.maxUserId, first_name: teacherMeta.displayName },
      ROLES.TEACHER,
    );

    await StateService.set(user.id, FSM_STATES.WAITING_CATEGORY, {
      teacherKey: data,
      teacherId: teacher.id,
    });

    await MaxService.sendMessage(
      recipient,
      "Выберите категорию обращения:",
      getCategoriesKeyboard(),
    );
    return true;
  }

  if (data.startsWith("category_")) {
    const category = data.replace("category_", "");

    if (!Object.values(TICKET_CATEGORIES).includes(category)) {
      await MaxService.sendMessage(recipient, "Некорректная категория.");
      return true;
    }

    const { payload } = await StateService.get(user.id);

    if (payload?.draftQuestion) {
      const nextPayload = {
        ...payload,
        category,
        description: payload.draftQuestion,
      };

      await StateService.set(user.id, FSM_STATES.WAITING_CONFIRMATION, nextPayload);
      await MaxService.sendMessage(
        recipient,
        buildTicketSummary(nextPayload),
        getConfirmationKeyboard(),
      );
      return true;
    }

    await StateService.set(user.id, FSM_STATES.WAITING_DESCRIPTION, {
      ...payload,
      category,
    });

    await MaxService.sendMessage(
      recipient,
      `Кратко опишите вопрос одним сообщением.\n\n${PII_WARNING}`,
    );
    return true;
  }

  if (data === "confirm_ticket") {
    const { state, payload } = await StateService.get(user.id);

    if (state !== FSM_STATES.WAITING_CONFIRMATION) {
      await MaxService.sendMessage(
        recipient,
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
        await MaxService.sendMessage(
          recipient,
          `Обращение уже создано.

#${existing.ticketNumber}
Статус: ${STATUS_LABELS[existing.status]}`,
          getAfterCreateKeyboard(existing.id),
        );
        return true;
      }
    }

    if (!payload.teacherId || !payload.category || !payload.description) {
      await MaxService.sendMessage(
        recipient,
        "Не хватает данных. Начните заново: /start",
      );
      await StateService.clear(user.id);
      return true;
    }

    const ticket = await TicketService.create({
      studentId: user.id,
      teacherId: payload.teacherId,
      category: payload.category,
      description: payload.description,
    });

    await StateService.set(user.id, FSM_STATES.WAITING_CONFIRMATION, {
      ...payload,
      createdTicketId: ticket.id,
    });
    await StateService.clear(user.id);

    const teacher = getTeacherByKey(payload.teacherKey);

    await MaxService.sendMessage(
      recipient,
      `Обращение #${ticket.ticketNumber} создано.

Преподаватель: ${teacher?.displayName ?? "—"}
Категория: ${CATEGORY_LABELS[payload.category]}
Статус: ${STATUS_LABELS[ticket.status]}`,
      getAfterCreateKeyboard(ticket.id),
    );

    await NotificationService.notifyUserId(
      ticket.teacherId,
      `Новое обращение #${ticket.ticketNumber}
${CATEGORY_LABELS[ticket.category]}
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
    await MaxService.sendMessage(recipient, "Создание обращения отменено.");
    await showMainMenu(ctx);
    return true;
  }

  if (data.startsWith("st_view_")) {
    const ticketId = data.replace("st_view_", "");
    const ticket = await TicketService.findByIdForStudent(ticketId, user.id);

    if (!ticket) {
      await MaxService.sendMessage(recipient, "Обращение не найдено.");
      return true;
    }

    await MaxService.sendMessage(
      recipient,
      formatTicketCard(ticket, { full: true }),
      getStudentTicketActionsKeyboard(ticket),
    );
    return true;
  }

  if (data.startsWith("st_clarify_")) {
    const ticketId = data.replace("st_clarify_", "");
    const ticket = await TicketService.findByIdForStudent(ticketId, user.id);

    if (!ticket || ticket.status !== "AWAITING_CLARIFICATION") {
      await MaxService.sendMessage(recipient, "Уточнение по этому обращению не ожидается.");
      return true;
    }

    const types = (ticket.clarificationTypes ?? [])
      .map((t) => CLARIFICATION_LABELS[t] ?? t)
      .join("\n• ");

    await StateService.set(user.id, FSM_STATES.WAITING_CLARIFICATION_REPLY, {
      ticketId,
    });

    await MaxService.sendMessage(
      recipient,
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
      await MaxService.sendMessage(recipient, "Не удалось закрыть обращение.");
      return true;
    }

    await MaxService.sendMessage(
      recipient,
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
      await MaxService.sendMessage(recipient, "Слоты для выбора недоступны.");
      return true;
    }

    await StateService.set(user.id, FSM_STATES.WAITING_SLOT_SELECTION, {
      ticketId,
      slots,
    });

    await MaxService.sendMessage(
      recipient,
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
      await MaxService.sendMessage(recipient, "Слот не найден.");
      return true;
    }

    const ticket = await TicketService.selectSlot(ticketId, user.id, slot);
    await StateService.clear(user.id);

    await MaxService.sendMessage(
      recipient,
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
      await MaxService.sendMessage(recipient, "Оценка недоступна для этого обращения.");
      return true;
    }

    await MaxService.sendMessage(
      recipient,
      "Спасибо за оценку. Она учитывается только как метрика качества.",
    );
    return true;
  }

  return false;
}
