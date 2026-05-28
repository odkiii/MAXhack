import { StateService } from "@/services/state.service";
import { TicketService } from "@/services/ticket.service";
import { NotificationService } from "@/services/notification.service";
import { FSM_STATES } from "@/bot/states/user.states";
import { TICKET_STATUSES, CLOSE_OUTCOMES, CLOSE_OUTCOME_LABELS, STATUS_LABELS } from "@/bot/constants/statuses";
import { CLARIFICATION_TYPES } from "@/bot/constants/clarifications";
import {
  getTeacherTicketActionsKeyboard,
  getClarificationTypesKeyboard,
  getCloseOutcomeKeyboard,
  getTicketListKeyboard,
} from "@/bot/keyboards/teacher.ticket.keyboard";
import { getFeedbackKeyboard } from "@/bot/keyboards/feedback.keyboard";
import { showMainMenu, showHelp } from "@/bot/helpers/menu.helper";
import { respondFromCallback } from "@/bot/helpers/callback-response.helper";
import { formatTicketCard } from "@/bot/helpers/ticket-format";
import { CLARIFICATION_LABELS } from "@/bot/constants/clarifications";
import { prisma } from "@/lib/prisma";

export async function handleTeacherCallback(ctx, data) {
  const { user } = ctx;

  if (data === "help") {
    await showHelp(ctx);
    return true;
  }

  if (data === "main_menu") {
    await StateService.clear(user.id);
    await showMainMenu(ctx);
    return true;
  }

  if (data === "t_diag") {
    const counts = await prisma.ticket.groupBy({
      by: ["status"],
      where: { teacherId: user.id },
      _count: true,
    });

    const lines = counts
      .map((c) => `${STATUS_LABELS[c.status] ?? c.status}: ${c._count}`)
      .join("\n");

    await respondFromCallback(
      ctx,
      `Диагностика (ваши тикеты):\n${lines || "Нет данных"}`,
    );
    return true;
  }

  if (data === "t_queue") {
    const tickets = await TicketService.listNewByTeacher(user.id);

    if (tickets.length === 0) {
      await respondFromCallback(ctx, "Очередь пуста — новых обращений нет.");
      return true;
    }

    await respondFromCallback(
      ctx,
      `Новые обращения (${tickets.length}):`,
      getTicketListKeyboard(tickets, "t_view"),
    );
    return true;
  }

  if (data === "t_active") {
    const tickets = await TicketService.listActiveByTeacher(user.id);

    if (tickets.length === 0) {
      await respondFromCallback(ctx, "Активных тикетов нет.");
      return true;
    }

    await respondFromCallback(
      ctx,
      `Активные тикеты (${tickets.length}):`,
      getTicketListKeyboard(tickets, "t_view"),
    );
    return true;
  }

  if (data === "t_closed") {
    const tickets = await TicketService.listClosedByTeacher(user.id);

    if (tickets.length === 0) {
      await respondFromCallback(ctx, "Закрытых тикетов пока нет.");
      return true;
    }

    await respondFromCallback(
      ctx,
      `Закрытые тикеты (последние ${tickets.length}):`,
      getTicketListKeyboard(tickets, "t_view"),
    );
    return true;
  }

  if (data.startsWith("t_view_")) {
    const ticketId = data.replace("t_view_", "");
    const ticket = await TicketService.findByIdForTeacher(ticketId, user.id);

    if (!ticket) {
      await respondFromCallback(ctx, "Тикет не найден или вам не назначен.");
      return true;
    }

    await respondFromCallback(
      ctx,
      formatTicketCard(ticket, { full: true }),
      getTeacherTicketActionsKeyboard(ticket.id, ticket.status),
    );
    return true;
  }

  if (data.startsWith("t_accept_")) {
    const ticketId = data.replace("t_accept_", "");
    const ticket = await TicketService.accept(ticketId, user.id);

    if (!ticket) {
      await respondFromCallback(ctx, "Не удалось принять тикет.");
      return true;
    }

    await respondFromCallback(
      ctx,
      `Тикет #${ticket.ticketNumber} принят в работу.`,
      getTeacherTicketActionsKeyboard(ticket.id, ticket.status),
    );

    await NotificationService.notifyUserId(
      ticket.studentId,
      `Ваше обращение #${ticket.ticketNumber} принято в работу.`,
      {
        inline_keyboard: [
          [{ text: "Смотреть статус", callback_data: `st_view_${ticket.id}` }],
        ],
      },
    );
    return true;
  }

  if (data.startsWith("t_clarify_") && !data.includes("t_clt_")) {
    const ticketId = data.replace("t_clarify_", "");
    const ticket = await TicketService.findByIdForTeacher(ticketId, user.id);

    if (!ticket) {
      await respondFromCallback(ctx, "Тикет не найден.");
      return true;
    }

    await StateService.set(user.id, FSM_STATES.WAITING_CLARIFY_TYPES, {
      ticketId,
      selectedTypes: [],
    });

    await respondFromCallback(
      ctx,
      "Выберите типы уточнения (можно несколько), затем «Готово»:",
      getClarificationTypesKeyboard(ticketId, []),
    );
    return true;
  }

  if (data.startsWith("t_clt_")) {
    if (data.startsWith("t_clt_done_")) {
      const ticketId = data.replace("t_clt_done_", "");
      const { state, payload } = await StateService.get(user.id);

      if (state !== FSM_STATES.WAITING_CLARIFY_TYPES || payload.ticketId !== ticketId) {
        await respondFromCallback(ctx, "Сначала выберите типы уточнения.");
        return true;
      }

      if (!payload.selectedTypes?.length) {
        await respondFromCallback(ctx, "Выберите хотя бы один тип уточнения.");
        return true;
      }

      await StateService.set(user.id, FSM_STATES.WAITING_CLARIFY_COMMENT, {
        ticketId,
        selectedTypes: payload.selectedTypes,
      });

      await respondFromCallback(
        ctx,
        "При необходимости добавьте однострочный комментарий или отправьте «-» без комментария:",
      );
      return true;
    }

    const parsed = parseClarifyToggleData(data);

    if (!parsed) {
      return false;
    }

    const { ticketId, typeKey } = parsed;

    const { state, payload } = await StateService.get(user.id);

    if (state !== FSM_STATES.WAITING_CLARIFY_TYPES || payload.ticketId !== ticketId) {
      return false;
    }

    const selected = new Set(payload.selectedTypes ?? []);

    if (selected.has(typeKey)) {
      selected.delete(typeKey);
    } else {
      selected.add(typeKey);
    }

    const selectedTypes = [...selected];

    await StateService.set(user.id, FSM_STATES.WAITING_CLARIFY_TYPES, {
      ticketId,
      selectedTypes,
    });

    await respondFromCallback(
      ctx,
      `Выбрано: ${selectedTypes.map((t) => CLARIFICATION_LABELS[t]).join(", ") || "—"}`,
      getClarificationTypesKeyboard(ticketId, selectedTypes),
    );
    return true;
  }

  if (data.startsWith("t_reply_")) {
    const ticketId = data.replace("t_reply_", "");
    const ticket = await TicketService.findByIdForTeacher(ticketId, user.id);

    if (!ticket) {
      await respondFromCallback(ctx, "Тикет не найден.");
      return true;
    }

    await StateService.set(user.id, FSM_STATES.WAITING_TEACHER_REPLY, { ticketId });

    await respondFromCallback(
      ctx,
      "Введите текстовый ответ студенту:",
    );
    return true;
  }

  if (data.startsWith("t_close_")) {
    const ticketId = data.replace("t_close_", "");
    const ticket = await TicketService.findByIdForTeacher(ticketId, user.id);

    if (!ticket) {
      await respondFromCallback(ctx, "Тикет не найден.");
      return true;
    }

    await respondFromCallback(
      ctx,
      "Выберите итог закрытия:",
      getCloseOutcomeKeyboard(ticketId),
    );
    return true;
  }

  if (data.startsWith("t_finalize_")) {
    const ticketId = data.replace("t_finalize_", "");
    const existing = await TicketService.findByIdForTeacher(ticketId, user.id);
    const reason = existing?.selectedSlot
      ? `Консультация: ${existing.selectedSlot}`
      : "Консультация назначена";

    const ticket = await TicketService.close(
      ticketId,
      user.id,
      CLOSE_OUTCOMES.CONSULTATION_SCHEDULED,
      reason,
    );

    if (!ticket) {
      await respondFromCallback(ctx, "Не удалось закрыть тикет.");
      return true;
    }

    await finalizeClose(ctx, ticket);
    return true;
  }

  if (data.startsWith("t_co_")) {
    const parsed = parseCloseOutcomeData(data);

    if (!parsed) {
      return false;
    }

    const { ticketId, outcome } = parsed;

    if (outcome === CLOSE_OUTCOMES.REJECTED) {
      await StateService.set(user.id, FSM_STATES.WAITING_REJECT_REASON, {
        ticketId,
        outcome,
      });
      await respondFromCallback(ctx, "Укажите причину отказа одним сообщением:");
      return true;
    }

    if (outcome === CLOSE_OUTCOMES.CONSULTATION_SCHEDULED) {
      await StateService.set(user.id, FSM_STATES.WAITING_CONSULTATION_SLOTS, {
        ticketId,
        outcome,
      });
      await respondFromCallback(
        ctx,
        "Укажите слоты консультации через точку с запятой, например:\nВт 14:00; Ср 10:30; Чт 16:00",
      );
      return true;
    }

    const ticket = await TicketService.close(ticketId, user.id, outcome);

    if (!ticket) {
      await respondFromCallback(ctx, "Не удалось закрыть тикет.");
      return true;
    }

    await finalizeClose(ctx, ticket);
    return true;
  }

  return false;
}

