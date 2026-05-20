import { TEACHERS, TICKET_CATEGORIES, CATEGORY_LABELS } from "@/bot/constants/categories";

export function getTeacherSelectionKeyboard() {
  return {
    inline_keyboard: TEACHERS.map((teacher) => [
      {
        text: teacher.displayName,
        callback_data: teacher.key,
      },
    ]),
  };
}

export function getCategoriesKeyboard() {
  return {
    inline_keyboard: Object.values(TICKET_CATEGORIES).map((category) => [
      {
        text: CATEGORY_LABELS[category],
        callback_data: `category_${category}`,
      },
    ]),
  };
}

export function getConfirmationKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "Подтвердить",
          callback_data: "confirm_ticket",
        },
      ],
      [
        {
          text: "Отмена",
          callback_data: "cancel_ticket",
        },
      ],
    ],
  };
}
