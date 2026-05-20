export function getStudentMenuKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "Создать тикет",
          callback_data: "create_ticket",
        },
      ],
    ],
  };
}
