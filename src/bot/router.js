import { UserService } from "@/services/user.service";
import { MaxService } from "@/services/max.service";
import { startHandler } from "@/bot/handlers/start.handler";
import { messageHandler } from "@/bot/handlers/message.handler";
import { callbackHandler } from "@/bot/handlers/callback.handler";
import {
  getChatIdFromMessage,
  getChatIdFromCallback,
} from "@/lib/utils";
function getRecipientFromMessage(message) {
  return (
    message?._maxRecipient ?? {
      chatId: getChatIdFromMessage(message),
      chatType: "dialog",
      userId: message?.from?.id ?? null,
    }
  );
}

function getRecipientFromCallback(callbackQuery) {
  return (
    callbackQuery?.message?._maxRecipient ?? {
      chatId: getChatIdFromCallback(callbackQuery),
      chatType: "dialog",
      userId: callbackQuery?.from?.id ?? null,
    }
  );
}

export async function botRouter(update) {
  if (update.message) {
    const { message } = update;
    const from = message.from ?? { id: message.chat?.id };
    const user = await UserService.findOrCreate(from);
    const recipient = getRecipientFromMessage(message);
    const chatId = recipient.chatId ?? recipient.userId;
    const text = message.text ?? "";

    const ctx = { user, chatId, recipient, text, message, update };

    if (text.startsWith("/start")) {
      await startHandler(ctx);
      return;
    }

    await messageHandler(ctx);
    return;
  }

  if (update.callback_query) {
    const { callback_query: callbackQuery } = update;
    const from = callbackQuery.from;
    const user = await UserService.findOrCreate(from);
    const recipient = getRecipientFromCallback(callbackQuery);
    const chatId = recipient.chatId ?? recipient.userId;
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
