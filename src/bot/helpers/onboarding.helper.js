import { MaxService } from "@/services/max.service";
import { UserService } from "@/services/user.service";
import { isConfiguredTeacher } from "@/bot/constants/categories";
import { getRoleSelectionKeyboard, getPendingTeacherVerificationKeyboard } from "@/bot/keyboards/role.keyboard";
import { sendMainMenuMessage } from "@/bot/helpers/menu.helper";
import { respondFromCallback } from "@/bot/helpers/callback-response.helper";

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
  );
}

export async function showPendingTeacherVerification(ctx) {
  await respondFromCallback(
    ctx,
    "Ваш запрос на подтверждение преподавателя уже отправлен и ожидает решения администратора.",
    getPendingTeacherVerificationKeyboard(),
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

  await sendMainMenuMessage(ctx.recipient, user);
}

export async function sendUserAfterAuth(ctx) {
  const user = await UserService.findById(ctx.user.id);

  if (!user) {
    return;
  }

  if (!hasCompletedRoleSelection(user)) {
    await MaxService.sendMessage(
      ctx.recipient,
      "Выберите роль для работы с ботом:",
      getRoleSelectionKeyboard(),
    );
    return;
  }

  if (user.teacherVerificationStatus === "PENDING") {
    await MaxService.sendMessage(
      ctx.recipient,
      "Ваш запрос на подтверждение преподавателя уже отправлен и ожидает решения администратора.",
      getPendingTeacherVerificationKeyboard(),
    );
    return;
  }

  await sendMainMenuMessage(ctx.recipient, user);
}
