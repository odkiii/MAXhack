import { resolveMenuRole } from "@/bot/helpers/menu.helper";
import { ROLES } from "@/bot/constants/roles";
import { handleStudentCallback } from "@/bot/handlers/student.callback.handler";
import { handleTeacherCallback } from "@/bot/handlers/teacher.callback.handler";
import { UserService } from "@/services/user.service";
import { NotificationService } from "@/services/notification.service";
import { StateService } from "@/services/state.service";
import { NavigationService } from "@/services/navigation.service";
import { isAdmin } from "@/bot/helpers/admin.helper";
import { respondFromCallback } from "@/bot/helpers/callback-response.helper";
import { handleNavigationBack } from "@/bot/helpers/navigation.helper";
import { showMainMenu } from "@/bot/helpers/menu.helper";
import {
  showAdminTeacherMetricsPage,
  showAdminTeacherMetricsDetail,
} from "@/bot/helpers/metrics.helper";
import { getBackToMenuKeyboard } from "@/bot/keyboards/menu.keyboard";
import { NAV_CALLBACKS } from "@/bot/constants/navigation";

function buildPendingTeachersKeyboard(pending) {
  return {
    inline_keyboard: [
      ...pending.map((user) => [
        {
          text: `Подтвердить: ${user.displayName ?? user.maxUserId}`,
          callback_data: `admin_verify_${user.id}`,
        },
        {
          text: "Отклонить",
          callback_data: `admin_reject_${user.id}`,
        },
      ]),
      [{ text: "В главное меню", callback_data: "main_menu" }],
    ],
  };
}

async function showPendingTeachers(ctx) {
  const pending = await UserService.listPendingTeacherVerifications();

  if (pending.length === 0) {
    await respondFromCallback(
      ctx,
      "Нет ожидающих запросов на подтверждение преподавателей.",
      getBackToMenuKeyboard(ctx.user),
    );
    return;
  }

  const lines = pending
    .map(
      (user, index) =>
        `${index + 1}. ${user.displayName ?? "без имени"} · MAX ID: ${user.maxUserId}`,
    )
    .join("\n");

  await respondFromCallback(
    ctx,
    `Запросы на подтверждение преподавателей (${pending.length}):\n\n${lines}`,
    buildPendingTeachersKeyboard(pending),
  );
}

export async function callbackHandler(ctx) {
  const { data } = ctx;

  if (data === NAV_CALLBACKS.BACK) {
    await handleNavigationBack(ctx);
    return;
  }

  if (data === NAV_CALLBACKS.MAIN_MENU || data === "main_menu") {
    await StateService.clear(ctx.user.id);
    await NavigationService.clear(ctx.user.id);
    await showMainMenu(ctx);
    return;
  }

  const role = resolveMenuRole(ctx.user);

  if (isAdmin(ctx.user) && data === "admin_pending_teachers") {
    await showPendingTeachers(ctx);
    return;
  }

  if (isAdmin(ctx.user) && data === "admin_teacher_metrics") {
    await showAdminTeacherMetricsPage(ctx, 0);
    return;
  }

  if (isAdmin(ctx.user) && data.startsWith("admin_mpage_")) {
    if (data === "admin_mpage_noop") {
      return;
    }

    const page = Number.parseInt(data.replace("admin_mpage_", ""), 10);

    if (Number.isNaN(page)) {
      return;
    }

    await showAdminTeacherMetricsPage(ctx, page);
    return;
  }

  if (isAdmin(ctx.user) && data.startsWith("admin_mview_")) {
    const teacherId = data.replace("admin_mview_", "");
    await showAdminTeacherMetricsDetail(ctx, teacherId);
    return;
  }

  if (isAdmin(ctx.user) && data.startsWith("admin_verify_")) {
    const userId = data.replace("admin_verify_", "");
    const approved = await UserService.approveTeacherVerification(userId);

    await NotificationService.notifyUserId(
      approved.id,
      "Ваша личность подтверждена администратором. Роль преподавателя активирована.",
    );

    const pending = await UserService.listPendingTeacherVerifications();

    if (pending.length === 0) {
      await respondFromCallback(
        ctx,
        `Подтверждено: ${approved.displayName ?? approved.maxUserId}.\n\nБольше нет ожидающих запросов.`,
        getBackToMenuKeyboard(ctx.user),
      );
      return;
    }

    const lines = pending
      .map(
        (user, index) =>
          `${index + 1}. ${user.displayName ?? "без имени"} · MAX ID: ${user.maxUserId}`,
      )
      .join("\n");

    await respondFromCallback(
      ctx,
      `Подтверждено: ${approved.displayName ?? approved.maxUserId}.\n\nОсталось запросов (${pending.length}):\n\n${lines}`,
      buildPendingTeachersKeyboard(pending),
    );
    return;
  }

  if (isAdmin(ctx.user) && data.startsWith("admin_reject_")) {
    const userId = data.replace("admin_reject_", "");
    const rejected = await UserService.rejectTeacherVerification(userId);

    await NotificationService.notifyUserId(
      rejected.id,
      "Запрос на подтверждение преподавателя отклонен. Вы можете повторить запрос позже.",
    );

    const pending = await UserService.listPendingTeacherVerifications();

    if (pending.length === 0) {
      await respondFromCallback(
        ctx,
        `Отклонено: ${rejected.displayName ?? rejected.maxUserId}.\n\nБольше нет ожидающих запросов.`,
        getBackToMenuKeyboard(ctx.user),
      );
      return;
    }

    const lines = pending
      .map(
        (user, index) =>
          `${index + 1}. ${user.displayName ?? "без имени"} · MAX ID: ${user.maxUserId}`,
      )
      .join("\n");

    await respondFromCallback(
      ctx,
      `Отклонено: ${rejected.displayName ?? rejected.maxUserId}.\n\nОсталось запросов (${pending.length}):\n\n${lines}`,
      buildPendingTeachersKeyboard(pending),
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

  await respondFromCallback(
    ctx,
    "Неизвестное действие. Используйте /start.",
  );
}
