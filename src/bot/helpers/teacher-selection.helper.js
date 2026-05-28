import { UserService } from "@/services/user.service";
import { respondFromCallback } from "@/bot/helpers/callback-response.helper";
import {
  TEACHERS_PER_PAGE,
  buildTeacherSelectionText,
  getTeacherSelectionPageKeyboard,
} from "@/bot/keyboards/teacher-selection.keyboard";

export async function showTeacherSelectionPage(ctx, page = 0) {
  const teachers = await UserService.listTeachersForSelection();
  const totalPages = Math.max(1, Math.ceil(teachers.length / TEACHERS_PER_PAGE));
  const safePage = Math.min(Math.max(page, 0), totalPages - 1);

  await respondFromCallback(
    ctx,
    buildTeacherSelectionText(safePage, totalPages, teachers.length),
    getTeacherSelectionPageKeyboard(teachers, safePage, totalPages),
  );

  return { teachers, page: safePage, totalPages };
}
