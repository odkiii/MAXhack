export const TICKET_CATEGORIES = {
  LAB: "LAB",
  PROJECT: "PROJECT",
  ACCESS: "ACCESS",
  GRADING: "GRADING",
  RETAKE: "RETAKE",
  OTHER: "OTHER",
};

export const CATEGORY_LABELS = {
  [TICKET_CATEGORIES.LAB]: "Лабораторные работы",
  [TICKET_CATEGORIES.PROJECT]: "Проект",
  [TICKET_CATEGORIES.ACCESS]: "Доступы",
  [TICKET_CATEGORIES.GRADING]: "Оценивание",
  [TICKET_CATEGORIES.RETAKE]: "Пересдача",
  [TICKET_CATEGORIES.OTHER]: "Прочее",
};

export const CATEGORY_OPTIONS = [
  TICKET_CATEGORIES.LAB,
  TICKET_CATEGORIES.PROJECT,
  TICKET_CATEGORIES.ACCESS,
  TICKET_CATEGORIES.GRADING,
  TICKET_CATEGORIES.RETAKE,
  TICKET_CATEGORIES.OTHER,
];

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category ?? "—";
}

export function isValidTicketCategory(category) {
  return CATEGORY_OPTIONS.includes(category);
}
