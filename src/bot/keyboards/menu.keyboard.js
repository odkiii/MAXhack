export function getStudentMenuKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Создать обращение", callback_data: "create_ticket" }],
      [{ text: "Мои обращения", callback_data: "my_tickets" }],
      [{ text: "Помощь", callback_data: "help" }],
      [{ text: "Удаление данных", callback_data: "delete_data" }],
    ],
  };
}

export function getBackToMenuKeyboard() {
  return {
    inline_keyboard: [[{ text: "В главное меню", callback_data: "main_menu" }]],
  };
}
