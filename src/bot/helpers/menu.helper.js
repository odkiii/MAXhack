import { MaxService } from "@/services/max.service";
import { ROLES } from "@/bot/constants/roles";
import { isConfiguredTeacher } from "@/bot/constants/categories";
import { getStudentMenuKeyboard } from "@/bot/keyboards/menu.keyboard";
import { getTeacherMenuKeyboard } from "@/bot/keyboards/teacher.menu.keyboard";
import { HELP_TEXT } from "@/bot/texts/help";
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

export function getMenuKeyboardForUser(ctx) {
  const role = resolveMenuRole(ctx.user);

  if (role === ROLES.TEACHER) {
    return getTeacherMenuKeyboard(ctx.user);
  }

  return getStudentMenuKeyboard(ctx.user);
}

export async function showMainMenu(ctx) {
  const role = resolveMenuRole(ctx.user);
  const name = ctx.user.displayName ?? "пользователь";

  if (role === ROLES.TEACHER) {
    await respondFromCallback(
      ctx,
      `Меню преподавателя. Здравствуйте, ${name}!`,
      getTeacherMenuKeyboard(ctx.user),
    );
    return;
  }

  await respondFromCallback(
    ctx,
    `Главное меню. Здравствуйте, ${name}!`,
    getStudentMenuKeyboard(ctx.user),
  );
}

export async function showHelp(ctx) {
  await respondFromCallback(ctx, HELP_TEXT, getMenuKeyboardForUser(ctx));
}

export async function sendMainMenuMessage(recipient, user) {
  const role = resolveMenuRole(user);
  const name = user.displayName ?? "пользователь";
  const keyboard =
    role === ROLES.TEACHER
      ? getTeacherMenuKeyboard(user)
      : getStudentMenuKeyboard(user);
  const text =
    role === ROLES.TEACHER
      ? `Меню преподавателя. Здравствуйте, ${name}!`
      : `Главное меню. Здравствуйте, ${name}!`;

  await MaxService.sendMessage(recipient, text, keyboard);
}
