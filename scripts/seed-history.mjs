import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { BULK_HISTORY } from "./seed-bulk-qa.mjs";

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
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 32,
    question: "Как создать справочник номенклатуры в 1С для лабораторной работы?",
    answer:
      "В конфигураторе добавьте справочник по методичке, укажите реквизиты и форму списка. Для отчёта приложите скрин структуры и пример заполненных элементов.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 33,
    question: "1С пишет «Недостаточно прав для выполнения операции» при проведении документа.",
    answer:
      "Проверьте роль пользователя и права на объект. В учебной базе запросите нужную роль у преподавателя или войдите под учётной записью с правами проведения.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 34,
    question: "Как выгрузить отчёт из 1С в Excel для сдачи лабораторной?",
    answer:
      "Откройте отчёт, сформируйте его с нужными параметрами и используйте стандартную выгрузку в Excel или сохранение табличного документа. В отчёт приложите файл и скрин параметров.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 35,
    question: "При обновлении конфигурации 1С пропадут пользовательские доработки?",
    answer:
      "Если доработки внесены в основную конфигурацию без снятия с поддержки, они могут быть перезаписаны. Для учебных работ лучше делать изменения в копии базы и фиксировать их в отчёте.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 36,
    question: "Тонкий клиент 1С не запускается — белый экран после входа.",
    answer:
      "Переустановите платформу той же версии, что указана в задании, очистите кэш клиента и проверьте строку подключения к серверу. На macOS иногда помогает запуск через встроенный клиент из дистрибутива лабораторной.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 37,
    question: "Как настроить печатную форму документа в 1С для отчёта?",
    answer:
      "Создайте макет в конфигураторе, привяжите его к документу и проверьте вывод на тестовых данных. В отчёте покажите макет и пример сформированной печатной формы.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 38,
    question: "Как оформить pitch deck для стартап-проекта на 5 минут?",
    answer:
      "10–12 слайдов: проблема, решение, рынок, продукт, бизнес-модель, конкуренты, команда, traction, ask. На защите уложитесь в 5 минут — остальное в backup-слайды.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 39,
    question: "Нужна ли unit-экономика в презентации стартапа на ранней стадии?",
    answer:
      "Да, хотя бы в упрощённом виде: CAC, LTV или маржа на одного клиента. Допустимы допущения, но их нужно явно обозначить и обосновать.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 40,
    question: "Можно ли сдать стартап-проект с Figma-прототипом без рабочего кода?",
    answer:
      "Да, для курсовой достаточно кликабельного прототипа основного сценария. Код нужен только если вы заявляете техническую реализацию как часть MVP.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 41,
    question: "Как описать конкурентов в стартап-анализе, если рынок переполнен?",
    answer:
      "Выделите 3–5 прямых и косвенных конкурентов, сравните по цене, аудитории и УТП. Покажите, чем ваше решение отличается, а не просто перечислите названия.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 42,
    question: "Достаточно ли landing page для демо стартап-проекта на защите?",
    answer:
      "Да, если landing показывает ценностное предложение, CTA и основной пользовательский путь. Желательно добавить короткое видео или скринкаст сценария.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 43,
    question: "Как посчитать TAM/SAM/SOM для B2B стартапа в отчёте?",
    answer:
      "TAM — весь рынок, SAM — сегмент, куда реально выходите, SOM — доля на 1–3 года. Используйте отраслевые отчёты и явно укажите источники и допущения.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 44,
    question: "Что выбрать на лабе по ML: Random Forest или SVM для классификации?",
    answer:
      "Для табличных данных с нелинейностями часто начинают с Random Forest. SVM хорош на небольших выборках после масштабирования признаков. Сравните обе модели на одной метрике.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 45,
    question: "Модель отлично работает на train, но плохо на test — переобучение?",
    answer:
      "Скорее всего да. Уменьшите сложность модели, добавьте регуляризацию, используйте cross-validation и проверьте, нет ли утечки целевой переменной в признаки.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 46,
    question: "Нужно ли масштабировать признаки перед логистической регрессией?",
    answer:
      "Да, особенно если признаки в разных шкалах. StandardScaler или MinMaxScaler улучшают сходимость и сравнимость коэффициентов.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 47,
    question: "Как интерпретировать confusion matrix в отчёте по машинному обучению?",
    answer:
      "Покажите матрицу и рассчитайте precision/recall по классам. Объясните, какие ошибки критичны для вашей задачи — ложноположительные или ложноотрицательные.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 48,
    question: "Сколько эпох ставить при обучении нейросети на маленьком датасете?",
    answer:
      "Ориентируйтесь на validation loss и early stopping. На маленькой выборке 20–50 эпох с маленьким learning rate часто достаточно, главное — не переобучиться.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 49,
    question: "Какой train/test split выбрать для проекта по машинному обучению?",
    answer:
      "Классика 80/20 или 70/30 при достаточном объёме данных. При дисбалансе классов используйте stratified split, чтобы доли классов сохранились в обеих выборках.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 50,
    question: "Можно ли использовать готовую предобученную модель в курсовом проекте по ML?",
    answer:
      "Можно как baseline или feature extractor, но в отчёте должны быть ваши эксперименты: fine-tuning, сравнение с простой моделью и обоснование выбора.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 51,
    question: "Как составить составной индекс в PostgreSQL для ускорения SELECT по двум полям?",
    answer:
      "Создайте индекс по часто используемым полям в WHERE/JOIN в том же порядке, что в запросе. Проверьте план через EXPLAIN ANALYZE до и после.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 52,
    question: "Нужна ли нормализация до 3NF, если отчёт требует много JOIN?",
    answer:
      "Для учебного проекта покажите нормализованную схему и отдельно объясните, где допустима денormalization ради производительности отчётов.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 53,
    question: "Ошибка foreign key constraint failed при INSERT — что проверить?",
    answer:
      "Убедитесь, что значение внешнего ключа существует в родительской таблице и типы совпадают. Проверьте порядок вставки: сначала родитель, потом дочерние записи.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 54,
    question: "Как написать хранимую процедуру для лабораторной по базам данных?",
    answer:
      "Опишите входные параметры, транзакцию и обработку ошибок. В отчёте приложите код процедуры, пример вызова и скрин результата.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 55,
    question: "Как сделать миграцию схемы БД без потери данных?",
    answer:
      "Добавляйте изменения поэтапно: новые столбцы nullable, перенос данных, затем ограничения. Для PostgreSQL используйте транзакцию и бэкап перед миграцией.",
  },
  {
    teacherKey: "teacher_4",
    category: "ACCESS",
    daysAgo: 56,
    question: "Не могу подключиться к учебной БД с домашнего ноутбука — timeout.",
    answer:
      "Подключитесь через VPN университета или используйте jump-host из инструкции лабораторной. Прямой доступ с внешних IP часто закрыт.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 57,
    question: "Куда подать справку об участии в олимпиаде для портфолио?",
    answer:
      "Загрузите скан в личный кабинет и приложите к форме портфолио по регламенту кафедры. Сроки публикации приказов смотрите на сайте института.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 58,
    question: "Можно ли перенести дедлайн проекта по уважительной причине?",
    answer:
      "Да, по документально подтверждённой причине через заявление научному руководителю. Решение фиксируется в ведомости группы.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 59,
    question: "Как записаться на консультацию к руководителю курсовой?",
    answer:
      "Запись через таблицу слотов группы или сообщение в чат курса. Укажите тему и что уже сделано, чтобы консультация была продуктивной.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 60,
    question: "Нужно ли согласование темы диплома до начала семестра?",
    answer:
      "Да, тема утверждается на кафедре в первые недели семестра. Без утверждённой темы зачёт за производственную практику не выставляется.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 61,
    question: "Почему в ведомости стоит «неявка», хотя я сдавал работу?",
    answer:
      "Проверьте, что работа загружена в нужную ветку репозитория до дедлайна и отмечена в таблице сдачи. Если всё верно — напишите преподавателю с ссылкой на коммит.",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 62,
    question: "Сколько попыток пересдачи доступно по дисциплине?",
    answer:
      "Обычно две пересдачи в рамках сессии по регламенту вуза. Точные правила — в рабочей программе дисциплины и приказе деканата.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 63,
    question: "Чем batch gradient descent отличается от stochastic на лабе?",
    answer:
      "Batch использует весь датасет на шаг, SGD — один или мини-бatch примеров. SGD быстрее на больших данных, но траектория более шумная.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 64,
    question: "Как выбрать число кластеров k для k-means?",
    answer:
      "Используйте метод локтя и silhouette score. Сравните несколько k и обоснуйте выбор в отчёте, а не берите k «на глаз».",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 65,
    question: "Зачем на лабе по MapReduce нужен этап shuffle?",
    answer:
      "Shuffle перераспределяет данные по ключам между узлами перед reduce. Без него агрегация по ключу на распределённом кластере невозможна.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 66,
    question: "Как обработать пропуски в CSV перед загрузкой в Spark SQL?",
    answer:
      "Замените null на медиану/моду для числовых и категориальных полей или отфильтруйте строки, если пропусков мало. Зафиксируйте стратегию в отчёте.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 67,
    question: "Что такое curse of dimensionality и как это влияет на kNN?",
    answer:
      "В высоких размерностях расстояния между точками становятся похожими, kNN теряет информативность. Помогает отбор признаков или PCA.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 68,
    question: "Нужен ли log-трансформ для признака с сильным перекосом распределения?",
    answer:
      "Да, для skewed данных log1p часто стабилизирует дисперсию и улучшает линейные модели. Проверьте эффект на validation.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 69,
    question: "HDFS выдаёт permission denied при загрузке файла для big data лабы.",
    answer:
      "Проверьте права на каталог и пользователя Hadoop. Для учебного кластера используйте домашний каталог /user/<login> из инструкции.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 70,
    question: "Градиентный спуск не сходится — learning rate слишком большой?",
    answer:
      "Часто да: loss скачет или растёт. Уменьшите learning rate в 10 раз, попробуйте adaptive optimizers и нормализацию признаков.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 71,
    question: "Docker контейнер завершается с exit code 137 — что это значит?",
    answer:
      "137 обычно OOM kill: контейнеру не хватило памяти. Увеличьте memory limit или оптимизируйте приложение, проверьте логи docker events.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 72,
    question: "Как добавить middleware для логирования запросов в Express?",
    answer:
      "Создайте функцию (req, res, next) и подключите через app.use до маршрутов. Логируйте method, path и duration в res.on('finish').",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 73,
    question: "Django ORM делает N+1 запросов — как исправить?",
    answer:
      "Используйте select_related для ForeignKey и prefetch_related для ManyToMany. Проверьте число SQL-запросов через django-debug-toolbar.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 74,
    question: "Pod в Kubernetes в статусе CrashLoopBackOff после деплоя.",
    answer:
      "Посмотрите kubectl logs и describe pod: часто неверный command, отсутствует env или приложение падает на старте. Проверьте readiness/liveness probes.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 75,
    question: "Как подключить Redis для кеширования в Spring Boot?",
    answer:
      "Добавьте spring-boot-starter-data-redis, пропишите spring.data.redis.host и используйте @Cacheable. Проверьте TTL и ключи кеша.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 76,
    question: "REST или GraphQL для API курсового проекта — что выбрать?",
    answer:
      "REST проще для CRUD и типовых отчётов. GraphQL оправдан при множестве клиентов с разными наборами полей. Для курсовой чаще достаточно REST.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 77,
    question: "TypeScript: Property does not exist on type — типичная причина?",
    answer:
      "Несовпадение типа объекта и интерфейса или optional поле без проверки. Исправьте тип, добавьте guard или optional chaining.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 78,
    question: "Как подключить датчик DHT11 к Arduino для лабораторной?",
    answer:
      "Питание 5V, data на цифровой пин с pull-up 10k, общий GND. Используйте проверенную библиотеку и задержку между опросами не менее 2 секунд.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 79,
    question: "I2C устройство не отвечает — как проверить адрес?",
    answer:
      "Запустите I2C scanner sketch, проверьте SDA/SCL, pull-up резисторы и питание. Адрес в коде должен совпадать с datasheet модуля.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 80,
    question: "Как настроить PWM для управления яркостью светодиода на STM32?",
    answer:
      "Настройте таймер в PWM mode, задайте prescaler и ARR для нужной частоты, подключите канал к пину LED. Меняйте duty cycle для яркости.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 81,
    question: "Watchdog timer постоянно перезагружает микроконтроллер.",
    answer:
      "Кормите watchdog регулярно в main loop или отдельной задаче RTOS. Увеличьте timeout на отладке и проверьте блокирующие вызовы без refresh.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 82,
    question: "FreeRTOS: задача с высоким приоритетом не даёт выполняться низкой.",
    answer:
      "Добавьте vTaskDelay или блокирующее ожидание в high-priority task, проверьте starvation. Для равномерности используйте time slicing где доступно.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 83,
    question: "На линии reset осциллограф показывает шум и ложные срабатывания.",
    answer:
      "Добавьте pull-up и RC-фильтр, укоротите провод reset, развяжите питание. Убедитесь, что reset не подтянут к floating.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 84,
    question: "Как измерить потребление тока микроконтроллера в sleep mode?",
    answer:
      "Подключите амперметр последовательно в разрыв питания или используйте shunt + осциллограф. Сравните режимы sleep и active в отчёте.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 85,
    question: "Нужен ли pull-up резистор на кнопке для GPIO входа?",
    answer:
      "Да, если не используете internal pull-up MCU. Без подтяжки вход floating и будут ложные срабатывания. Добавьте debounce в коде.",
  },
  ...BULK_HISTORY,
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

  const existingTickets = await prisma.ticket.findMany({
    where: { studentId: student.id, status: "CLOSED" },
    select: { teacherId: true, description: true },
  });

  const existingKeys = new Set(
    existingTickets.map((ticket) => `${ticket.teacherId}:${ticket.description}`),
  );

  const toCreate = [];

  for (const item of HISTORY) {
    const teacher = teacherByKey.get(item.teacherKey);

    if (!teacher) {
      console.warn("Unknown teacher:", item.teacherKey);
      continue;
    }

    const dedupeKey = `${teacher.id}:${item.question}`;

    if (existingKeys.has(dedupeKey)) {
      skipped += 1;
      continue;
    }

    existingKeys.add(dedupeKey);

    const category = item.category === "TECHNICAL" ? "OTHER" : item.category;
    const closedAt = daysAgoDate(item.daysAgo);

    toCreate.push({
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
    });
  }

  const batchSize = 50;

  for (let index = 0; index < toCreate.length; index += batchSize) {
    const batch = toCreate.slice(index, index + batchSize);
    const result = await prisma.ticket.createMany({ data: batch });
    created += result.count;
  }

  console.log(`Seed done: ${created} created, ${skipped} skipped (already exist).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
