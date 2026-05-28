import { MENU_TEXT } from "@/bot/constants/menu-text";
import { isAdmin } from "@/bot/helpers/admin.helper";

function messageButton(text) {
  return { text, type: "message" };
}

function callbackButton(text, callback_data) {
  return { text, callback_data };
}

export function getTeacherMenuKeyboard(user) {
  const rows = [
    [messageButton(MENU_TEXT.QUEUE)],
    [messageButton(MENU_TEXT.ACTIVE)],
    [messageButton(MENU_TEXT.CLOSED)],
    [messageButton(MENU_TEXT.DIAG)],
    [messageButton(MENU_TEXT.HELP)],
    [messageButton(MENU_TEXT.START)],
  ];

  if (isAdmin(user)) {
    rows.push([
      callbackButton(
        "Подтверждение преподавателей",
        "admin_pending_teachers",
      ),
    ]);
  }

  return { inline_keyboard: rows };
}
