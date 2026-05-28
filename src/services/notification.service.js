import { prisma } from "@/lib/prisma";
import { MaxService } from "@/services/max.service";

export class NotificationService {
  static async notifyMaxUser(maxUserId, text, keyboard = null) {
    if (!maxUserId) {
      return null;
    }

    return MaxService.sendMessage(
      {
        userId: Number(maxUserId) || maxUserId,
        chatType: "dialog",
        chatId: null,
      },
      text,
      keyboard,
    );
  }

  static async notifyUserId(userId, text, keyboard = null) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return null;
    }

    return this.notifyMaxUser(user.maxUserId, text, keyboard);
  }
}
