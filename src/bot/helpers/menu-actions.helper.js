import { resolveMenuRole, deliverMainMenu } from "@/bot/helpers/menu.helper";
import { ROLES } from "@/bot/constants/roles";
import { handleStudentCallback } from "@/bot/handlers/student.callback.handler";
import { handleTeacherCallback } from "@/bot/handlers/teacher.callback.handler";
import { startHandler } from "@/bot/handlers/start.handler";

export async function dispatchMenuTextAction(ctx, action) {
  if (action === "start" || action === "main_menu") {
    if (action === "start") {
      await startHandler(ctx);
      return true;
    }

    await deliverMainMenu(ctx);
    return true;
  }

  const role = resolveMenuRole(ctx.user);

  if (role === ROLES.TEACHER) {
    const handled = await handleTeacherCallback(ctx, action);

    if (handled) {
      return true;
    }
  }

  const handled = await handleStudentCallback(ctx, action);

  return handled;
}
