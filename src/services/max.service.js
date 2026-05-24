import { sendMessage, answerCallback } from "@/lib/max-api";
import { toMaxAttachments } from "@/lib/max-keyboard";
import { getRecipientFromContext } from "@/lib/max-update";

export class MaxService {
  /**
   * @param {object|string|number} target - recipient { userId, chatId, chatType } or legacy chatId
   */
  static async sendMessage(target, text, keyboard = null) {
    const recipient = resolveRecipient(target);
    const attachments = toMaxAttachments(keyboard);

    if (!process.env.MAX_BOT_TOKEN) {
      console.log("[MAX API mock]", { recipient, text, keyboard });
      return { ok: true, mock: true };
    }

    try {
      const result = await sendMessage(recipient, text, attachments);
      console.log("[MAX API] message sent", {
        recipient,
        textPreview: text.slice(0, 80),
      });
      return result;
    } catch (error) {
      console.error("[MAX API] send failed", {
        status: error.status,
        data: error.data,
        recipient,
      });
      throw error;
    }
  }

  static async sendFromContext(ctx, text, keyboard = null) {
    const recipient = getRecipientFromContext(ctx);
    return this.sendMessage(recipient, text, keyboard);
  }

  static async answerCallbackQuery(callbackQuery, notification = null) {
    const callbackId = callbackQuery?.id;

    if (!callbackId || !process.env.MAX_BOT_TOKEN) {
      return { ok: true, mock: true };
    }

    try {
      return await answerCallback(callbackId, {
        notification: notification ?? undefined,
      });
    } catch (error) {
      console.error("[MAX API] callback answer failed", {
        status: error.status,
        data: error.data,
      });
    }
  }
}

function resolveRecipient(target) {
  if (target && typeof target === "object" && ("chatType" in target || "userId" in target)) {
    return target;
  }

  return {
    chatId: target,
    chatType: "dialog",
    userId: target,
  };
}
