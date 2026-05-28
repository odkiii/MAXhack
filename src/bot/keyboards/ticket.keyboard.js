import { TEACHERS, TICKET_CATEGORIES, CATEGORY_LABELS } from "@/bot/constants/categories";

export function getTeacherSelectionKeyboard() {
  return {
    inline_keyboard: TEACHERS.map((teacher) => [
      { text: teacher.displayName, callback_data: teacher.key },
    ]),
  };
}

export function getCategoriesKeyboard() {
  return {
    inline_keyboard: Object.values(TICKET_CATEGORIES).map((category) => [
      { text: CATEGORY_LABELS[category], callback_data: `category_${category}` },
    ]),
  };
}

export function getConfirmationKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Подтвердить отправку", callback_data: "confirm_ticket" }],
      [{ text: "Отмена", callback_data: "cancel_ticket" }],
    ],
  };
}

export function getSimilarDecisionKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Да, помогло", callback_data: "similar_helped" }],
      [{ text: "Создать тикет", callback_data: "similar_create" }],
    ],
  };
}

export function getRecommendedTeachersKeyboard(teacherKeys) {
  return {
    inline_keyboard: [
      ...teacherKeys.map((key) => [
        { text: key.displayName, callback_data: `rec_teacher_${key.key}` },
      ]),
      [{ text: "Выбрать вручную", callback_data: "manual_teacher_select" }],
    ],
  };
}

export function getAfterCreateKeyboard(ticketId) {
  return {
    inline_keyboard: [
      [{ text: "Смотреть статус", callback_data: `st_view_${ticketId}` }],
      [{ text: "В главное меню", callback_data: "main_menu" }],
    ],
  };
}

export function getStudentTicketActionsKeyboard(ticket) {
  const rows = [
    [{ text: "Смотреть статус", callback_data: `st_view_${ticket.id}` }],
  ];

  if (
    ticket.status === "IN_PROGRESS" &&
    ticket.teacherResponse
  ) {
    rows.push([
      { text: "Закрыть (получил ответ)", callback_data: `st_close_${ticket.id}` },
    ]);
  }

  if (ticket.status === "AWAITING_CLARIFICATION") {
    rows.push([
      { text: "Ответить на уточнение", callback_data: `st_clarify_${ticket.id}` },
    ]);
  }

  if (ticket.status === "SCHEDULED" && ticket.proposedSlots && !ticket.selectedSlot) {
    rows.push([
      { text: "Выбрать слот", callback_data: `st_slots_${ticket.id}` },
    ]);
  }

  if (ticket.status === "CLOSED" && !ticket.feedback) {
    rows.push([
      { text: "Полезно", callback_data: `fb_yes_${ticket.id}` },
      { text: "Не полезно", callback_data: `fb_no_${ticket.id}` },
    ]);
  }

  rows.push([{ text: "В главное меню", callback_data: "main_menu" }]);

  return { inline_keyboard: rows };
}

export function getDeleteConfirmKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Подтвердить удаление", callback_data: "delete_confirm" }],
      [{ text: "Отмена", callback_data: "main_menu" }],
    ],
  };
}

export function getSlotSelectionKeyboard(ticketId, slots) {
  return {
    inline_keyboard: [
      ...slots.map((slot, i) => [
        { text: slot, callback_data: `st_slot_${ticketId}_${i}` },
      ]),
      [{ text: "Отмена", callback_data: "main_menu" }],
    ],
  };
}
