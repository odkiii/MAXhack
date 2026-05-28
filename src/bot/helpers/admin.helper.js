import { ROLES } from "@/bot/constants/roles";
import { isConfiguredTeacher } from "@/bot/constants/categories";

export const ADMIN_BUTTON_PREFIX = "🔴 ";

export const ADMIN_MENU_BUTTONS = {
  PENDING_TEACHERS: `${ADMIN_BUTTON_PREFIX}Подтверждение преподавателей`,
  TEACHER_METRICS: `${ADMIN_BUTTON_PREFIX}Метрики преподавателей`,
};

export const ADMIN_ACTION_BUTTONS = {
  VERIFY: `${ADMIN_BUTTON_PREFIX}Подтвердить`,
  REJECT: `${ADMIN_BUTTON_PREFIX}Отклонить`,
  VERIFY_TEACHER: `${ADMIN_BUTTON_PREFIX}Подтвердить преподавателя`,
};

export function withAdminButtonPrefix(text) {
  if (!text) {
    return ADMIN_BUTTON_PREFIX.trim();
  }

  if (text.startsWith(ADMIN_BUTTON_PREFIX)) {
    return text;
  }

  return `${ADMIN_BUTTON_PREFIX}${text}`;
}

export function isAdmin(user) {
  return (
    user.role === ROLES.ADMIN ||
    String(user.maxUserId) === String(process.env.ADMIN_MAX_USER_ID ?? "")
  );
}

export function isVerifiedTeacher(user) {
  if (!user) {
    return false;
  }

  if (isConfiguredTeacher(user.maxUserId)) {
    return true;
  }

  return (
    user.role === ROLES.TEACHER &&
    user.teacherVerificationStatus === "APPROVED"
  );
}

export function shouldShowTeacherVerificationButton(user) {
  return isAdmin(user) && !isVerifiedTeacher(user);
}

export function appendAdminMenuRow(keyboard, user) {
  if (!shouldShowTeacherVerificationButton(user)) {
    return keyboard;
  }

  return {
    inline_keyboard: [
      ...keyboard.inline_keyboard,
      [
        {
          text: ADMIN_MENU_BUTTONS.PENDING_TEACHERS,
          callback_data: "admin_pending_teachers",
        },
      ],
    ],
  };
}
