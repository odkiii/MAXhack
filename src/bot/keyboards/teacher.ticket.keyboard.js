import { formatTicketListLabel } from "@/bot/helpers/ticket-format";
import {
  CLARIFICATION_LABELS,
  CLARIFICATION_SELECTABLE_TYPES,
} from "@/bot/constants/clarifications";

export function hasClarificationBeenRequested(ticket) {
  if (!ticket) {
    return false;
  }

  if (ticket.status === "AWAITING_CLARIFICATION") {
    return true;
  }

  if ((ticket.clarificationTypes?.length ?? 0) > 0) {
    return true;
  }

  if (ticket.clarificationComment) {
    return true;
  }

  if (ticket.clarificationAnswer) {
    return true;
  }

  return false;
}

export function getTeacherTicketActionsKeyboard(ticket) {
  const ticketId = typeof ticket === "string" ? ticket : ticket.id;
  const status = typeof ticket === "string" ? null : ticket.status;
  const rows = [];

  if (status === "NEW") {
    rows.push([
      { text: "Принять в работу", callback_data: `t_accept_${ticketId}` },
    ]);
  }

  if (status === "SCHEDULED") {
    rows.push([
      { text: "Закрыть (консультация)", callback_data: `t_finalize_${ticketId}` },
    ]);
  }

  if (["NEW", "IN_PROGRESS", "SCHEDULED"].includes(status)) {
    if (!hasClarificationBeenRequested(ticket)) {
      rows.push([
        { text: "Запросить уточнение", callback_data: `t_clarify_${ticketId}` },
      ]);
    }
    rows.push([
      { text: "Ответить", callback_data: `t_reply_${ticketId}` },
    ]);
    rows.push([
      { text: "Закрыть", callback_data: `t_close_${ticketId}` },
    ]);
  }

  rows.push([{ text: "Назад", callback_data: "t_queue" }]);

  return { inline_keyboard: rows };
}

export function getClarificationTypesKeyboard(ticketId, selected = []) {
  return {
    inline_keyboard: [
      ...CLARIFICATION_SELECTABLE_TYPES.map((key) => {
        const on = selected.includes(key);
        return [
          {
            text: `${on ? "✓ " : ""}${CLARIFICATION_LABELS[key]}`,
            callback_data: `t_clt_${ticketId}_${key}`,
          },
        ];
      }),
      [{ text: "Другое (написать)", callback_data: `t_clt_done_${ticketId}` }],
      [{ text: "Отмена", callback_data: `t_view_${ticketId}` }],
    ],
  };
}

export function getCloseOutcomeKeyboard(ticketId) {
  return {
    inline_keyboard: [
      [{ text: "Решено", callback_data: `t_co_${ticketId}_RESOLVED` }],
      [{ text: "Перенаправлено", callback_data: `t_co_${ticketId}_REDIRECTED` }],
      [{ text: "Отказано с причиной", callback_data: `t_co_${ticketId}_REJECTED` }],
      [
        {
          text: "Консультация (слоты)",
          callback_data: `t_co_${ticketId}_CONSULTATION_SCHEDULED`,
        },
      ],
      [{ text: "Отмена", callback_data: `t_view_${ticketId}` }],
    ],
  };
}

export function getTicketListKeyboard(tickets, prefix) {
  return {
    inline_keyboard: [
      ...tickets.slice(0, 10).map((t) => [
        {
          text: `#${t.ticketNumber} · ${formatTicketListLabel(t)}`,
          callback_data: `${prefix}_${t.id}`,
        },
      ]),
      [{ text: "В меню преподавателя", callback_data: "main_menu" }],
    ],
  };
}
