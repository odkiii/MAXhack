import { UserService } from "@/services/user.service";
import { TicketService } from "@/services/ticket.service";
import { respondFromCallback } from "@/bot/helpers/callback-response.helper";
import {
  formatTeacherFeedbackStats,
} from "@/bot/keyboards/feedback.keyboard";
import {
  METRICS_PER_PAGE,
  buildTeacherMetricsListText,
  getTeacherMetricsListKeyboard,
} from "@/bot/keyboards/metrics.keyboard";

export async function showTeacherOwnMetrics(ctx) {
  const stats = await TicketService.getFeedbackStatsForTeacher(ctx.user.id);
  const name = ctx.user.displayName ?? "преподаватель";

  await respondFromCallback(
    ctx,
    formatTeacherFeedbackStats(name, stats),
  );
}

export async function showAdminTeacherMetricsPage(ctx, page = 0) {
  const teachers = await UserService.listTeachersForSelection();
  const totalPages = Math.max(1, Math.ceil(teachers.length / METRICS_PER_PAGE));
  const safePage = Math.min(Math.max(page, 0), totalPages - 1);

  await respondFromCallback(
    ctx,
    buildTeacherMetricsListText(safePage, totalPages, teachers.length),
    getTeacherMetricsListKeyboard(teachers, safePage, totalPages),
  );
}

export async function showAdminTeacherMetricsDetail(ctx, teacherId) {
  const teacher = await UserService.findById(teacherId);

  if (!teacher || teacher.role !== "TEACHER") {
    await respondFromCallback(ctx, "Преподаватель не найден.");
    return;
  }

  const stats = await TicketService.getFeedbackStatsForTeacher(teacher.id);
  const name = teacher.displayName ?? teacher.maxUserId;

  await respondFromCallback(
    ctx,
    formatTeacherFeedbackStats(name, stats),
  );
}
