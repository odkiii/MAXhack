import { CLOSE_OUTCOME_LABELS } from "@/bot/constants/statuses";

export function getFeedbackKeyboard(ticketId) {
  return {
    inline_keyboard: [
      [
        { text: "Полезно", callback_data: `fb_yes_${ticketId}` },
        { text: "Не полезно", callback_data: `fb_no_${ticketId}` },
      ],
    ],
  };
}

export function buildAnswerFeedbackPrompt(ticketNumber, reply) {
  return `Ответ по обращению #${ticketNumber}:

${reply}

Оцените ответ. Оценка используется только как метрика качества и не инициирует жалобы или апелляции.`;
}

export function buildClosedTicketFeedbackPrompt(ticket) {
  const parts = [`Обращение #${ticket.ticketNumber} закрыто.`];

  if (ticket.closeOutcome) {
    parts.push(
      `Итог: ${CLOSE_OUTCOME_LABELS[ticket.closeOutcome] ?? ticket.closeOutcome}`,
    );
  }

  if (ticket.teacherResponse) {
    parts.push(`\nОтвет:\n${ticket.teacherResponse}`);
  }

  if (ticket.selectedSlot) {
    parts.push(`\nКонсультация: ${ticket.selectedSlot}`);
  }

  parts.push(
    "\nОцените ответ. Оценка используется только как метрика качества и не инициирует жалобы или апелляции.",
  );

  return parts.join("\n");
}

export function formatTeacherFeedbackStats(teacherName, stats) {
  return `Метрики ответов: ${teacherName}

Полезно: ${stats.helpful} шт.
Не полезно: ${stats.notHelpful} шт.`;
}
