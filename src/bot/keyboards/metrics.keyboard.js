export const METRICS_PER_PAGE = 5;

export function getTeacherMetricsListKeyboard(teachers, page, totalPages, prefix = "admin_mview") {
  const start = page * METRICS_PER_PAGE;
  const pageTeachers = teachers.slice(start, start + METRICS_PER_PAGE);

  const rows = pageTeachers.map((teacher) => [
    {
      text: teacher.displayName ?? `Преподаватель ${teacher.id.slice(0, 6)}`,
      callback_data: `${prefix}_${teacher.id}`,
    },
  ]);

  if (totalPages > 1) {
    rows.push(buildMetricsPaginationRow(page, totalPages));
  }

  return { inline_keyboard: rows };
}

function buildMetricsPaginationRow(page, totalPages) {
  const current = page + 1;
  const isFirst = page === 0;
  const isLast = page === totalPages - 1;

  if (isFirst) {
    return [
      { text: `стр. ${current} из ${totalPages}`, callback_data: "admin_mpage_noop" },
      { text: "➡️", callback_data: `admin_mpage_${page + 1}` },
    ];
  }

  if (isLast) {
    return [
      { text: "⬅️", callback_data: `admin_mpage_${page - 1}` },
      { text: `стр. ${current}/${totalPages}`, callback_data: "admin_mpage_noop" },
    ];
  }

  return [
    { text: "⬅️", callback_data: `admin_mpage_${page - 1}` },
    { text: `стр. ${current} из ${totalPages}`, callback_data: "admin_mpage_noop" },
    { text: "➡️", callback_data: `admin_mpage_${page + 1}` },
  ];
}

export function buildTeacherMetricsListText(page, totalPages, totalTeachers) {
  if (totalTeachers === 0) {
    return "Преподаватели не найдены.";
  }

  if (totalPages <= 1) {
    return "Выберите преподавателя для просмотра метрик:";
  }

  return `Метрики преподавателей (стр. ${page + 1} из ${totalPages}):`;
}
