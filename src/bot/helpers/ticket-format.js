import {
  formatStatus,
  CLOSE_OUTCOME_LABELS,
} from "@/bot/constants/statuses";
import { CLARIFICATION_LABELS } from "@/bot/constants/clarifications";
import { getCategoryLabel } from "@/bot/constants/ticket-categories";

function truncateText(text, maxLength = 200) {
  const line = String(text ?? "").trim();

  if (line.length <= maxLength) {
    return line || "—";
  }

  return `${line.slice(0, maxLength)}…`;
}

export function formatTicketListLabel(ticket) {
  const line = (ticket.description ?? "").trim().split("\n")[0];
  const short = line.slice(0, 40);

  if (!short) {
    return "Обращение";
  }

  return short.length < line.length ? `${short}…` : short;
}

export function formatTicketCard(ticket, { full = false } = {}) {
  const status = formatStatus(ticket.status);
  const created = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleString("ru-RU")
    : "—";
  const text = full
    ? (ticket.description ?? "—")
    : truncateText(ticket.description);

  let card = `#${ticket.ticketNumber}
Статус: ${status}
Категория: ${getCategoryLabel(ticket.category)}
Создан: ${created}
Текст: ${text}`;

  if (full) {
    if (ticket.clarificationTypes?.length) {
      const types = ticket.clarificationTypes
        .map((t) => CLARIFICATION_LABELS[t] ?? t)
        .join(", ");
      card += `\n\nЗапрошено уточнение: ${types}`;
      if (ticket.clarificationComment) {
        card += `\nКомментарий преподавателя: ${ticket.clarificationComment}`;
      }
    }

    if (ticket.clarificationAnswer) {
      card += `\n\nОтвет студента:\n${ticket.clarificationAnswer}`;
    }

    if (ticket.teacherResponse) {
      card += `\n\nОтвет преподавателя:\n${ticket.teacherResponse}`;
    }

    if (ticket.selectedSlot) {
      card += `\n\nКонсультация: ${ticket.selectedSlot}`;
    }

    if (ticket.closeOutcome) {
      card += `\n\nИтог: ${CLOSE_OUTCOME_LABELS[ticket.closeOutcome] ?? ticket.closeOutcome}`;
      if (ticket.closeReason) {
        card += `\n${ticket.closeReason}`;
      }
    }
  }

  return card;
}
