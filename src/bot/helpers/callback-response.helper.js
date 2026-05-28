import { MaxService } from "@/services/max.service";

export async function respondFromCallback(ctx, text, keyboard = null) {
  if (ctx.callbackQuery) {
    return MaxService.replyFromCallback(
      ctx.callbackQuery,
      ctx.recipient,
      text,
      keyboard,
    );
  }

  return MaxService.sendMessage(ctx.recipient, text, keyboard);
}
