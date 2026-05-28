export function getTeacherMenuKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Очередь (новые)", callback_data: "t_queue" }],
      [{ text: "Активные тикеты", callback_data: "t_active" }],
      [{ text: "Закрытые тикеты", callback_data: "t_closed" }],
      [{ text: "Диагностика", callback_data: "t_diag" }],
      [{ text: "Помощь", callback_data: "help" }],
    ],
  };
}
