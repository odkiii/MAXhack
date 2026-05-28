export const TICKET_CATEGORIES = {
  LAB: "LAB",
  PROJECT: "PROJECT",
  ACCESS: "ACCESS",
  GRADING: "GRADING",
  RETAKE: "RETAKE",
  OTHER: "OTHER",
};

export const CATEGORY_LABELS = {
  [TICKET_CATEGORIES.LAB]: "Лабораторные работы",
  [TICKET_CATEGORIES.PROJECT]: "Проект",
  [TICKET_CATEGORIES.ACCESS]: "Доступы",
  [TICKET_CATEGORIES.GRADING]: "Оценивание",
  [TICKET_CATEGORIES.RETAKE]: "Пересдача",
  [TICKET_CATEGORIES.OTHER]: "Прочее",
};

export const TEACHERS = [
  {
    key: "teacher_1",
    maxUserId: "max_teacher_1",
    displayName: "Анна Смирнова",
    expertise: "DevOps, контейнеры",
  },
  {
    key: "teacher_2",
    maxUserId: "max_teacher_2",
    displayName: "Иван Петров",
    expertise: "Linux, сети",
  },
  {
    key: "teacher_3",
    maxUserId: "max_teacher_3",
    displayName: "Мария Козлова",
    expertise: "Репозитории, Git",
  },
];

export function getTeacherByKey(key) {
  return TEACHERS.find((teacher) => teacher.key === key) ?? null;
}

export function getTeacherByMaxUserId(maxUserId) {
  return TEACHERS.find((t) => t.maxUserId === String(maxUserId)) ?? null;
}

export function isConfiguredTeacher(maxUserId) {
  return Boolean(getTeacherByMaxUserId(maxUserId));
}
