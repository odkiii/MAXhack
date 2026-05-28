import { StateService } from "@/services/state.service";
import { TicketService } from "@/services/ticket.service";
import { NotificationService } from "@/services/notification.service";
import { FSM_STATES } from "@/bot/states/user.states";
import {
  getConfirmationKeyboard,
  getSimilarDecisionKeyboard,
} from "@/bot/keyboards/ticket.keyboard";
import { getTeacherByKey } from "@/bot/constants/categories";
import { startHandler } from "@/bot/handlers/start.handler";
import { isStartCommand } from "@/lib/max-update";
import { showMainMenu, resolveMenuRole, sendMainMenuMessage } from "@/bot/helpers/menu.helper";
import { sendBotMessage } from "@/bot/helpers/navigation.helper";
import { resolveMenuTextAction } from "@/bot/constants/menu-text";
import { dispatchMenuTextAction } from "@/bot/helpers/menu-actions.helper";
import { ROLES } from "@/bot/constants/roles";
import { finalizeClose } from "@/bot/handlers/teacher.callback.handler";
import { CLOSE_OUTCOMES } from "@/bot/constants/statuses";
import { getFeedbackKeyboard } from "@/bot/keyboards/feedback.keyboard";
import { PII_WARNING } from "@/bot/texts/legal";

function buildTicketSummary(payload) {
  const teacherName =
    payload.teacherDisplayName ??
    getTeacherByKey(payload.teacherKey)?.displayName ??
    "—";

  return `Проверьте обращение:

Преподаватель: ${teacherName}
Текст: ${payload.description}

${PII_WARNING}

Подтвердите отправку или отмените.`;
}

