import { MENU_TEXT } from "@/bot/constants/menu-text";

export function getConsentKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "Принимаю условия",
          callback_data: "accept_consent",
        },
      ],
      [{ text: MENU_TEXT.START, type: "message" }],
    ],
  };
}