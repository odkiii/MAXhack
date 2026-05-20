export function getConsentKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "Принимаю условия",
          callback_data: "accept_consent",
        },
      ],
    ],
  };
}
