import { prisma } from "@/lib/prisma";

export class TicketEventService {
  static async log(ticketId, type, actorId = null, payload = {}) {
    return prisma.ticketEvent.create({
      data: {
        ticketId,
        actorId,
        type,
        payload,
      },
    });
  }

  static async listForTicket(ticketId) {
    return prisma.ticketEvent.findMany({
      where: { ticketId },
      orderBy: { createdAt: "asc" },
      include: { actor: true },
    });
  }
}
