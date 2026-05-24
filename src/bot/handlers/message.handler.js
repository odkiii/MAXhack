import { StateService } from "@/services/state.service";
import { MaxService } from "@/services/max.service";
import { FSM_STATES } from "@/bot/states/ticketCreation.states";
import { getConfirmationKeyboard } from "@/bot/keyboards/ticket.keyboard";
import {
  CATEGORY_LABELS,
  getTeacherByKey,
} from "@/bot/constants/categories";
import { startHandler } from "@/bot/handlers/start.handler";

function buildTicketSummary(payload) {
  const teacher = getTeacherByKey(payload.teacherKey);
  const categoryLabel = CATEGORY_LABELS[payload.category] ?? payload.category;

  return `Проверьте данные тикета:

Преподаватель: ${teacher?.displayName ?? "—"}
Категория: ${categoryLabel}
Описание: ${payload.description}

Подтвердите создание тикета или отмените.`;
}

export async function messageHandler(ctx) {
  const { user, chatId, text } = ctx;

  if (text === "/start") {
    await startHandler(ctx);
    return;
  }

  const { state, payload } = await StateService.get(user.id);

  if (state !== FSM_STATES.WAITING_DESCRIPTION) {
    await MaxService.sendMessage(
      ctx.recipient,
      "Используйте меню или команду /start.",
    );
    return;
  }

  const description = text?.trim();

  if (!description) {
    await MaxService.sendMessage(
      ctx.recipient,
      "Пожалуйста, отправьте текстовое описание вопроса.",
    );
    return;
  }

  const nextPayload = {
    ...payload,
    description,
  };

  await StateService.set(
    user.id,
    FSM_STATES.WAITING_CONFIRMATION,
    nextPayload,
  );

  await MaxService.sendMessage(
    ctx.recipient,
    buildTicketSummary(nextPayload),
    getConfirmationKeyboard(),
  );
}
