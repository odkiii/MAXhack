import { MaxService } from "@/services/max.service";
import { ROLES } from "@/bot/constants/roles";
import { isConfiguredTeacher } from "@/bot/constants/categories";
import { getStudentMenuKeyboard } from "@/bot/keyboards/menu.keyboard";
import { getTeacherMenuKeyboard } from "@/bot/keyboards/teacher.menu.keyboard";
import { HELP_TEXT } from "@/bot/texts/help";
import { appendAdminMenuRow } from "@/bot/helpers/admin.helper";
import { respondFromCallback } from "@/bot/helpers/callback-response.helper";

export function resolveMenuRole(user) {
  if (user.role === ROLES.ADMIN) {
    return ROLES.ADMIN;
  }

  if (user.role === ROLES.MODERATOR) {
    return ROLES.MODERATOR;
  }

  if (
    user.role === ROLES.TEACHER &&
    user.teacherVerificationStatus === "APPROVED"
  ) {
    return user.role;
  }

  if (isConfiguredTeacher(user.maxUserId)) {
    return ROLES.TEACHER;
  }

  return ROLES.STUDENT;
}

export async function showMainMenu(ctx) {
  const role = resolveMenuRole(ctx.user);
  const name = ctx.user.displayName ?? "пользователь";

  if (role === ROLES.TEACHER) {
    await respondFromCallback(
      ctx,
      `Меню преподавателя. Здравствуйте, ${name}!`,
      appendAdminMenuRow(getTeacherMenuKeyboard(), ctx.user),
    );
    return;
  }

  await respondFromCallback(
    ctx,
    `Главное меню. Здравствуйте, ${name}!`,
    appendAdminMenuRow(getStudentMenuKeyboard(), ctx.user),
  );
}

export async function showHelp(ctx) {
  await respondFromCallback(ctx, HELP_TEXT);
}
