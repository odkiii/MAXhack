import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MOCK_STUDENT = {
  maxUserId: "seed_student_demo",
  displayName: "Студент (демо)",
};

const HISTORY = [
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 2,
    question:
      "Подскажите, пожалуйста, у меня 30 мая конференция научно-техническая в нашем университете, её можно включить в форму активности?",
    answer:
      "Добрый вечер! Включить в форму можно любые достижения, у которых есть подтверждение, в том числе, если это успешный отбор на выступление на конференции.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 4,
    question:
      "Добрый день! Если я участвую в хакатоне + был волонтером, в форме указать только хакатон или в разделе «иное» и то, и другое?",
    answer: "Добрый день, каждую активность отдельно записывай в разные формы.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 6,
    question:
      "Доброе утро, подскажите, пожалуйста, как-то будет меняться расписание на 3-4 ноября в связи с праздниками?",
    answer: "Доброе утро! https://www.mirea.ru/schedule/",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 8,
    question: "Здравствуйте, а можно узнать, когда скинут расписание сессии?",
    answer:
      "Добрый день! Как и обычно, расписание сессии размещается непосредственно перед ней.",
  },
  {
    teacherKey: "teacher_4",
    category: "ACCESS",
    daysAgo: 3,
    question:
      "Нет доступа к репозиторию с лабораторными работами по базам данных, пишет 404.",
    answer:
      "Напишите GitHub username в таблицу доступов группы, предоставлю доступ в течение дня.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 5,
    question:
      "PostgreSQL на лабораторной не принимает подключение: connection refused на порту 5432.",
    answer:
      "Проверьте, что сервер запущен (pg_ctl status), хост и порт в строке подключения совпадают с заданием, и что вы в сети университета или VPN.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 11,
    question:
      "Как правильно оформить ER-диаграмму для курсовой по БД: нужны ли все атрибуты на схеме?",
    answer:
      "На ER-диаграмме достаточно сущностей, ключей и связей с кардинальностью. Полный список полей — в описании таблиц отдельно.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 4,
    question:
      "На лабе по ML accuracy 99%, но классы сильно несбалансированы — модель всё предсказывает одним классом.",
    answer:
      "Accuracy в таком случае не информативна. Смотрите F1, precision и recall по классам, попробуйте class_weight или oversampling minority.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 9,
    question:
      "Можно ли для проекта по машинному обучению использовать готовый датасет с Kaggle без доработки?",
    answer:
      "Можно как базу, но в отчёте нужны ваши эксперименты: выбор признаков, сравнение моделей и обоснование метрик.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 7,
    question:
      "1С выдаёт ошибку «Версия платформы не соответствует версии конфигурации» при открытии базы.",
    answer:
      "Обновите платформу 1С до версии, указанной в readme лабораторной, или откройте базу в режиме конфигуратора с совместимой версией.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 6,
    question:
      "Для стартап-проекта: достаточно ли описать MVP в презентации или нужен рабочий прототип?",
    answer:
      "Для защиты на курсе достаточно кликабельного прототипа или demo с основным сценарием; полный продукт не обязателен.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 3,
    question:
      "Spring Boot не подхватывает application.properties — бин DataSource не создаётся.",
    answer:
      "Файл должен лежать в src/main/resources. Проверьте spring.datasource.url и что нет опечаток в префиксе spring.datasource.",
  },
  {
    teacherKey: "teacher_7",
    category: "TECHNICAL",
    daysAgo: 10,
    question: "FastAPI возвращает 422 на POST — что обычно не так с телом запроса?",
    answer:
      "422 — ошибка валидации Pydantic: сверьте JSON с моделью (типы полей, обязательные ключи). Посмотрите detail в ответе.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 5,
    question:
      "На лабе по big data Spark падает с OutOfMemory при groupBy на большом CSV.",
    answer:
      "Уменьшите число партиций или увеличьте executor memory, проверьте что не collect() весь датасет на driver. Для агрегации используйте reduceByKey где возможно.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 12,
    question:
      "Не понимаю, зачем нормализовать признаки перед k-means — без этого же тоже считается.",
    answer:
      "k-means использует евклидовы расстояния: признак с большим масштабом доминирует. Нормализация выравнивает вклад координат.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 4,
    question:
      "STM32 не прошивается через ST-Link: target not found.",
    answer:
      "Проверьте питание платы, BOOT0, драйвер ST-Link и что выбран правильный chip в IDE. Переподключите отладчик.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 8,
    question:
      "Прерывание по таймеру срабатывает дважды — возможная причина?",
    answer:
      "Сбросьте флаг прерывания в обработчике и не включайте таймер до очистки флага. Проверьте, что handler не вызывается из main и ISR одновременно.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 9,
    question:
      "В SQL-запросе с JOIN получаются дубликаты строк. Как корректно убрать их без потери данных?",
    answer:
      "Сначала проверьте кардинальность связей и условие JOIN. DISTINCT используйте только если дубликаты логически допустимы, чаще нужно исправить ON-условие или агрегировать данные.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 13,
    question: "Какой уровень изоляции транзакций выбрать для лабораторной с параллельными обновлениями?",
    answer:
      "Для большинства задач достаточно READ COMMITTED. Если важно исключить фантомные чтения, поднимайте до REPEATABLE READ с оценкой влияния на блокировки.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 14,
    question:
      "Градиентный бустинг переобучается после 200 деревьев. Как стабилизировать качество?",
    answer:
      "Добавьте early stopping на валидации, уменьшите learning rate и max_depth, а также включите регуляризацию по min_samples_leaf.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 15,
    question: "Можно ли в отчёте по ML ограничиться одной моделью без сравнения с baseline?",
    answer:
      "Нужен baseline и сравнение минимум с одной альтернативой. Иначе нельзя обосновать, что выбранная модель действительно лучшая для задачи.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 16,
    question: "В 1С не проводится документ после добавления нового реквизита. Где искать причину?",
    answer:
      "Проверьте модуль объекта и обработчик ПередЗаписью, а также заполнение обязательных реквизитов. Часто ошибка в валидации или неверном типе значения.",
  },
  {
    teacherKey: "teacher_3",
    category: "ACCESS",
    daysAgo: 18,
    question: "Нужен доступ к учебной базе 1С для команды из трёх человек. Можно общий аккаунт?",
    answer:
      "Общий аккаунт использовать нельзя. Оформляйте отдельные доступы на каждого участника через форму кафедры.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 17,
    question: "Для стартап-анализа достаточно TAM/SAM/SOM без интервью с пользователями?",
    answer:
      "Нет, нужны и количественные оценки, и хотя бы несколько пользовательских интервью, чтобы подтвердить проблему и спрос.",
  },
  {
    teacherKey: "teacher_1",
    category: "OTHER",
    daysAgo: 19,
    question: "Можно ли изменить тему стартап-проекта после предзащиты?",
    answer:
      "Можно, но только с согласованием с научным руководителем и обновлённым планом работ на оставшийся период.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 20,
    question: "В React состояние обновляется, но компонент не перерисовывается. Почему так бывает?",
    answer:
      "Чаще всего мутируется объект состояния напрямую. Создавайте новый объект/массив через spread или иммутабельные методы.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 21,
    question: "Почему в Next.js API route возвращает 405 на POST, хотя обработчик есть?",
    answer:
      "Проверьте, что экспортирован именно метод POST и путь совпадает. В App Router обработчики должны быть в route.js с именованным export.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 22,
    question: "В Spark join работает очень медленно на таблицах разного размера. Что оптимизировать первым?",
    answer:
      "Используйте broadcast join для маленькой таблицы и проверьте партиционирование по ключу соединения. Это обычно даёт наибольший выигрыш.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 23,
    question: "При обучении линейной регрессии признаки сильно коррелируют. Это критично?",
    answer:
      "Да, мультиколлинеарность делает коэффициенты нестабильными. Примените регуляризацию (Ridge/Lasso) или отбор признаков.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 24,
    question: "ADC на микроконтроллере даёт шумные значения даже на стабильном входе.",
    answer:
      "Добавьте усреднение нескольких измерений, проверьте опорное напряжение и развязку питания. Часто помогает RC-фильтр на входе.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 25,
    question: "UART передаёт символы с ошибками при 115200 бод. Что проверить?",
    answer:
      "Сверьте частоту тактирования и делитель UART, формат кадра (8N1) и общий GND между устройствами. Несовпадение baud rate даёт битые символы.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 26,
    question: "Если лабораторная сдана после дедлайна, на сколько снижается балл по регламенту?",
    answer:
      "Обычно снижение составляет один балл за каждую неделю просрочки, но точные правила смотрите в рабочей программе дисциплины.",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 27,
    question: "Можно ли записаться на пересдачу, если не закрыт один модуль текущего семестра?",
    answer:
      "Да, запись возможна, но к дате пересдачи модуль должен быть закрыт, иначе допуск аннулируется.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 28,
    question: "Кросс-валидация даёт разброс метрик по фолдам. Это нормально?",
    answer:
      "Да, это ожидаемо. В отчёте указывайте среднее значение и стандартное отклонение, чтобы показать стабильность модели.",
  },
  {
    teacherKey: "teacher_4",
    category: "ACCESS",
    daysAgo: 29,
    question: "Забыл пароль от учебной СУБД. Можно восстановить без потери схемы?",
    answer:
      "Да, через администратора сбрасывается только пароль пользователя, структура и данные базы при этом не удаляются.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 30,
    question: "Почему fetch в браузере получает CORS error при обращении к localhost API?",
    answer:
      "Сервер должен вернуть заголовки Access-Control-Allow-Origin и при необходимости Allow-Headers/Methods. Также проверьте preflight OPTIONS.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 31,
    question: "После выхода из sleep микроконтроллер иногда зависает на инициализации периферии.",
    answer:
      "Переинициализируйте тактирование и периферию после пробуждения и проверьте последовательность снятия reset-флагов в startup-коде.",
  },
];