export async function messageHandler(ctx) {
  const { user, text } = ctx;

  if (isStartCommand(text)) {
    await startHandler(ctx);
    return;
  }

  const role = resolveMenuRole(user);
  const menuAction = resolveMenuTextAction(text, role);

  if (menuAction) {
    await dispatchMenuTextAction(ctx, menuAction);
    return;
  }

  const { state, payload } = await StateService.get(user.id);

  if (state === FSM_STATES.WAITING_QUESTION_INPUT && role === ROLES.STUDENT) {
    const draftQuestion = text?.trim();

    if (!draftQuestion) {
      await sendBotMessage(
        ctx,
        "Пожалуйста, отправьте вопрос одним сообщением.",
      );
      return;
    }

    const similar = await TicketService.findSimilarClosedTicket(draftQuestion);

    if (similar) {
      const daysAgo = getDaysAgoLabel(similar.updatedAt);
      const answer = similar.teacherResponse ?? "Ответ не сохранён.";

      await StateService.set(user.id, FSM_STATES.WAITING_SIMILAR_DECISION, {
        draftQuestion,
        similarTicketId: similar.id,
      });

      await sendBotMessage(
        ctx,
        `💡 Похожий вопрос уже решали:\n\nТикет #${similar.ticketNumber} · закрыт ${daysAgo}\nВопрос: «${similar.description}»\nОтвет: «${answer}»`,
        getSimilarDecisionKeyboard(),
      );
      return;
    }

    await StateService.set(user.id, FSM_STATES.WAITING_SIMILAR_DECISION, {
      draftQuestion,
    });
    await sendBotMessage(
      ctx,
      "Похожих решений не найдено. Нажмите «Создать тикет».",
      getSimilarDecisionKeyboard(),
    );
    return;
  }

  if (state === FSM_STATES.WAITING_DESCRIPTION && role === ROLES.STUDENT) {
    const description = text?.trim();

    if (!description) {
      await sendBotMessage(
        ctx,
        "Пожалуйста, отправьте текстовое описание вопроса.",
      );
      return;
    }

    const nextPayload = { ...payload, description };

    await StateService.set(
      user.id,
      FSM_STATES.WAITING_CONFIRMATION,
      nextPayload,
    );

    await sendBotMessage(
      ctx,
      buildTicketSummary(nextPayload),
      getConfirmationKeyboard(),
    );
    return;
  }

  if (state === FSM_STATES.WAITING_CLARIFICATION_REPLY) {
    const answer = text?.trim();

    if (!answer) {
      await sendBotMessage(ctx, "Отправьте текстовый ответ.");
      return;
    }

    const ticket = await TicketService.answerClarification(
      payload.ticketId,
      user.id,
      answer,
    );

    await StateService.clear(user.id);

    if (!ticket) {
      await sendBotMessage(ctx, "Не удалось сохранить ответ.");
      return;
    }

    await sendBotMessage(
      ctx,
      `Ответ отправлен. Обращение #${ticket.ticketNumber} снова в работе.`,
    );

    await NotificationService.notifyUserId(
      ticket.teacherId,
      `Студент ответил на уточнение по #${ticket.ticketNumber}:\n${answer}`,
      {
        inline_keyboard: [
          [{ text: "Открыть", callback_data: `t_view_${ticket.id}` }],
        ],
      },
    );
    return;
  }

  if (state === FSM_STATES.WAITING_CLARIFY_COMMENT && role === ROLES.TEACHER) {
    const comment = text?.trim() === "-" ? null : text?.trim();

    if (!payload.selectedTypes?.length && !comment) {
      await sendBotMessage(
        ctx,
        "Напишите, что нужно уточнить у студента.",
      );
      return;
    }

    const ticket = await TicketService.requestClarification(
      payload.ticketId,
      user.id,
      payload.selectedTypes,
      comment,
    );

    await StateService.clear(user.id);

    if (!ticket) {
      await sendBotMessage(ctx, "Не удалось запросить уточнение.");
      return;
    }

    await sendBotMessage(ctx, "Уточнение отправлено студенту.");

    await NotificationService.notifyUserId(
      ticket.studentId,
      `По обращению #${ticket.ticketNumber} нужно уточнение.`,
      {
        inline_keyboard: [
          [{ text: "Ответить", callback_data: `st_clarify_${ticket.id}` }],
        ],
      },
    );
    return;
  }

  if (state === FSM_STATES.WAITING_TEACHER_REPLY && role === ROLES.TEACHER) {
    const reply = text?.trim();

    if (!reply) {
      await sendBotMessage(ctx, "Введите текст ответа.");
      return;
    }

    const ticket = await TicketService.addTeacherReply(
      payload.ticketId,
      user.id,
      reply,
    );

    await StateService.clear(user.id);

    if (!ticket) {
      await sendBotMessage(ctx, "Не удалось отправить ответ.");
      return;
    }

    await sendBotMessage(ctx, "Ответ отправлен.");

    await NotificationService.notifyUserId(
      ticket.studentId,
      `Ответ по обращению #${ticket.ticketNumber}:\n\n${reply}`,
      {
        inline_keyboard: [
          [
            { text: "Закрыть (получил ответ)", callback_data: `st_close_${ticket.id}` },
          ],
          [{ text: "Статус", callback_data: `st_view_${ticket.id}` }],
        ],
      },
    );
    return;
  }

  if (state === FSM_STATES.WAITING_REJECT_REASON && role === ROLES.TEACHER) {
    const reason = text?.trim();

    if (!reason) {
      await sendBotMessage(ctx, "Укажите причину отказа.");
      return;
    }

    const ticket = await TicketService.close(
      payload.ticketId,
      user.id,
      CLOSE_OUTCOMES.REJECTED,
      reason,
    );

    await StateService.clear(user.id);

    if (!ticket) {
      await sendBotMessage(ctx, "Не удалось закрыть тикет.");
      return;
    }

    await finalizeClose(ctx, ticket);
    return;
  }

  if (state === FSM_STATES.WAITING_CONSULTATION_SLOTS && role === ROLES.TEACHER) {
    const slots = text
      ?.split(";")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!slots?.length) {
      await sendBotMessage(
        ctx,
        "Укажите хотя бы один слот через «;».",
      );
      return;
    }

    const ticket = await TicketService.proposeSlots(
      payload.ticketId,
      user.id,
      slots,
    );

    await StateService.clear(user.id);

    if (!ticket) {
      await sendBotMessage(ctx, "Не удалось сохранить слоты.");
      return;
    }

    await sendBotMessage(
      ctx,
      "Слоты предложены. Статус: Назначено. После выбора студентом можно закрыть тикет.",
    );

    await NotificationService.notifyUserId(
      ticket.studentId,
      `По обращению #${ticket.ticketNumber} предложены слоты консультации:\n${slots.join("\n")}`,
      {
        inline_keyboard: [
          [{ text: "Выбрать слот", callback_data: `st_slots_${ticket.id}` }],
        ],
      },
    );
    return;
  }

  if (state !== FSM_STATES.IDLE) {
    await sendBotMessage(
      ctx,
      "Завершите текущий шаг или нажмите «Главное меню».",
    );
    return;
  }

  await sendMainMenuMessage(ctx.recipient, ctx.user);
}

function getDaysAgoLabel(dateValue) {
  if (!dateValue) {
    return "недавно";
  }

  const diffMs = Date.now() - new Date(dateValue).getTime();
  const days = Math.max(1, Math.floor(diffMs / 86400000));

  if (days % 10 === 1 && days % 100 !== 11) {
    return `${days} день назад`;
  }
  if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
    return `${days} дня назад`;
  }
  return `${days} дней назад`;
}
