export function getTeacherTicketActionsKeyboard(ticketId, status) {
  const rows = [];

  if (status === "NEW") {
    rows.push([
      { text: "Принять в работу", callback_data: `t_accept_${ticketId}` },
    ]);
  }

  if (status === "SCHEDULED") {
    rows.push([
      { text: "Закрыть (консультация)", callback_data: `t_finalize_${ticketId}` },
    ]);
  }

  if (["NEW", "IN_PROGRESS", "SCHEDULED"].includes(status)) {
    rows.push([
      { text: "Запросить уточнение", callback_data: `t_clarify_${ticketId}` },
    ]);
    rows.push([
      { text: "Ответить", callback_data: `t_reply_${ticketId}` },
    ]);
    rows.push([
      { text: "Закрыть", callback_data: `t_close_${ticketId}` },
    ]);
  }

  rows.push([{ text: "Назад", callback_data: "t_queue" }]);

  return { inline_keyboard: rows };
}

export function getClarificationTypesKeyboard(ticketId, selected = []) {
  const types = [
    ["REPO_LINK", "Ссылка на репозиторий"],
    ["GROUP_NUMBER", "Номер группы"],
    ["ERROR_SCREENSHOT", "Скриншот ошибки"],
    ["LESSON_TOPIC", "Тема занятия"],
  ];

  return {
    inline_keyboard: [
      ...types.map(([key, label]) => {
        const on = selected.includes(key);
        return [
          {
            text: `${on ? "✓ " : ""}${label}`,
            callback_data: `t_clt_${ticketId}_${key}`,
          },
        ];
      }),
      [{ text: "Готово → комментарий", callback_data: `t_clt_done_${ticketId}` }],
      [{ text: "Отмена", callback_data: `t_view_${ticketId}` }],
    ],
  };
}

export function getCloseOutcomeKeyboard(ticketId) {
  return {
    inline_keyboard: [
      [{ text: "Решено", callback_data: `t_co_${ticketId}_RESOLVED` }],
      [{ text: "Перенаправлено", callback_data: `t_co_${ticketId}_REDIRECTED` }],
      [{ text: "Отказано с причиной", callback_data: `t_co_${ticketId}_REJECTED` }],
      [
        {
          text: "Консультация (слоты)",
          callback_data: `t_co_${ticketId}_CONSULTATION_SCHEDULED`,
        },
      ],
      [{ text: "Отмена", callback_data: `t_view_${ticketId}` }],
    ],
  };
}

export function getTicketListKeyboard(tickets, prefix) {
  return {
    inline_keyboard: [
      ...tickets.slice(0, 10).map((t) => [
        {
          text: `#${t.ticketNumber} · ${t.title ?? "Обращение"}`,
          callback_data: `${prefix}_${t.id}`,
        },
      ]),
      [{ text: "В меню преподавателя", callback_data: "main_menu" }],
    ],
  };
}
