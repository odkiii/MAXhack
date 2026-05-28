import { prisma } from "@/lib/prisma";
import { MaxService } from "@/services/max.service";

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

    return MaxService.sendMessage(
      {
        userId: Number(maxUserId) || maxUserId,
        chatType: "dialog",
        chatId: null,
      },
      formatNotificationText(text),
      keyboard,
      mediaAttachments,
    );
  }

  static async notifyUserId(userId, text, keyboard = null, mediaAttachments = null) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return null;
    }

    return this.notifyMaxUser(user.maxUserId, text, keyboard, mediaAttachments);
  }
}
