import { prisma } from "@/lib/prisma";
import { TICKET_STATUSES } from "@/bot/constants/statuses";

export class TicketService {
  static async create(data) {
    const { studentId, teacherId, category, description } = data;

    return prisma.ticket.create({
      data: {
        studentId,
        teacherId,
        category,
        description,
        status: TICKET_STATUSES.OPEN,
      },
      include: {
        student: true,
        teacher: true,
      },
    });
  }
}
