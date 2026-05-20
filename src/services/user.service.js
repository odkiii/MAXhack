import { prisma } from "@/lib/prisma";
import { extractDisplayName } from "@/lib/utils";
import { ROLES } from "@/bot/constants/roles";

export class UserService {
  static async findOrCreate(maxUser, role = ROLES.STUDENT) {
    const maxUserId = String(maxUser.id);
    const displayName = extractDisplayName(maxUser);

    const existing = await prisma.user.findUnique({
      where: { maxUserId },
    });

    if (existing) {
      if (displayName && existing.displayName !== displayName) {
        return prisma.user.update({
          where: { id: existing.id },
          data: { displayName },
        });
      }

      return existing;
    }

    return prisma.user.create({
      data: {
        maxUserId,
        displayName,
        role,
      },
    });
  }

  static async findByMaxUserId(maxUserId) {
    return prisma.user.findUnique({
      where: { maxUserId: String(maxUserId) },
    });
  }
}
