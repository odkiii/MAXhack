import { MaxService } from "@/services/max.service";
import { resolveMenuRole } from "@/bot/helpers/menu.helper";
import { ROLES } from "@/bot/constants/roles";
import { handleStudentCallback } from "@/bot/handlers/student.callback.handler";
import { handleTeacherCallback } from "@/bot/handlers/teacher.callback.handler";

export async function callbackHandler(ctx) {
  const { recipient, data } = ctx;
  const role = resolveMenuRole(ctx.user);

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
