export const TEACHERS_PER_PAGE = 5;

export function getTeacherSelectionPageKeyboard(teachers, page, totalPages) {
  const start = page * TEACHERS_PER_PAGE;
  const pageTeachers = teachers.slice(start, start + TEACHERS_PER_PAGE);

  const rows = pageTeachers.map((teacher) => [
    {
      text: teacher.displayName ?? `Преподаватель ${teacher.id.slice(0, 6)}`,
      callback_data: `pick_teacher_${teacher.id}`,
    },
  ]);

  if (totalPages > 1) {
    rows.push(buildPaginationRow(page, totalPages));
  }

  return { inline_keyboard: rows };
}

function buildPaginationRow(page, totalPages) {
  const current = page + 1;
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  if (isFirst) {
    return [
      {
        text: `стр. ${current} из ${totalPages}`,
        callback_data: "tpage_noop",
      },
      {
        text: "➡️",
        callback_data: `tpage_${page + 1}`,
      },
    ];
  }

  if (isLast) {
    return [
      {
        text: "⬅️",
        callback_data: `tpage_${page - 1}`,
      },
      {
        text: `стр. ${current}/${totalPages}`,
        callback_data: "tpage_noop",
      },
    ];
  }

  return [
    {
      text: "⬅️",
      callback_data: `tpage_${page - 1}`,
    },
    {
      text: `стр. ${current} из ${totalPages}`,
      callback_data: "tpage_noop",
    },
    {
      text: "➡️",
      callback_data: `tpage_${page + 1}`,
    },
  ];
}

export function buildTeacherSelectionText(page, totalPages, totalTeachers) {
  if (totalTeachers === 0) {
    return "Сейчас нет доступных преподавателей в системе.";
  }

  if (totalPages <= 1) {
    return "Выберите преподавателя:";
  }

  return `Выберите преподавателя (стр. ${page + 1} из ${totalPages}):`;
}
