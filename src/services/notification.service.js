import { prisma } from "@/lib/prisma";
import { MaxService } from "@/services/max.service";
import { canDeliverMaxNotification } from "@/bot/constants/categories";

const NOTIFICATION_PREFIX = "🔔 ";

function formatNotificationText(text) {
  const trimmed = (text ?? "").trim();

  if (!trimmed) {
    return NOTIFICATION_PREFIX.trim();
  }

  if (trimmed.startsWith(NOTIFICATION_PREFIX.trim())) {
    return trimmed;
  }

  return `${NOTIFICATION_PREFIX}${trimmed}`;
}

export class NotificationService {
  static async notifyMaxUser(maxUserId, text, keyboard = null, mediaAttachments = null) {
    if (!maxUserId) {
      return null;
    }

    if (!canDeliverMaxNotification(maxUserId)) {
      console.log("[notify] skipped — not a real MAX user id:", maxUserId);
      return { ok: true, skipped: true };
    }

    try {
      return await MaxService.sendMessage(
        {
          userId: Number(maxUserId) || maxUserId,
          chatType: "dialog",
          chatId: null,
        },
        formatNotificationText(text),
        keyboard,
        mediaAttachments,
      );
    } catch (error) {
      console.error("[notify] failed", {
        maxUserId,
        status: error.status,
        data: error.data,
      });
      return { ok: false, error };
    }
  }

  static async notifyUserId(userId, text, keyboard = null, mediaAttachments = null) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return null;
    }

    return this.notifyMaxUser(user.maxUserId, text, keyboard, mediaAttachments);
  }
}
