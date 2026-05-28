import { MaxService } from "@/services/max.service";
import { resolveMenuRole } from "@/bot/helpers/menu.helper";
import { ROLES } from "@/bot/constants/roles";
import { handleStudentCallback } from "@/bot/handlers/student.callback.handler";
import { handleTeacherCallback } from "@/bot/handlers/teacher.callback.handler";
import { UserService } from "@/services/user.service";
import { NotificationService } from "@/services/notification.service";

function isAdmin(user) {
  return (
    user.role === ROLES.ADMIN ||
    String(user.maxUserId) === String(process.env.ADMIN_MAX_USER_ID ?? "")
  );
}

export async function callbackHandler(ctx) {
  const { recipient, data } = ctx;
  const role = resolveMenuRole(ctx.user);

  if (isAdmin(ctx.user) && data.startsWith("admin_verify_")) {
    const userId = data.replace("admin_verify_", "");
    const approved = await UserService.approveTeacherVerification(userId);

    await MaxService.sendMessage(
      recipient,
      `Подтверждено: ${approved.displayName ?? approved.maxUserId}`,
    );
    await NotificationService.notifyUserId(
      approved.id,
      "Ваша личность подтверждена администратором. Роль преподавателя активирована.",
    );
    return;
  }

  if (isAdmin(ctx.user) && data.startsWith("admin_reject_")) {
    const userId = data.replace("admin_reject_", "");
    const rejected = await UserService.rejectTeacherVerification(userId);

    await MaxService.sendMessage(
      recipient,
      `Отклонено: ${rejected.displayName ?? rejected.maxUserId}`,
    );
    await NotificationService.notifyUserId(
      rejected.id,
      "Запрос на подтверждение преподавателя отклонен. Вы можете повторить запрос позже.",
    );
    return;
  }

  if (role === ROLES.TEACHER) {
    const teacherHandled = await handleTeacherCallback(ctx, data);

    if (teacherHandled) {
      return;
    }
  }

  const studentHandled = await handleStudentCallback(ctx, data);

  if (studentHandled) {
    return;
  }

  await MaxService.sendMessage(
    recipient,
    "Неизвестное действие. Используйте /start.",
  );
}
