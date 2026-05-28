export const TICKET_STATUSES = {
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  AWAITING_CLARIFICATION: "AWAITING_CLARIFICATION",
  SCHEDULED: "SCHEDULED",
  CLOSED: "CLOSED",
  CANCELLED: "CANCELLED",
};

export const STATUS_LABELS = {
  [TICKET_STATUSES.NEW]: "Новый",
  [TICKET_STATUSES.IN_PROGRESS]: "В работе",
  [TICKET_STATUSES.AWAITING_CLARIFICATION]: "Требует уточнения",
  [TICKET_STATUSES.SCHEDULED]: "Назначено",
  [TICKET_STATUSES.CLOSED]: "Закрыт",
  [TICKET_STATUSES.CANCELLED]: "Отменён",
};

export const STATUS_EMOJIS = {
  [TICKET_STATUSES.NEW]: "🟢",
  [TICKET_STATUSES.IN_PROGRESS]: "🟡",
  [TICKET_STATUSES.AWAITING_CLARIFICATION]: "🔵",
  [TICKET_STATUSES.SCHEDULED]: "✅",
  [TICKET_STATUSES.CLOSED]: "✅",
  [TICKET_STATUSES.CANCELLED]: "❌",
};

export function formatStatus(status) {
  const label = STATUS_LABELS[status] ?? status;
  const emoji = STATUS_EMOJIS[status];

  if (!emoji) {
    return String(label);
  }

  return `${emoji} ${label}`;
}

export const CLOSE_OUTCOMES = {
  RESOLVED: "RESOLVED",
  REDIRECTED: "REDIRECTED",
  REJECTED: "REJECTED",
  CONSULTATION_SCHEDULED: "CONSULTATION_SCHEDULED",
};

export const CLOSE_OUTCOME_LABELS = {
  [CLOSE_OUTCOMES.RESOLVED]: "Решено",
  [CLOSE_OUTCOMES.REDIRECTED]: "Перенаправлено",
  [CLOSE_OUTCOMES.REJECTED]: "Отказано с причиной",
  [CLOSE_OUTCOMES.CONSULTATION_SCHEDULED]: "Консультация назначена",
};
