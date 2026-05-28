import { MaxService } from "@/services/max.service";
import { ROLES } from "@/bot/constants/roles";
import { isConfiguredTeacher } from "@/bot/constants/categories";
import { getStudentMenuKeyboard } from "@/bot/keyboards/menu.keyboard";
import { getTeacherMenuKeyboard } from "@/bot/keyboards/teacher.menu.keyboard";
import { HELP_TEXT } from "@/bot/texts/help";

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
    await MaxService.sendMessage(
      ctx.recipient,
      `Меню преподавателя. Здравствуйте, ${name}!`,
      getTeacherMenuKeyboard(),
    );
    return;
  }

  await MaxService.sendMessage(
    ctx.recipient,
    `Главное меню. Здравствуйте, ${name}!`,
    getStudentMenuKeyboard(),
  );
}

export async function showHelp(ctx) {
  await MaxService.sendMessage(ctx.recipient, HELP_TEXT);
}
