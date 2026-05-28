export function getFeedbackKeyboard(ticketId) {
  return {
    inline_keyboard: [
      [
        { text: "Полезно", callback_data: `fb_yes_${ticketId}` },
        { text: "Не полезно", callback_data: `fb_no_${ticketId}` },
      ],
      [{ text: "Смотреть статус", callback_data: `st_view_${ticketId}` }],
    ],
  };
}
