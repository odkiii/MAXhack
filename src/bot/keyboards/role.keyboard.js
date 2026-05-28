import { MENU_TEXT } from "@/bot/constants/menu-text";
import { ADMIN_ACTION_BUTTONS } from "@/bot/helpers/admin.helper";

export function getRoleSelectionKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Я студент", callback_data: "role_student" }],
      [{ text: "Я преподаватель", callback_data: "role_teacher" }],
      [{ text: MENU_TEXT.START, type: "message" }],
    ],
  };
}

export function getPendingTeacherVerificationKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Я студент", callback_data: "role_student" }],
      [{ text: MENU_TEXT.START, type: "message" }],
    ],
  };
}

export function getTeacherVerificationRequestKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "Запросить подтверждение личности",
          callback_data: "request_teacher_verification",
        },
      ],
      [{ text: "Я студент", callback_data: "role_student" }],
    ],
  };
}

export function getAdminTeacherVerificationKeyboard(userId) {
  return {
    inline_keyboard: [
      [{ text: ADMIN_ACTION_BUTTONS.VERIFY_TEACHER, callback_data: `admin_verify_${userId}` }],
      [{ text: ADMIN_ACTION_BUTTONS.REJECT, callback_data: `admin_reject_${userId}` }],
    ],
  };
}
