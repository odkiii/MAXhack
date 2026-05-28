import { MaxService } from "@/services/max.service";
import { ROLES } from "@/bot/constants/roles";
import { isConfiguredTeacher } from "@/bot/constants/categories";
import { getStudentMenuKeyboard } from "@/bot/keyboards/menu.keyboard";
import { getTeacherMenuKeyboard } from "@/bot/keyboards/teacher.menu.keyboard";
import { HELP_TEXT } from "@/bot/texts/help";
import { NavigationService } from "@/services/navigation.service";
import {
  respondFromCallback,
  sendBotMessage,
  NAV_HOME,
} from "@/bot/helpers/navigation.helper";

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

export function getMainMenuPayload(user) {
  const role = resolveMenuRole(user);
  const name = user.displayName ?? "пользователь";

  if (role === ROLES.TEACHER) {
    return {
      text: `Меню преподавателя. Здравствуйте, ${name}!`,
      keyboard: getTeacherMenuKeyboard(user),
    };
  }

  return {
    text: `Главное меню. Здравствуйте, ${name}!`,
    keyboard: getStudentMenuKeyboard(user),
  };
}

export function getMenuKeyboardForUser(ctx) {
  const role = resolveMenuRole(ctx.user);

  if (role === ROLES.TEACHER) {
    return getTeacherMenuKeyboard(ctx.user);
  }

  return getStudentMenuKeyboard(ctx.user);
}

export async function deliverMainMenu(ctx) {
  await NavigationService.clear(ctx.user.id);
  const { text, keyboard } = getMainMenuPayload(ctx.user);

  if (ctx.callbackQuery) {
    await respondFromCallback(ctx, text, keyboard, NAV_HOME);
    return;
  }

  await sendBotMessage(ctx, text, keyboard, NAV_HOME);
}

export async function showMainMenu(ctx) {
  await deliverMainMenu(ctx);
}

export async function showHelp(ctx) {
  await respondFromCallback(ctx, HELP_TEXT, null);
}

export async function sendMainMenuMessage(recipient, user) {
  await NavigationService.clear(user.id);
  const { text, keyboard } = getMainMenuPayload(user);
  await MaxService.sendMessage(recipient, text, keyboard);
}
