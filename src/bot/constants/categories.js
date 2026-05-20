export const TICKET_CATEGORIES = {
  ACADEMIC: "ACADEMIC",
  TECHNICAL: "TECHNICAL",
  CAREER: "CAREER",
  OTHER: "OTHER",
};

export const CATEGORY_LABELS = {
  [TICKET_CATEGORIES.ACADEMIC]: "Учёба",
  [TICKET_CATEGORIES.TECHNICAL]: "Технические вопросы",
  [TICKET_CATEGORIES.CAREER]: "Карьера",
  [TICKET_CATEGORIES.OTHER]: "Другое",
};

export const TEACHERS = [
  {
    key: "teacher_1",
    maxUserId: "max_teacher_1",
    displayName: "Анна Смирнова",
  },
  {
    key: "teacher_2",
    maxUserId: "max_teacher_2",
    displayName: "Иван Петров",
  },
  {
    key: "teacher_3",
    maxUserId: "max_teacher_3",
    displayName: "Мария Козлова",
  },
];

export function getTeacherByKey(key) {
  return TEACHERS.find((teacher) => teacher.key === key) ?? null;
}
