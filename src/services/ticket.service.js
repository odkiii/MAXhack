import { prisma } from "@/lib/prisma";
import { TICKET_STATUSES } from "@/bot/constants/statuses";
import { buildTicketTitle } from "@/bot/helpers/ticket-format";
import { TicketEventService } from "@/services/ticket-event.service";

export class TicketService {
  static async create(data) {
    const { studentId, teacherId, category, description } = data;
    const title = buildTicketTitle(description);

    const ticket = await prisma.ticket.create({
      data: {
        studentId,
        teacherId,
        category,
        description,
        title,
        status: TICKET_STATUSES.NEW,
      },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(ticket.id, "CREATED", studentId, {
      category,
    });

    return ticket;
  }

  static async findByIdForStudent(ticketId, studentId) {
    return prisma.ticket.findFirst({
      where: { id: ticketId, studentId },
      include: { teacher: true, student: true },
    });
  }

  static async findByIdForTeacher(ticketId, teacherId) {
    return prisma.ticket.findFirst({
      where: { id: ticketId, teacherId },
      include: { teacher: true, student: true },
    });
  }

  static async findByNumberForStudent(ticketNumber, studentId) {
    return prisma.ticket.findFirst({
      where: { ticketNumber, studentId },
      include: { teacher: true },
    });
  }

  static async listByStudent(studentId) {
    return prisma.ticket.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
      include: { teacher: true },
    });
  }

  static async listNewByTeacher(teacherId) {
    return prisma.ticket.findMany({
      where: { teacherId, status: TICKET_STATUSES.NEW },
      orderBy: { createdAt: "asc" },
      include: { student: true },
    });
  }

  static async listActiveByTeacher(teacherId) {
    return prisma.ticket.findMany({
      where: {
        teacherId,
        status: {
          in: [
            TICKET_STATUSES.IN_PROGRESS,
            TICKET_STATUSES.AWAITING_CLARIFICATION,
            TICKET_STATUSES.SCHEDULED,
          ],
        },
      },
      orderBy: { updatedAt: "desc" },
      include: { student: true },
    });
  }

  static async listClosedByTeacher(teacherId, limit = 20) {
    return prisma.ticket.findMany({
      where: { teacherId, status: TICKET_STATUSES.CLOSED },
      orderBy: { updatedAt: "desc" },
      take: limit,
      include: { student: true },
    });
  }

  static async accept(ticketId, teacherId) {
    const ticket = await this.updateStatus(
      ticketId,
      teacherId,
      TICKET_STATUSES.IN_PROGRESS,
      "ACCEPTED",
      teacherId,
    );
    return ticket;
  }

  static async requestClarification(
    ticketId,
    teacherId,
    clarificationTypes,
    comment,
  ) {
    const owned = await prisma.ticket.findFirst({
      where: { id: ticketId, teacherId },
    });

    if (!owned) {
      return null;
    }

    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: TICKET_STATUSES.AWAITING_CLARIFICATION,
        clarificationTypes,
        clarificationComment: comment ?? null,
        clarificationAnswer: null,
      },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(
      ticketId,
      "CLARIFICATION_REQUESTED",
      teacherId,
      { types: clarificationTypes, comment },
    );

    return ticket;
  }

  static async answerClarification(ticketId, studentId, answer) {
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: TICKET_STATUSES.IN_PROGRESS,
        clarificationAnswer: answer,
      },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(
      ticketId,
      "CLARIFICATION_ANSWERED",
      studentId,
      { answer },
    );

    return ticket;
  }

  static async addTeacherReply(ticketId, teacherId, text) {
    const owned = await prisma.ticket.findFirst({
      where: { id: ticketId, teacherId },
    });

    if (!owned) {
      return null;
    }

    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        teacherResponse: text,
        status: TICKET_STATUSES.IN_PROGRESS,
      },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(ticketId, "TEACHER_REPLIED", teacherId, {
      text,
    });

    return ticket;
  }

  static async proposeSlots(ticketId, teacherId, slots) {
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        proposedSlots: slots,
        status: TICKET_STATUSES.SCHEDULED,
      },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(ticketId, "SLOTS_PROPOSED", teacherId, {
      slots,
    });

    return ticket;
  }

  static async selectSlot(ticketId, studentId, slot) {
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        selectedSlot: slot,
        status: TICKET_STATUSES.SCHEDULED,
      },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(ticketId, "SLOT_SELECTED", studentId, {
      slot,
    });

    return ticket;
  }

  static async close(ticketId, actorId, outcome, reason = null) {
    const existing = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!existing) {
      return null;
    }

    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: TICKET_STATUSES.CLOSED,
        closeOutcome: outcome,
        closeReason: reason,
      },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(ticketId, "CLOSED", actorId, {
      outcome,
      reason,
    });

    return ticket;
  }

  static async setFeedback(ticketId, studentId, feedback) {
    const existing = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        studentId,
        status: TICKET_STATUSES.CLOSED,
      },
    });

    if (!existing || existing.feedback) {
      return null;
    }

    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { feedback },
      include: { teacher: true },
    });

    await TicketEventService.log(ticketId, "FEEDBACK_LEFT", studentId, {
      feedback,
    });

    return ticket;
  }

  static async studentCloseAsResolved(ticketId, studentId) {
    const existing = await prisma.ticket.findFirst({
      where: { id: ticketId, studentId },
    });

    if (!existing) {
      return null;
    }

    return this.close(
      ticketId,
      studentId,
      "RESOLVED",
      "Закрыто студентом после получения ответа",
    );
  }

  static async updateStatus(
    ticketId,
    teacherId,
    status,
    eventType,
    actorId,
  ) {
    const existing = await prisma.ticket.findFirst({
      where: { id: ticketId, teacherId },
    });

    if (!existing) {
      return null;
    }

    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
      include: { student: true, teacher: true },
    });

    await TicketEventService.log(ticketId, eventType, actorId, { status });

    return ticket;
  }
}
