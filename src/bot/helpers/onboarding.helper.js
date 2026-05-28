import { MaxService } from "@/services/max.service";
import { UserService } from "@/services/user.service";
import { isConfiguredTeacher } from "@/bot/constants/categories";
import { getRoleSelectionKeyboard, getPendingTeacherVerificationKeyboard } from "@/bot/keyboards/role.keyboard";
import { deliverMainMenu } from "@/bot/helpers/menu.helper";
import {
  respondFromCallback,
  sendBotMessage,
  NAV_NONE,
} from "@/bot/helpers/navigation.helper";

export function hasCompletedRoleSelection(user) {
  if (!user) {
    return false;
  }

  if (isConfiguredTeacher(user.maxUserId)) {
    return true;
  }

  if (user.roleSelectedAt) {
    return true;
  }

  if (
    user.teacherVerificationStatus === "APPROVED" ||
    user.teacherVerificationStatus === "PENDING"
  ) {
    return true;
  }

  return false;
}

export async function showRoleSelection(ctx) {
  await respondFromCallback(
    ctx,
    "Выберите роль для работы с ботом:",
    getRoleSelectionKeyboard(),
    { ...NAV_NONE, showMainMenu: false },
  );
}

export async function showPendingTeacherVerification(ctx) {
  await respondFromCallback(
    ctx,
    "Ваш запрос на подтверждение преподавателя уже отправлен и ожидает решения администратора.",
    getPendingTeacherVerificationKeyboard(),
    { showBack: false },
  );
}

export async function showPendingTeacherVerificationMessage(recipient) {
  await MaxService.sendMessage(
    recipient,
    "Ваш запрос на подтверждение преподавателя уже отправлен и ожидает решения администратора.",
    getPendingTeacherVerificationKeyboard(),
  );
}

export async function routeUserAfterAuth(ctx) {
  const user = await UserService.findById(ctx.user.id);

  if (!user) {
    return;
  }

  if (!hasCompletedRoleSelection(user)) {
    await showRoleSelection({ ...ctx, user });
    return;
  }

  if (user.teacherVerificationStatus === "PENDING") {
    await showPendingTeacherVerification({ ...ctx, user });
    return;
  }

  await deliverMainMenu({ ...ctx, user });
}

export async function sendUserAfterAuth(ctx) {
  const user = await UserService.findById(ctx.user.id);

  if (!user) {
    return;
  }

  if (!hasCompletedRoleSelection(user)) {
    await sendBotMessage(
      ctx,
      "Выберите роль для работы с ботом:",
      getRoleSelectionKeyboard(),
      { showBack: false, showMainMenu: false },
    );
    return;
  }

  if (user.teacherVerificationStatus === "PENDING") {
    await sendBotMessage(
      ctx,
      "Ваш запрос на подтверждение преподавателя уже отправлен и ожидает решения администратора.",
      getPendingTeacherVerificationKeyboard(),
      { showBack: false },
    );
    return;
  }

  await deliverMainMenu({ ...ctx, user });
}
