import { prisma } from "@/lib/prisma";

export class UserDataService {
  static async deleteAllUserData(userId) {
    await prisma.$transaction([
      prisma.ticket.deleteMany({ where: { studentId: userId } }),
      prisma.userState.deleteMany({ where: { userId } }),
      prisma.consent.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
  }
}
