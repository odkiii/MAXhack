import { MENU_TEXT } from "@/bot/constants/menu-text";

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
      [{ text: "Подтвердить преподавателя", callback_data: `admin_verify_${userId}` }],
      [{ text: "Отклонить", callback_data: `admin_reject_${userId}` }],
    ],
  };
}
