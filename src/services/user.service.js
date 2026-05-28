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
    const effectiveVerification = isConfiguredTeacher(maxUserId)
      ? "APPROVED"
      : "NONE";

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

      if (
        isConfiguredTeacher(maxUserId) &&
        existing.teacherVerificationStatus !== "APPROVED"
      ) {
        updates.teacherVerificationStatus = "APPROVED";
        updates.teacherVerificationApprovedAt = new Date();
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
        teacherVerificationStatus: effectiveVerification,
        teacherVerificationApprovedAt:
          effectiveVerification === "APPROVED" ? new Date() : null,
      },
    });
  }

  static async findByMaxUserId(maxUserId) {
    return prisma.user.findUnique({
      where: { maxUserId: String(maxUserId) },
    });
  }

  static async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async setRoleStudent(userId) {
    return prisma.user.update({
      where: { id: userId },
      data: { role: ROLES.STUDENT },
    });
  }

  static async requestTeacherVerification(userId) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        role: ROLES.TEACHER,
        teacherVerificationStatus: "PENDING",
        teacherVerificationRequestedAt: new Date(),
      },
    });
  }

  static async approveTeacherVerification(userId) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        role: ROLES.TEACHER,
        teacherVerificationStatus: "APPROVED",
        teacherVerificationApprovedAt: new Date(),
      },
    });
  }

  static async rejectTeacherVerification(userId) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        role: ROLES.STUDENT,
        teacherVerificationStatus: "REJECTED",
      },
    });
  }

  static async listPendingTeacherVerifications() {
    return prisma.user.findMany({
      where: { teacherVerificationStatus: "PENDING" },
      orderBy: { teacherVerificationRequestedAt: "asc" },
    });
  }
}
