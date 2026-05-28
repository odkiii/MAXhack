export const TEACHERS = [
  {
    key: "teacher_1",
    maxUserId: "teacher_grosheva",
    displayName: "Грошева Полина Юрьевна",
    expertise: "Стартапы, фреймворки",
  },
  {
    key: "teacher_2",
    maxUserId: "teacher_krasnoslobodtseva",
    displayName: "Краснослободцева Дарья Борисовна",
    expertise: "Алгоритмы машинного обучения",
  },
  {
    key: "teacher_3",
    maxUserId: "teacher_litvinenko",
    displayName: "Литвиненко Эдуард Константинович",
    expertise: "1С",
  },
  {
    key: "teacher_4",
    maxUserId: "teacher_lukyanov",
    displayName: "Лукьянов Павел Вадимович",
    expertise: "Базы данных",
  },
  {
    key: "teacher_5",
    maxUserId: "teacher_yudin",
    displayName: "Юдин Александр Викторович",
    expertise: "Зав кафедры",
  },
  {
    key: "teacher_6",
    maxUserId: "teacher_kholmogorov",
    displayName: "Холмогоров Владислав Владиславович",
    expertise: "Математика для программирования, Биг дата",
  },
  {
    key: "teacher_7",
    maxUserId: "teacher_klesov",
    displayName: "Клёсов Дмитрий Николаевич",
    expertise: "Фреймворки",
  },
  {
    key: "teacher_8",
    maxUserId: "teacher_konyashkin",
    displayName: "Коняшкин Георгий Викторович",
    expertise: "Программирование электронных приборов и систем",
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
