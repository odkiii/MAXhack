import { sendMessage, answerCallback } from "@/lib/max-api";
import { toMaxAttachments } from "@/lib/max-keyboard";

export class MaxService {
  static async sendMessage(target, text, keyboard = null) {
    const recipient = resolveRecipient(target);
    const attachments = toMaxAttachments(keyboard);

    if (!process.env.MAX_BOT_TOKEN) {
      console.log("[MAX API mock]", { recipient, textPreview: text?.slice(0, 60) });
      return { ok: true, mock: true };
    }

    try {
      const result = await sendMessage(recipient, text, attachments);
      console.log("[MAX API] sent", { userId: recipient.userId, chatId: recipient.chatId });
      return result;
    } catch (error) {
      console.error("[MAX API] send failed", {
        status: error.status,
        data: error.data,
        recipient,
      });

      if (error.status === 401 && process.env.MAX_USE_BEARER !== "1") {
        console.error("[MAX API] Tip: set MAX_USE_BEARER=1 in Vercel env and redeploy");
      }

      throw error;
    }
  }

  static async answerCallbackQuery(callbackQuery, notification = "OK") {
    const callbackId = callbackQuery?.id;

    if (!callbackId || !process.env.MAX_BOT_TOKEN) {
      return { ok: true, mock: true };
    }

    try {
      return await answerCallback(callbackId, { notification });
    } catch (error) {
      console.error("[MAX API] callback answer failed", {
        status: error.status,
        data: error.data,
      });
    }
  }
}

function resolveRecipient(target) {
  if (
    target &&
    typeof target === "object" &&
    ("chatType" in target || "userId" in target || "chatId" in target)
  ) {
    return {
      chatId: target.chatId ?? null,
      chatType: target.chatType ?? "dialog",
      userId: target.userId ?? null,
    };
  }

  return {
    chatId: null,
    chatType: "dialog",
    userId: target,
  };
}
