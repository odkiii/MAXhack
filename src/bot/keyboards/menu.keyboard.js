import { isAdmin, ADMIN_MENU_BUTTONS } from "@/bot/helpers/admin.helper";
import { MENU_TEXT } from "@/bot/constants/menu-text";

function messageButton(text) {
  return { text, type: "message" };
}

function callbackButton(text, callback_data) {
  return { text, callback_data };
}

export function getStudentMenuKeyboard(user) {
  const rows = [
    [messageButton(MENU_TEXT.CREATE_TICKET)],
    [messageButton(MENU_TEXT.MY_TICKETS)],
    [messageButton(MENU_TEXT.HELP)],
    [messageButton(MENU_TEXT.DELETE_DATA)],
  ];

  if (isAdmin(user)) {
    rows.push([
      callbackButton(
        ADMIN_MENU_BUTTONS.PENDING_TEACHERS,
        "admin_pending_teachers",
      ),
    ]);
    rows.push([
      callbackButton(
        ADMIN_MENU_BUTTONS.TEACHER_METRICS,
        "admin_teacher_metrics",
      ),
    ]);
  }

  return { inline_keyboard: rows };
}

export function getStartMenuKeyboard() {
  return {
    inline_keyboard: [[messageButton(MENU_TEXT.START)]],
  };
}

export function getBackToMenuKeyboard() {
  return null;
}
