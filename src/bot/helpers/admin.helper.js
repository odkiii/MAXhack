import { ROLES } from "@/bot/constants/roles";
import { isConfiguredTeacher } from "@/bot/constants/categories";

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
          text: "Подтверждение преподавателей",
          callback_data: "admin_pending_teachers",
        },
      ],
    ],
  };
}
