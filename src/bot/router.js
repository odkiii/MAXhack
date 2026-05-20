import { UserService } from "@/services/user.service";
import { startHandler } from "@/bot/handlers/start.handler";
import { messageHandler } from "@/bot/handlers/message.handler";
import { callbackHandler } from "@/bot/handlers/callback.handler";
import {
  getChatIdFromMessage,
  getChatIdFromCallback,
} from "@/lib/utils";

export async function botRouter(update) {
  if (update.message) {
    const { message } = update;
    const from = message.from ?? { id: message.chat?.id };
    const user = await UserService.findOrCreate(from);
    const chatId = getChatIdFromMessage(message);
    const text = message.text ?? "";

    const ctx = { user, chatId, text, message, update };

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
    const chatId = getChatIdFromCallback(callbackQuery);
    const data = callbackQuery.data ?? "";

    await callbackHandler({
      user,
      chatId,
      data,
      callbackQuery,
      update,
    });
  }
}
