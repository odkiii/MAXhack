import { prisma } from "@/lib/prisma";

const DOCUMENTS_VERSION = "1.0";

export class ConsentService {
  static async hasConsent(userId) {
    const consent = await prisma.consent.findUnique({
      where: { userId },
    });

    return Boolean(consent);
  }

  static async accept(userId) {
    return prisma.consent.upsert({
      where: { userId },
      create: {
        userId,
        documentsVersion: DOCUMENTS_VERSION,
      },
      update: {
        documentsVersion: DOCUMENTS_VERSION,
        acceptedAt: new Date(),
      },
    });
  }
}
