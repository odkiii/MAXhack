import { ROLES } from "@/bot/constants/roles";

export function isAdmin(user) {
  return (
    user.role === ROLES.ADMIN ||
    String(user.maxUserId) === String(process.env.ADMIN_MAX_USER_ID ?? "")
  );
}

export function appendAdminMenuRow(keyboard, user) {
  if (!isAdmin(user)) {
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