const TEACHERS = [
  { key: "teacher_1", maxUserId: "teacher_grosheva", displayName: "Грошева Полина Юрьевна" },
  { key: "teacher_2", maxUserId: "teacher_krasnoslobodtseva", displayName: "Краснослободцева Дарья Борисовна" },
  { key: "teacher_3", maxUserId: "teacher_litvinenko", displayName: "Литвиненко Эдуард Константинович" },
  { key: "teacher_4", maxUserId: "teacher_lukyanov", displayName: "Лукьянов Павел Вадимович" },
  { key: "teacher_5", maxUserId: "teacher_yudin", displayName: "Юдин Александр Викторович" },
  { key: "teacher_6", maxUserId: "teacher_kholmogorov", displayName: "Холмогоров Владислав Владиславович" },
  { key: "teacher_7", maxUserId: "teacher_klesov", displayName: "Клёсов Дмитрий Николаевич" },
  { key: "teacher_8", maxUserId: "teacher_konyashkin", displayName: "Коняшкин Георгий Викторович" },
];

function daysAgoDate(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

async function upsertTeacher(meta) {
  return prisma.user.upsert({
    where: { maxUserId: meta.maxUserId },
    create: {
      maxUserId: meta.maxUserId,
      displayName: meta.displayName,
      role: "TEACHER",
      teacherVerificationStatus: "APPROVED",
      teacherVerificationApprovedAt: new Date(),
    },
    update: {
      displayName: meta.displayName,
      role: "TEACHER",
      teacherVerificationStatus: "APPROVED",
    },
  });
}

async function main() {
  const student = await prisma.user.upsert({
    where: { maxUserId: MOCK_STUDENT.maxUserId },
    create: {
      maxUserId: MOCK_STUDENT.maxUserId,
      displayName: MOCK_STUDENT.displayName,
      role: "STUDENT",
    },
    update: {},
  });

  const teacherByKey = new Map();

  for (const t of TEACHERS) {
    const user = await upsertTeacher(t);
    teacherByKey.set(t.key, user);
  }

  let created = 0;
  let skipped = 0;

  for (const item of HISTORY) {
    const teacher = teacherByKey.get(item.teacherKey);

    if (!teacher) {
      console.warn("Unknown teacher:", item.teacherKey);
      continue;
    }

    const category = item.category === "TECHNICAL" ? "OTHER" : item.category;

    const existing = await prisma.ticket.findFirst({
      where: {
        studentId: student.id,
        teacherId: teacher.id,
        description: item.question,
        status: "CLOSED",
      },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    const closedAt = daysAgoDate(item.daysAgo);

    await prisma.ticket.create({
      data: {
        studentId: student.id,
        teacherId: teacher.id,
        category,
        status: "CLOSED",
        description: item.question,
        title: item.question.slice(0, 80),
        teacherResponse: item.answer,
        closeOutcome: "RESOLVED",
        closeReason: "Решено",
        createdAt: daysAgoDate(item.daysAgo + 2),
        updatedAt: closedAt,
      },
    });

    created += 1;
  }

  console.log(`Seed done: ${created} created, ${skipped} skipped (already exist).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