function parseClarifyToggleData(data) {
  if (!data.startsWith("t_clt_") || data.startsWith("t_clt_done_")) {
    return null;
  }

  const rest = data.slice("t_clt_".length);

  for (const typeKey of Object.values(CLARIFICATION_TYPES)) {
    const suffix = `_${typeKey}`;

    if (rest.endsWith(suffix)) {
      return { ticketId: rest.slice(0, -suffix.length), typeKey };
    }
  }

  return null;
}

function parseCloseOutcomeData(data) {
  const outcomes = Object.values(CLOSE_OUTCOMES);

  for (const outcome of outcomes) {
    const suffix = `_${outcome}`;

    if (data.startsWith("t_co_") && data.endsWith(suffix)) {
      return {
        ticketId: data.slice("t_co_".length, -suffix.length),
        outcome,
      };
    }
  }

  return null;
}

export async function finalizeClose(ctx, ticket) {
  const label = CLOSE_OUTCOME_LABELS[ticket.closeOutcome] ?? ticket.closeOutcome;

  await respondFromCallback(
    ctx,
    `Тикет #${ticket.ticketNumber} закрыт. Итог: ${label}`,
  );

  await NotificationService.notifyUserId(
    ticket.studentId,
    `Обращение #${ticket.ticketNumber} закрыто.

Итог: ${label}
${ticket.teacherResponse ? `\nОтвет:\n${ticket.teacherResponse}` : ""}
${ticket.selectedSlot ? `\nКонсультация: ${ticket.selectedSlot}` : ""}`,
    getFeedbackKeyboard(ticket.id),
  );
}
