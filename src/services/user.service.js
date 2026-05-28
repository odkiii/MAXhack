import { prisma } from "@/lib/prisma";
import { extractDisplayName } from "@/lib/utils";
import { ROLES } from "@/bot/constants/roles";
import { isConfiguredTeacher } from "@/bot/constants/categories";

export class UserService {
  static async findOrCreate(maxUser, role = ROLES.STUDENT) {
    const maxUserId = String(maxUser.id);
    const displayName = extractDisplayName(maxUser);
    const effectiveRole = isConfiguredTeacher(maxUserId)
      ? ROLES.TEACHER
      : role;

    const existing = await prisma.user.findUnique({
      where: { maxUserId },
    });

    if (existing) {
      const updates = {};

      if (displayName && existing.displayName !== displayName) {
        updates.displayName = displayName;
      }

      if (isConfiguredTeacher(maxUserId) && existing.role !== ROLES.TEACHER) {
        updates.role = ROLES.TEACHER;
      }

      if (Object.keys(updates).length > 0) {
        return prisma.user.update({
          where: { id: existing.id },
          data: updates,
        });
      }

      return existing;
    }

    return prisma.user.create({
      data: {
        maxUserId,
        displayName,
        role: effectiveRole,
      },
    });
  }

  static async findByMaxUserId(maxUserId) {
    return prisma.user.findUnique({
      where: { maxUserId: String(maxUserId) },
    });
  }
}
