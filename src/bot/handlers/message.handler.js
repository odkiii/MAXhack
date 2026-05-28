import { StateService } from "@/services/state.service";
import { TicketService } from "@/services/ticket.service";
import { NotificationService } from "@/services/notification.service";
import { FSM_STATES } from "@/bot/states/user.states";
import { TICKET_STATUSES, CLOSE_OUTCOMES, formatStatus } from "@/bot/constants/statuses";
import {
  getSimilarDecisionKeyboard,
  getCategoryKeyboard,
} from "@/bot/keyboards/ticket.keyboard";
import { startHandler } from "@/bot/handlers/start.handler";
import { isStartCommand } from "@/lib/max-update";
import { showMainMenu, resolveMenuRole, deliverMainMenu } from "@/bot/helpers/menu.helper";
import { sendBotMessage } from "@/bot/helpers/navigation.helper";
import { resolveMenuTextAction } from "@/bot/constants/menu-text";
import { dispatchMenuTextAction } from "@/bot/helpers/menu-actions.helper";
import { ROLES } from "@/bot/constants/roles";
import { finalizeClose } from "@/bot/handlers/teacher.callback.handler";
import { getFeedbackKeyboard, buildAnswerFeedbackPrompt } from "@/bot/keyboards/feedback.keyboard";
import { CLARIFICATION_TYPES } from "@/bot/constants/clarifications";
import { pickIncomingMedia, toMaxOutgoingAttachment } from "@/lib/max-media";

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

    await StateService.set(user.id, FSM_STATES.WAITING_CATEGORY, nextPayload);

    await sendBotMessage(
      ctx,
      "Выберите категорию обращения:",
      getCategoryKeyboard(),
    );
    return;
  }

  if (state === FSM_STATES.WAITING_CLARIFICATION_REPLY) {
    const ticket = await TicketService.findByIdForStudent(payload.ticketId, user.id);

    if (!ticket || ticket.status !== TICKET_STATUSES.AWAITING_CLARIFICATION) {
      await StateService.clear(user.id);
      await sendBotMessage(ctx, "Уточнение по этому обращению больше не ожидается.");
      return;
    }

    const needsScreenshot = (ticket.clarificationTypes ?? []).includes(
      CLARIFICATION_TYPES.ERROR_SCREENSHOT,
    );
    const textOnlyTypes = (ticket.clarificationTypes ?? []).filter(
      (type) => type !== CLARIFICATION_TYPES.ERROR_SCREENSHOT,
    );
    const answer = text?.trim() || null;
    const attachment = pickIncomingMedia(ctx.attachments);

    if (needsScreenshot && !attachment) {
      await sendBotMessage(
        ctx,
        "Пришлите одно фото или файл из галереи (можно с подписью в одном сообщении).",
      );
      return;
    }

    if (!needsScreenshot && !answer) {
      await sendBotMessage(ctx, "Отправьте текстовый ответ.");
      return;
    }

    if (textOnlyTypes.length > 0 && !answer) {
      await sendBotMessage(
        ctx,
        "Добавьте текстовый ответ — можно подписью к фото.",
      );
      return;
    }

    const savedTicket = await TicketService.answerClarification(
      payload.ticketId,
      user.id,
      answer,
      attachment,
    );

    await StateService.clear(user.id);

    if (!savedTicket) {
      await sendBotMessage(ctx, "Не удалось сохранить ответ.");
      return;
    }

    await sendBotMessage(
      ctx,
      `Ответ отправлен. Обращение #${savedTicket.ticketNumber} снова в работе.`,
    );

    const teacherText = answer
      ? `Студент ответил на уточнение по #${savedTicket.ticketNumber}:\n${answer}`
      : `Студент прислал скриншот по уточнению #${savedTicket.ticketNumber}.`;

    const outgoingAttachment = attachment
      ? toMaxOutgoingAttachment(attachment)
      : null;

    await NotificationService.notifyUserId(
      savedTicket.teacherId,
      teacherText,
      {
        inline_keyboard: [
          [{ text: "Открыть", callback_data: `t_view_${savedTicket.id}` }],
        ],
      },
      outgoingAttachment ? [outgoingAttachment] : null,
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
      buildAnswerFeedbackPrompt(ticket.ticketNumber, reply),
      getFeedbackKeyboard(ticket.id),
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
      `Слоты предложены. Статус: ${formatStatus(TICKET_STATUSES.SCHEDULED)}. После выбора студентом можно закрыть тикет.`,
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

  await deliverMainMenu(ctx);
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
