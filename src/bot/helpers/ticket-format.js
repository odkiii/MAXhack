import { CATEGORY_LABELS } from "@/bot/constants/categories";
import {
  STATUS_LABELS,
  CLOSE_OUTCOME_LABELS,
} from "@/bot/constants/statuses";
import { CLARIFICATION_LABELS } from "@/bot/constants/clarifications";

export function buildTicketTitle(description) {
  const line = (description ?? "").trim().split("\n")[0];
  const short = line.slice(0, 80);
  return short.length < line.length ? `${short}…` : short;
}

export function formatTicketCard(ticket, { full = false } = {}) {
  const category = CATEGORY_LABELS[ticket.category] ?? ticket.category;
  const status = STATUS_LABELS[ticket.status] ?? ticket.status;
  const title = ticket.title ?? buildTicketTitle(ticket.description);
  const created = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleString("ru-RU")
    : "—";

  let text = `#${ticket.ticketNumber} · ${category}
Статус: ${status}
Кратко: ${title}
Создан: ${created}`;

  if (full) {
    text += `\n\nПолный текст:\n${ticket.description}`;

    if (ticket.clarificationTypes?.length) {
      const types = ticket.clarificationTypes
        .map((t) => CLARIFICATION_LABELS[t] ?? t)
        .join(", ");
      text += `\n\nЗапрошено уточнение: ${types}`;
      if (ticket.clarificationComment) {
        text += `\nКомментарий: ${ticket.clarificationComment}`;
      }
    }

    if (ticket.clarificationAnswer) {
      text += `\n\nОтвет студента:\n${ticket.clarificationAnswer}`;
    }

    if (ticket.teacherResponse) {
      text += `\n\nОтвет преподавателя:\n${ticket.teacherResponse}`;
    }

    if (ticket.selectedSlot) {
      text += `\n\nКонсультация: ${ticket.selectedSlot}`;
    }

    if (ticket.closeOutcome) {
      text += `\n\nИтог: ${CLOSE_OUTCOME_LABELS[ticket.closeOutcome] ?? ticket.closeOutcome}`;
      if (ticket.closeReason) {
        text += `\n${ticket.closeReason}`;
      }
    }
  }

  return text;
}
