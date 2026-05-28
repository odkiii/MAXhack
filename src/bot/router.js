import { UserService } from "@/services/user.service";
import { MaxService } from "@/services/max.service";
import { startHandler } from "@/bot/handlers/start.handler";
import { messageHandler } from "@/bot/handlers/message.handler";
import { callbackHandler } from "@/bot/handlers/callback.handler";
import { isStartCommand } from "@/lib/max-update";

function getRecipientFromMessage(message) {
  return (
    message?._maxRecipient ?? {
      chatId: null,
      chatType: "dialog",
      userId: message?.from?.id ?? null,
    }
  );
}

function getRecipientFromCallback(callbackQuery) {
  return (
    callbackQuery?.message?._maxRecipient ?? {
      chatId: null,
      chatType: "dialog",
      userId: callbackQuery?.from?.id ?? null,
    }
  );
}

export async function botRouter(update) {
  if (update.message) {
    const { message } = update;
    const from = message.from;

    if (!from?.id) {
      console.warn("[botRouter] message without from.id");
      return;
    }

    const user = await UserService.findOrCreate(from);
    const recipient = getRecipientFromMessage(message);
    const chatId = recipient.userId ?? recipient.chatId;
    const text = message.text ?? "";
    const attachments = message.attachments ?? [];

    const ctx = { user, chatId, recipient, text, attachments, message, update };

    if (isStartCommand(text) || update.update_type === "bot_started") {
      await startHandler(ctx);
      return;
    }

    await messageHandler(ctx);
    return;
  }

  if (update.callback_query) {
    const { callback_query: callbackQuery } = update;
    const from = callbackQuery.from;

    if (!from?.id) {
      console.warn("[botRouter] callback without from.id");
      return;
    }

    const user = await UserService.findOrCreate(from);
    const recipient = getRecipientFromCallback(callbackQuery);
    const chatId = recipient.userId ?? recipient.chatId;
    const data = callbackQuery.data ?? "";

    await MaxService.answerCallbackQuery(callbackQuery);

    await callbackHandler({
      user,
      chatId,
      recipient,
      data,
      callbackQuery,
      update,
    });
  }
}
