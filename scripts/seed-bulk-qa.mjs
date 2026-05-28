export const BULK_HISTORY = [
  // teacher_1 — Грошева: стартапы, фреймворки (daysAgo 90–119)
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 90,
    question: "Здравствуйте! Подскажите, на защите стартап-проекта обязательно показывать живой прототип или достаточно макетов в Figma?",
    answer:
      "Для защиты достаточно кликабельного прототипа и демонстрации ключевого сценария. Живой код приветствуется, но не является обязательным критерием. Главное — показать ценность для пользователя и метрики гипотез.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 91,
    question: "Добрый день. В лабе по Spring Boot не поднимается контекст — пишет circular dependency между сервисами. Это норм для задания или я что-то напутал?",
    answer:
      "Циклическая зависимость в вашем случае — ошибка проектирования, а не учебный трюк. Вынесите общую логику в третий компонент или используйте @Lazy на одной из сторон. Пересоберите проект и приложите скрин лога в комментарий к MR.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 92,
    question: "Привет! Можно ли в pitch deck оставить 12 слайдов вместо 10, если там много про финмодель?",
    answer:
      "Лимит 10 слайдов — жёсткое требование формата питча. Финмодель сожмите до одного слайда с ключевыми допущениями, детали вынесите в appendix PDF. На защите у вас всё равно только 5 минут.",
  },
  {
    teacherKey: "teacher_1",
    category: "ACCESS",
    daysAgo: 93,
    question: "Не могу зайти в общий Figma-файл курса — пишет request access. К кому писать?",
    answer:
      "Напишите в чат курса свой корпоративный email — доступ выдаёт ассистент в течение суток. Проверьте, что вы вошли именно под учебной почтой, а не личной.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 94,
    question: "В лабораторной по React хук useEffect срабатывает дважды в dev — это баг или фича?",
    answer:
      "В React 18 Strict Mode двойной вызов в development — ожидаемое поведение для выявления побочных эффектов. В production сборке эффект выполнится один раз. Для отчёта опишите это в разделе «Наблюдения».",
  },
  {
    teacherKey: "teacher_1",
    category: "GRADING",
    daysAgo: 95,
    question: "Добрый вечер. Почему за блок «Customer discovery» стоит 6/10, если интервью было 8?",
    answer:
      "Балл снижен за отсутствие скриншотов расшифровок и слабую связь инсайтов с персонами. Дополните отчёт цитатами из интервью и обновите MR — пересмотр возможен до пятницы.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 96,
    question: "Можно ли для MVP взять no-code (Tilda + Airtable), если команда не успевает с кодом?",
    answer:
      "Да, для учебного MVP no-code допустим, если вы описали ограничения и план миграции на код. В README укажите стек и что именно автоматизировано. На защите покажите реальный пользовательский путь.",
  },
  {
    teacherKey: "teacher_1",
    category: "OTHER",
    daysAgo: 97,
    question: "Есть ли запись воркшопа про lean canvas от 12 марта? На паре пропустил начало.",
    answer:
      "Запись лежит в LMS в разделе «Материалы → Стартапы». Таймкоды к слайдам в описании видео. Если ссылка не открывается — напишите номер группы, проверим права.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 98,
    question: "Express lab: при деплое на Render падает с ECONNREFUSED к Mongo. Локально всё ок.",
    answer:
      "Проверьте переменные окружения MONGODB_URI на хостинге и whitelist IP (для Atlas — 0.0.0.0/0 на время сдачи). Убедитесь, что сервер слушает process.env.PORT. Пришлите лог build в issue репозитория.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 99,
    question: "В Business Model Canvas обязательно заполнять все 9 блоков до черновика защиты?",
    answer:
      "К среде нужны минимум 6 блоков: сегменты, ценностное предложение, каналы, отношения, потоки доходов и структура затрат. Остальные дополняете после обратной связи на консультации.",
  },
  {
    teacherKey: "teacher_1",
    category: "ACCESS",
    daysAgo: 100,
    question: "GitHub Classroom приглашение протухло — как получить новую ссылку?",
    answer:
      "Отправьте свой GitHub username преподавателю в личку бота с пометкой «группа 4». Новое приглашение придёт на почту в течение дня. Старый форк можно удалить.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 101,
    question: "Vue 3 lab — v-model на кастомном компоненте не обновляет родителя. Что проверить?",
    answer:
      "Убедитесь, что объявлены modelValue и emit update:modelValue (Vue 3). В Options API используйте prop modelValue. Пример в шпаргалке к лабе, раздел 4.",
  },
  {
    teacherKey: "teacher_1",
    category: "GRADING",
    daysAgo: 102,
    question: "Peer review: сосед поставил 3/5 без комментария. Можно оспорить?",
    answer:
      "Напишите модератору курса с номером MR и ником ревьюера — запросим пояснение. При пустом review балл пересчитаем. Самостоятельно менять оценку в системе нельзя.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 103,
    question: "Customer discovery — достаточно ли 5 интервью для B2B SaaS в учебном проекте?",
    answer:
      "Для учебного проекта минимум 5 глубинных интервью по 20+ минут. Для B2B желательно 2–3 роли: ЛПР, пользователь, закупка. Зафиксируйте Jobs и боли в таблице.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 104,
    question: "Angular lab: HttpClient возвращает 401 на защищённый endpoint хотя токен в header есть.",
    answer:
      "Проверьте формат Authorization: Bearer <token> и время жизни JWT. Interceptor должен клонировать запрос, а не мутировать оригинал. Сравните с эталонным interceptor в ветке solution.",
  },
  {
    teacherKey: "teacher_1",
    category: "RETAKE",
    daysAgo: 105,
    question: "Пропустил защиту стартапа по уважительной (больничный). Как пересдать?",
    answer:
      "Принесите скан больничного в деканат и напишите мне дату готовности. Назначим слот на ретейк-сессии в конце модуля. Презентация та же, плюс changelog по замечаниям.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 106,
    question: "Какие traction metrics реально собрать за 2 недели без бюджета на рекламу?",
    answer:
      "Используйте leading metrics: регистрации, activation rate, retention D7, NPS пилота. Даже 30 пользователей из чатов/форумов — уже данные. Главное — честно описать источник трафика.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 107,
    question: "FastAPI lab: pydantic v2 ругается на model_config. Шаблон старый?",
    answer:
      "Шаблон обновлён под Pydantic v2 — используйте model_config = ConfigDict(...). Старые class Config оставлены в migration guide в README лабы. Обновите зависимости через poetry lock.",
  },
  {
    teacherKey: "teacher_1",
    category: "OTHER",
    daysAgo: 108,
    question: "Когда офис-часы по фреймворкам в эту неделю?",
    answer:
      "Среда 14:00–15:30, ауд. 312, или Zoom по ссылке в LMS. Запись по желанию за 15 минут в таблице слотов. В пятницу дополнительного окна нет.",
  },
  {
    teacherKey: "teacher_1",
    category: "ACCESS",
    daysAgo: 109,
    question: "Slack workspace курса — invite link invalid. Помогите плз",
    answer:
      "Ссылку обновили в LMS сегодня утром. Используйте корпоративный email при регистрации. Если снова invalid — пришлите скрин, выдам персональный invite.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 110,
    question: "На питче можно говорить 6 минут если жюри задаёт вопросы?",
    answer:
      "Выступление строго 5 минут, вопросы жюри — отдельно до 3 минут. Репетируйте с таймером. Слайды с текстом > 6 слов — минус к коммуникации.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 111,
    question: "Django REST: сериализатор nested create падает с IntegrityError.",
    answer:
      "Оберните create в transaction.atomic и создавайте дочерние объекты после parent.id. Либо используйте writable nested serializer из drf-writable-nested по инструкции. Тест добавьте на happy path.",
  },
  {
    teacherKey: "teacher_1",
    category: "GRADING",
    daysAgo: 112,
    question: "Рубрика defense: пункт «Storytelling» непонятен — что именно оценивается?",
    answer:
      "Оцениваем структуру: проблема → решение → доказательства → ask. Без воды и жаргона. Пример эталона в sample deck в LMS. Пересмотрите первые 60 секунд выступления.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 113,
    question: "Competitor analysis — нужны ли финансовые отчёты публичных конкурентов?",
    answer:
      "Достаточно матрицы функций, цен, позиционирования и отзывов пользователей. Отчёты 10-K — бонус для зрелых рынков. Источники укажите ссылками.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 114,
    question: "Next.js 14 app router — где положить server action для формы лабы?",
    answer:
      "Server action объявите в том же route segment с 'use server' или в actions.ts рядом с page. Client form вызывает action через formAction. Пример в starter, ветка week-3.",
  },
  {
    teacherKey: "teacher_1",
    category: "OTHER",
    daysAgo: 115,
    question: "Можно ли подать проект в университетский акселератор параллельно с курсом?",
    answer:
      "Да, это приветствуется — укажите статус в README. Соблюдайте NDA команды и не публикуйте закрытые метрики. Дедлайн акселератора см. на сайте ЦПС.",
  },
  {
    teacherKey: "teacher_1",
    category: "ACCESS",
    daysAgo: 116,
    question: "Notion template lean canvas — view only, не копируется на workspace.",
    answer:
      "Вверху страницы кнопка Duplicate — нужен Notion account. Если нет — экспортируйте PDF и заполните локально. Шаблон Google Sheets — альтернатива в LMS.",
  },
  {
    teacherKey: "teacher_1",
    category: "PROJECT",
    daysAgo: 117,
    question: "Unit economics: LTV/CAC > 3 обязателен для учебного проекта?",
    answer:
      "Для учебного проекта достаточно осмысленных допущений и sensitivity analysis. Покажите формулу и что изменится при ×2 CAC. Реальные платежи не требуются.",
  },
  {
    teacherKey: "teacher_1",
    category: "LAB",
    daysAgo: 118,
    question: "Flutter lab — hot reload не подхватывает изменения в provider.",
    answer:
      "После смены типа provider нужен hot restart (Shift+R). Проверьте, что Consumer на правильном уровне дерева. StateNotifier тесты — в пакете flutter_test.",
  },
  {
    teacherKey: "teacher_1",
    category: "RETAKE",
    daysAgo: 119,
    question: "Пересдача pitch: можно ли сменить идею стартапа или только доработать?",
    answer:
      "На пересдаче дорабатывается та же гипотеза — смена идеи только с согласования. Нужен changelog: что изменилось после первой защиты. Новый deck загрузите за 2 дня.",
  },
  // teacher_2 — Краснослободцева: ML (daysAgo 120–149)
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 120,
    question: "Добрый день! В лабе по sklearn pipeline fit падает на NaN в StandardScaler — откуда их вытащить быстрее?",
    answer:
      "Проверьте describe() и heatmap пропусков. Для числовых — median imputer в Pipeline до scaler. Для категориальных — отдельная ветка ColumnTransformer. Не удаляйте строки вслепую — отчитайтесь о доле потерь.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 121,
    question: "Для курсового по классификации можно взять датасет с Kaggle без публикации решения?",
    answer:
      "Да, при соблюдении лицензии датасета и запрете на выкладку ноутбука в открытый доступ. В отчёте укажите ссылку и версию данных. Собственный split зафиксируйте seed.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 122,
    question: "gradient boosting lab: catboost overfitting на train 0.99, test 0.71 — что крутить первым?",
    answer:
      "Уменьшите depth и learning_rate, увеличьте l2_leaf_reg и раннюю остановку. Проверьте утечку целевой в фичах. Кривые learning в eval_set приложите к отчёту.",
  },
  {
    teacherKey: "teacher_2",
    category: "GRADING",
    daysAgo: 123,
    question: "Почему сняли баллы за «интерпретируемость», если есть feature importance?",
    answer:
      "Importance без проверки стабильности и без SHAP на нескольких объектах — недостаточно. Добавьте partial dependence или SHAP summary и краткий вывод для бизнеса.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 124,
    question: "PyTorch lab: CUDA out of memory при batch 32 на 6GB — норм?",
    answer:
      "Уменьшите batch, включите gradient accumulation или mixed precision. Проверьте, что тензоры на gpu без лишних копий в цикле. Для отчёта укажите финальный batch и VRAM.",
  },
  {
    teacherKey: "teacher_2",
    category: "OTHER",
    daysAgo: 125,
    question: "Есть ли список рекомендованной литературы по метрикам для несбалансированных классов?",
    answer:
      "В LMS раздел «ML → Metrics»: статьи про PR-AUC, MCC, cost-sensitive learning. На консультации разберём вашу матрицу ошибок. Книга Hand — глава 7 в библиотеке.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 126,
    question: "Можно ли в проекте использовать предобученный BERT без файнтюна?",
    answer:
      "Для базового зачёта — embeddings + классический классификатор. Файнтюн — плюс к оценке, но не обязателен. Укажите модель, версию и ограничения по GPU.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 127,
    question: "k-means lab: silhouette низкий — значит k выбран неверно?",
    answer:
      "Низкий silhouette намекает на слабую кластерную структуру или нужду в другой метрике. Попробуйте elbow, DBSCAN, нормализацию. Опишите, почему выбрали финальное k.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 128,
    question: "В cross-validation обязательно StratifiedKFold для multiclass?",
    answer:
      "Да, при дисбалансе классов используйте StratifiedKFold. Для временных рядов — TimeSeriesSplit, не shuffle. В отчёте укажите число фолдов и метрику агрегации.",
  },
  {
    teacherKey: "teacher_2",
    category: "GRADING",
    daysAgo: 129,
    question: "За лабу 4 стоит «неполный отчёт» — что дописать?",
    answer:
      "Не хватает сравнения минимум трёх моделей на одном split и таблицы метрик с доверительным интервалом. Добавьте выводы на русском, не копируйте stdout.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 130,
    question: "Time series forecast — Prophet или ARIMA для учебного отчёта?",
    answer:
      "Оба допустимы: ARIMA — если ряд стационарен и короткий; Prophet — при сезонности и пропусках. Сравните MAPE на holdout. Обоснуйте выбор в тексте.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 131,
    question: "PCA lab: первые 2 компоненты объясняют 40% — можно ли так визуализировать?",
    answer:
      "Можно, но укажите долю дисперсии и предупредите о потере информации. Для отчёта добавьте scree plot и число компонент для 90% дисперсии.",
  },
  {
    teacherKey: "teacher_2",
    category: "OTHER",
    daysAgo: 132,
    question: "Когда дедлайн сдачи ноутбука по регрессии в Colab?",
    answer:
      "Жёсткий дедлайн — воскресенье 23:59 МСК, неделя 7. Поздняя сдача −10% за каждые сутки до 3 дней. Ссылку на Colab пришлите через форму LMS.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 133,
    question: "SVM с RBF долго учится на 50k строк — можно subsample?",
    answer:
      "Для лабы допустим stratified subsample до 10k с фиксированным seed. В отчёте укажите размер и сравните с линейной моделью на полном наборе по val.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 134,
    question: "Нужен ли ethical review если датасет — медицинские снимки открытые?",
    answer:
      "Да, краткий раздел: источник, деидентификация, риски ошибки модели. Без рекомендаций «диагноза» пользователю. Шаблон ethics checklist в LMS.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 135,
    question: "GridSearchCV завис на 2 часа — как уменьшить сетку без штрафа?",
    answer:
      "Используйте RandomizedSearchCV или HalvingGridSearch. Сузьте параметры по логам pilot run. В отчёте опишите budget и лучшие params — это плюс.",
  },
  {
    teacherKey: "teacher_2",
    category: "GRADING",
    daysAgo: 136,
    question: "F1 в таблице 0.82, а в LMS автопроверка 0.79 — расхождение из-за чего?",
    answer:
      "Автопроверка считает macro-F1 на скрытом test, вы — возможно weighted на своём split. Пересчитайте macro на том же split, что в задании. Пришлите confusion matrix.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 137,
    question: "NLTK lab: токенизация русского текста — какой пакет советуете?",
    answer:
      "Для русского — razdel или natasha для токенов, pymorphy2 для лемм. NLTK punkt на русском слаб. Пример препроцессинга в ноутбуке week-5.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 138,
    question: "Ensemble stacking — обязателен для «отлично» в проекте?",
    answer:
      "Не обязателен, но один осмысленный ensemble с валидацией meta-learner повышает оценку. Не усложняйте без gain на holdout. Baseline logistic должен быть.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 139,
    question: "Imbalanced lab: SMOTE на всём train — это leakage?",
    answer:
      "SMOTE только внутри каждого fold train, не на val/test. Pipeline: imputer → SMOTE → classifier внутри CV. Иначе завышенные метрики.",
  },
  {
    teacherKey: "teacher_2",
    category: "OTHER",
    daysAgo: 140,
    question: "Можно ли ставить эксперименты на личный Google Colab Pro?",
    answer:
      "Да, если воспроизводимость: requirements.txt, seed, версии. Университетный кластер — альтернатива для больших моделей. Укажите среду в README.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 141,
    question: "XGBoost: early_stopping_rounds не срабатывает в sklearn API wrapper.",
    answer:
      "Передайте eval_set и callbacks в fit XGBClassifier 2.x. В sklearn wrapper параметр early_stopping_rounds в конструкторе. См. changelog лабы 6.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 142,
    question: "Деплой модели в проекте — нужен ли Docker или достаточно pickle + FastAPI?",
    answer:
      "Минимум — FastAPI endpoint и requirements. Docker — рекомендуется для воспроизводимости. Healthcheck и версия модели в /metadata обязательны по чеклисту.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 143,
    question: "Логистическая регрессия: convergence warning — что делать?",
    answer:
      "Увеличьте max_iter, масштабируйте фичи StandardScaler, проверьте мультиколлинеарность VIF. При separable data попробуйте C меньше или регуляризацию L2.",
  },
  {
    teacherKey: "teacher_2",
    category: "GRADING",
    daysAgo: 144,
    question: "Комментарий «data leakage» в проекте — где именно искать?",
    answer:
      "Частая ошибка — target encoding на всём датасете до split или агрегаты из test в train. Пересоберите Pipeline только на train fold. Пришлите diff — укажу строку.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 145,
    question: "Random forest lab: oob_score=True но oob nan — почему?",
    answer:
      "oob работает при bootstrap=True и достаточном n_samples. Проверьте max_samples и class_weight. Для маленькой выборки используйте CV вместо oob.",
  },
  {
    teacherKey: "teacher_2",
    category: "PROJECT",
    daysAgo: 146,
    question: "Можно ли заменить CSV на Parquet в финальном репозитории?",
    answer:
      "Да, Parquet предпочтительнее для больших данных. Добавьте скрипт загрузки в README. Git LFS если файлы > 50MB. Исходный CSV можно не коммитить.",
  },
  {
    teacherKey: "teacher_2",
    category: "LAB",
    daysAgo: 147,
    question: "Neural net lab: accuracy 55% на MNIST — явно что-то не так?",
    answer:
      "Проверьте нормализацию пикселей 0-1, one-hot labels, learning rate. Выведите несколько предсказаний визуально. Baseline должен быть > 95% на MNIST.",
  },
  {
    teacherKey: "teacher_2",
    category: "OTHER",
    daysAgo: 148,
    question: "Будет ли гостевая лекция про MLOps в этом семестре?",
    answer:
      "Да, 14 ноября, спикер из индустрии — CI для моделей и мониторинг drift. Посещение учитывается как бонусный опрос. Ссылка появится за неделю.",
  },
  {
    teacherKey: "teacher_2",
    category: "RETAKE",
    daysAgo: 149,
    question: "Не сдал зачёт по ML тесту на 42 балла. Какая минимальная планка пересдачи?",
    answer:
      "На пересдаче нужно ≥ 60 баллов, другой вариант билета. Запись через деканат + слот в LMS. Повторное использование шпаргалок — дисквалификация.",
  },
  // teacher_3 — Литвиненко: 1С (daysAgo 150–179)
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 150,
    question: "Здравствуйте. В 1С лабе не открывается конфигурация учебная — пишет несовместимая версия платформы.",
    answer:
      "Нужна платформа 8.3.24.x, как в инструкции. Обновите или поставьте учебную сборку с портала курса. Файл базы скачайте заново — не открывайте в более новой версии с сохранением.",
  },
  {
    teacherKey: "teacher_3",
    category: "ACCESS",
    daysAgo: 151,
    question: "RDP на сервер 1С для лаб — логин не принимается после смены пароля в AD.",
    answer:
      "Подождите 15 минут синхронизации AD или сбросьте пароль через helpdesk. Используйте домен\\логин. Если не помогло — напишите IP клиента для разблокировки.",
  },
  {
    teacherKey: "teacher_3",
    category: "PROJECT",
    daysAgo: 152,
    question: "Внешний отчёт СКД — можно ли сдавать без подсистемы печати?",
    answer:
      "Минимум — отчёт СКД и команда печати из формы документа. Подсистема печати — плюс. Макет выгрузите в XML и приложите к git.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 153,
    question: "Запрос в 1С lab возвращает дубли — LEFT JOIN лишний?",
    answer:
      "Проверьте связи регистров и условие по периоду. Часто дубли из виртуальной таблицы без среза. Используйте ЕСТЬNULL и группировку. Эталон — запрос 3.2 в методичке.",
  },
  {
    teacherKey: "teacher_3",
    category: "OTHER",
    daysAgo: 154,
    question: "Где взять лицензию 1С:Предприятие на время сессии дома?",
    answer:
      "Учебная лицензия на 90 дней — форма на сайте кафедры. Пока ждёте — пользуйтесь сервером RDP. Не используйте пиратские сборки — не примем отчёт.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 155,
    question: "Обработка заполнения табличной части — цикл vs запрос, что быстрее для 10k строк?",
    answer:
      "Для 10k — пакетный запрос или загрузка через ЗагрузитьКолонку. Цикл в коде — только для демонстрации в учебной, с комментарием о производительности.",
  },
  {
    teacherKey: "teacher_3",
    category: "PROJECT",
    daysAgo: 156,
    question: "Расширение конфигурации — можно ли сдавать проект только на расширении без изменения основной?",
    answer:
      "Да, это предпочтительный способ. Расширение должно быть подписано, с документацией API. Основную конфигурацию не меняйте. Чеклист в LMS.",
  },
  {
    teacherKey: "teacher_3",
    category: "ACCESS",
    daysAgo: 157,
    question: "Git для 1С — storage не клонируется, ошибка authentication failed.",
    answer:
      "Используйте SSH ключ из инструкции Git1C. HTTPS токен обновляется раз в семестр. Проверьте vpn кафедры. Лог clone с -v пришлите ассистенту.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 158,
    question: "Проведение документа «Приход» не формирует движения по регистру накопления.",
    answer:
      "Проверьте модуль объекта: ОбработкаПроведения, движения в процедуре. Регистр должен быть в движениях документа. Отладчик на точке перед записью движений.",
  },
  {
    teacherKey: "teacher_3",
    category: "GRADING",
    daysAgo: 159,
    question: "За отчёт сняли 5 баллов за «стандарты кода» — что не так с именами?",
    answer:
      "Используйте русские синонимы для пользователя и английские имена метаданных по стандарту 1С. Избегайте Тест1, Новый1. Приложите выгрузку EDT с исправлениями.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 160,
    question: "Форма списка справочника — как скрыть помеченные на удаление по умолчанию?",
    answer:
      "В настройке динамического списка добавьте отбор ПометкаУдаления = Ложь. Для пользователя — галочка «Показывать удалённые» в форме. Пример в demo cfg.",
  },
  {
    teacherKey: "teacher_3",
    category: "PROJECT",
    daysAgo: 161,
    question: "HTTP-сервис 1С — обязателен JWT или Basic достаточно для учебного?",
    answer:
      "Для учебного — Basic over HTTPS на тестовом стенде допустим. JWT — если делаете мобильный клиент. Опишите угрозы в README. Секреты не в git.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 162,
    question: "БСП подключили — ругается на отсутствие общего модуля ДлительныеОперации.",
    answer:
      "Подключите подсистему БСП полным комплектом из совместимой версии. Сверьте версию БСП с платформой. Инструкция merge в ветке bsp-update.",
  },
  {
    teacherKey: "teacher_3",
    category: "OTHER",
    daysAgo: 163,
    question: "Перенос занятия по 1С на следующую неделю — подтвердите пожалуйста время.",
    answer:
      "Пара перенесена на четверг 10:40, ауд. 208. Практика та же — отчёт по запросам. Дистанционно подключаться не нужно, только лабы на RDP.",
  },
  {
    teacherKey: "teacher_3",
    category: "ACCESS",
    daysAgo: 164,
    question: "Не вижу базу «Учебная2024» в списке на терминальном сервере.",
    answer:
      "База в папке \\\\srv-1c\\edu\\group3 — добавьте вручную через «Добавить». Нужна группа 3 в AD. Если папки нет — напишите номер зачётки.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 165,
    question: "Регистр сведений периодический — как получить срез последних на дату документа?",
    answer:
      "Виртуальная таблица СрезПоследних с параметром &ДатаДок. В запросе связывайте по измерениям. Не путайте с СрезПервых. Пример в лабе 8.",
  },
  {
    teacherKey: "teacher_3",
    category: "PROJECT",
    daysAgo: 166,
    question: "Обмен XML с внешней системой — валидация схемы обязательна?",
    answer:
      "Да, загрузите XSD и проверяйте перед записью. Ошибки в протокол. Для учебного достаточно одного документа и логирования отказов.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 167,
    question: "Консоль запросов: параметр типа Дата не подставляется в ВЫБРАТЬ.",
    answer:
      "Используйте &Дата с установкой параметра в консоли. Формат ДАТАВРЕМЯ(2024, 1, 15). В коде — Запрос.УстановитьПараметр.",
  },
  {
    teacherKey: "teacher_3",
    category: "GRADING",
    daysAgo: 168,
    question: "Автотест лабы 5: «не найден общий модуль» — я же его создал.",
    answer:
      "Модуль должен быть серверным, глобальным и в составе конфигурации поставки. Проверьте имя без опечаток и обновите cf в репозитории. CI смотрит main.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 169,
    question: "Печатная форма через табличный документ — как сохранить в PDF из кода?",
    answer:
      "ТабДок.Записать(Путь, ТипФайлаТабличногоДокумента.PDF). Путь во временный каталог. Права на каталог проверьте на сервере. Пример в модуле Печать.",
  },
  {
    teacherKey: "teacher_3",
    category: "PROJECT",
    daysAgo: 170,
    question: "Роли в проекте — достаточно ли одной роли «Менеджер»?",
    answer:
      "Нужно разделение: чтение, запись, администрирование по стандарту. Минимум две роли с RLS по организации. Матрица прав в приложении к отчёту.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 171,
    question: "Ошибка «конфликт блокировок» при тестировании проведения в отладчике.",
    answer:
      "Закройте другие сеансы с этим документом. На учебной базе перезапустите сеанс. В коде не держите транзакцию открытой при ожидании UI.",
  },
  {
    teacherKey: "teacher_3",
    category: "OTHER",
    daysAgo: 172,
    question: "Можно ли сдавать лабы с Mac через Parallels?",
    answer:
      "Да, Windows в Parallels с выделенными 8GB RAM. RDP клиент — Microsoft Remote Desktop. Производительность ниже — не ждите быстрой отладки.",
  },
  {
    teacherKey: "teacher_3",
    category: "ACCESS",
    daysAgo: 173,
    question: "EDT не видит платформу 1С после установки на Linux.",
    answer:
      "Пропишите путь в ini EDT и установите win-модули по гайду Linux. Рекомендуем Windows для сдачи. На сервере RDP всё настроено.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 174,
    question: "Справочник иерархический — элемент не выбирается в поле ввода на форме.",
    answer:
      "Включите выбор групп и элементов в свойствах поля. Проверьте отбор неисключённых. Для выбора только листьев — обработка Выбор в форме.",
  },
  {
    teacherKey: "teacher_3",
    category: "PROJECT",
    daysAgo: 175,
    question: "Нужен ли журнал регистрации изменений для учебного проекта?",
    answer:
      "Достаточно подписки на событие записи с записью в регистр сведений «История». Полный аудит БСП — опционально. Опишите, что логируете.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 176,
    question: "В managed form не работает команда с клиентом без контекста сервера.",
    answer:
      "Разделите клиент-сервер: &НаКлиенте вызывает серверную процедуру с &НаСервереБезКонтекста при необходимости. Не обращайтесь к БД с клиента.",
  },
  {
    teacherKey: "teacher_3",
    category: "RETAKE",
    daysAgo: 177,
    question: "Не сдал зачёт по 1С — когда пересдача практики?",
    answer:
      "Пересдача в зачётную неделю, среда 9:00, ауд. 208. Принесите исправленную cf и ответы на билет. Запись в деканате обязательна.",
  },
  {
    teacherKey: "teacher_3",
    category: "LAB",
    daysAgo: 178,
    question: "Выгрузка в Excel через COM на сервере Linux падает.",
    answer:
      "COM Excel только на Windows сервере. На Linux используйте табличный документ в MXL/XLSX или внешнюю компоненту. На RDP Windows — COM доступен.",
  },
  {
    teacherKey: "teacher_3",
    category: "OTHER",
    daysAgo: 179,
    question: "Есть ли шаблон технического задания для курсового на 1С?",
    answer:
      "Шаблон ТЗ в LMS, раздел 1С → Проект. Заполните разделы 1-5 минимум. Согласуйте тему со мной в чате до 1 ноября.",
  },
  // teacher_4 — Лукьянов: БД (daysAgo 180–209)
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 180,
    question: "Добрый день! В лабе PostgreSQL EXPLAIN показывает Seq Scan на большой таблице — индекс не подхватился?",
    answer:
      "Проверьте статистику ANALYZE и условие WHERE без функции на колонке. Индекс должен покрывать предикат. При низкой селективности planner может выбрать seq scan — это нормально, объясните в отчёте.",
  },
  {
    teacherKey: "teacher_4",
    category: "ACCESS",
    daysAgo: 181,
    question: "Не подключаюсь к учебному PostgreSQL с ноута — timeout.",
    answer:
      "Нужен VPN кафедры и pg_hba для вашего IP. Порт 5432, ssl prefer. Логин student_XX из письма. Без VPN только с терминалки в аудитории.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 182,
    question: "Нормализация до 3НФ — спорный момент с денормализацией справочника в лабе 3.",
    answer:
      "В учебной схеме оставьте 3НФ, денормализацию обоснуйте отдельным разделом «Оптимизация чтения». Для сдачи лабы — строго 3НФ без избыточных FD.",
  },
  {
    teacherKey: "teacher_4",
    category: "PROJECT",
    daysAgo: 183,
    question: "В проекте ER-диаграмма в dbdiagram.io — принимается или только draw.io?",
    answer:
      "Любой инструмент с экспортом PNG/PDF и легендой связей. Главное — корректные кардинальности и ключи. Исходник файла приложите в repo/docs.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 184,
    question: "Транзакция lab: deadlock при UPDATE двух таблиц в разном порядке.",
    answer:
      "Упорядочивайте блокировки: всегда сначала parent, потом child. Используйте один уровень изоляции READ COMMITTED. Retry при deadlock — опционально с лимитом.",
  },
  {
    teacherKey: "teacher_4",
    category: "GRADING",
    daysAgo: 185,
    question: "Сняли баллы за отсутствие ограничений CHECK — их же не было в ТЗ?",
    answer:
      "В рубрике лабы 4 явно указаны CHECK для возраста и суммы. Добавьте ALTER TABLE и миграцию. Пересдача фрагмента до воскресенья.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 186,
    question: "MongoDB lab: aggregation $lookup пустой массив — id разных типов ObjectId vs string.",
    answer:
      "Приведите типы: $toObjectId или храните единый тип. Сравните sample документов в Compass. В отчёте приложите pipeline и один результат.",
  },
  {
    teacherKey: "teacher_4",
    category: "PROJECT",
    daysAgo: 187,
    question: "Репликация PostgreSQL в проекте обязательна или read replica достаточно?",
    answer:
      "Для учебного — настройка streaming replication на двух VM в docker-compose достаточно. Failover описать теоретически. Секреты в .env.example.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 188,
    question: "SQL window functions: ROW_NUMBER vs RANK для топ-3 по отделу?",
    answer:
      "Для строгого топ-3 без ничьих — ROW_NUMBER с PARTITION BY dept ORDER BY salary DESC. RANK оставит дыры при equal. Пример в слайдах недели 9.",
  },
  {
    teacherKey: "teacher_4",
    category: "ACCESS",
    daysAgo: 189,
    question: "DBeaver просит master password каждый раз — как отключить на учебном ПК?",
    answer:
      "Settings → Security → снимите «Use master password» на локальной машине. На общих ПК не храните пароли БД. Используйте .pgpass с правами 600.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 190,
    question: "Redis lab: TTL ключей сбрасывается после перезапуска без AOF?",
    answer:
      "Без persistence TTL теряются при рестарте — ожидаемо. Включите AOF для лабы 7. Опишите политику eviction и maxmemory в конфиге.",
  },
  {
    teacherKey: "teacher_4",
    category: "OTHER",
    daysAgo: 191,
    question: "Консультация по курсовой БД — можно ли в пятницу после 17:00?",
    answer:
      "Пятница 17:30–18:30 по предзаписи в таблице. Пришлите ER-draft заранее. Вопросы по индексам разбираем на примерах ваших запросов.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 192,
    question: "CTE рекурсивный для дерева категорий — max recursion exceeded.",
    answer:
      "Проверьте условие выхода рекурсии и отсутствие циклов в данных. Ограничьте depth в учебной или добавьте cycle detection. Тест на ацикличном графе.",
  },
  {
    teacherKey: "teacher_4",
    category: "PROJECT",
    daysAgo: 193,
    question: "Flyway миграции — можно ли менять уже применённый V2?",
    answer:
      "Нельзя менять применённые — только новая V3 repair. В учебном репо допустим flyway clean на dev. На «проде» курса — только forward.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 194,
    question: "MySQL lab: InnoDB fulltext не ищет по русской морфологии.",
    answer:
      "Встроенный FULLTEXT слаб для RU — используйте ngram parser или внешний Elasticsearch в бонусной части. Для лабы достаточно LIKE с индексом на prefix.",
  },
  {
    teacherKey: "teacher_4",
    category: "GRADING",
    daysAgo: 195,
    question: "Лаба 6: комментарий «нет изоляции фантомов» — мы же на READ COMMITTED?",
    answer:
      "Задание требовало демонстрацию аномалии и перевод в REPEATABLE READ для сценария. Добавьте два параллельных сеанса и скриншоты. Иначе −15%.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 196,
    question: "Partitioning по дате — как проверить partition pruning?",
    answer:
      "EXPLAIN должен показывать Append только нужных партиций. Условие на partition key без cast. Вставьте данные в две партиции и сравните планы.",
  },
  {
    teacherKey: "teacher_4",
    category: "PROJECT",
    daysAgo: 197,
    question: "Шардирование в курсовой — не overkill для 100k записей?",
    answer:
      "Для 100k шардирование не требуется — достаточно индексов и реплики. Шарды опишите как future work. Оценка не снизится за отказ от шардов.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 198,
    question: "Neo4j lab: Cypher MATCH слишком медленный на 100k узлов.",
    answer:
      "Создайте индекс на свойство поиска, используйте PROFILE и ограничьте глубину пути. START WITH label + index hint в отчёте. Данные — subset для сдачи.",
  },
  {
    teacherKey: "teacher_4",
    category: "ACCESS",
    daysAgo: 199,
    question: "Учётная запись MySQL сброшена — нет прав на CREATE DATABASE.",
    answer:
      "Права выдаются по группам раз в сутки. Напишите group_id в тикет. Временно работайте в schema student_xx внутри общей базы.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 200,
    question: "Trigger BEFORE INSERT — бесконечная рекурсия при обновлении той же таблицы.",
    answer:
      "Не обновляйте ту же таблицу в BEFORE без условия по флагу session variable. Либо перенесите логику в AFTER или application layer. Пример fix в FAQ.",
  },
  {
    teacherKey: "teacher_4",
    category: "OTHER",
    daysAgo: 201,
    question: "Рекомендуете ли книгу Date «SQL и реляционная теория» для экзамена?",
    answer:
      "Главы 1-4 достаточно для теоретического зачёта. Практика — по нашим лабам. На экзамене задачи ближе к нормализации и алгебре, не к синтаксису ORACLE.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 202,
    question: "ClickHouse lab: MergeTree не сортирует при SELECT без ORDER BY.",
    answer:
      "MergeTree не гарантирует порядок без ORDER BY. Используйте ORDER BY ключ сортировки в запросе. Для отчёта объясните физическую сортировку parts.",
  },
  {
    teacherKey: "teacher_4",
    category: "PROJECT",
    daysAgo: 203,
    question: "Бэкап стратегия 3-2-1 для учебного проекта — упрощённый вариант?",
    answer:
      "Достаточно daily pg_dump на второй том + checksum. Один «offsite» — копия в object storage курса. План восстановления — один абзац с RTO/RPO.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 204,
    question: "Ошибка foreign key при INSERT — родитель есть, но не видит.",
    answer:
      "Проверьте типы PK/FK, схему search_path и транзакцию — родитель должен быть закоммичен. В multi-schema укажите schema.table явно.",
  },
  {
    teacherKey: "teacher_4",
    category: "GRADING",
    daysAgo: 205,
    question: "Проект: «слабая индексация» — какие индексы добавить в первую очередь?",
    answer:
      "Начните с FK колонок и полей в WHERE/JOIN отчёта. Один составной (dept_id, created_at). Избегайте дублирующих индексов. Пришлите EXPLAIN до/после.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 206,
    question: "SQLite lab: WAL mode — journal остаётся huge.",
    answer:
      "Выполните PRAGMA wal_checkpoint(TRUNCATE) после bulk load. Закройте read connections. Для сдачи приложите размер файла до/после.",
  },
  {
    teacherKey: "teacher_4",
    category: "RETAKE",
    daysAgo: 207,
    question: "Пересдача экзамена по БД — oral или письменный?",
    answer:
      "Письменный, 45 минут, 4 задачи: нормализация, SQL, транзакции, план. Запись через деканат. Список тем — в LMS, раздел Retake.",
  },
  {
    teacherKey: "teacher_4",
    category: "LAB",
    daysAgo: 208,
    question: "Materialized view не обновляется автоматически в PostgreSQL.",
    answer:
      "REFRESH MATERIALIZED MATERIALIZED VIEW вручную или CONCURRENTLY с unique index. Для real-time — обычное view или trigger. В лабе 10 — по расписанию cron.",
  },
  {
    teacherKey: "teacher_4",
    category: "OTHER",
    daysAgo: 209,
    question: "Можно ли использовать Supabase вместо локального Postgres в проекте?",
    answer:
      "Да, если воспроизводим schema в миграциях и нет vendor-only фич без fallback. Укажите connection string в .env.example без секретов.",
  },
  // teacher_5 — Юдин: завкафедры (daysAgo 210–239)
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 210,
    question: "Добрый день, Александр Викторович! Не могу попасть в личный кабинет портфолио на сайте кафедры.",
    answer:
      "Проверьте вход через корпоративный SSO. Если ошибка 403 — напишите номер группы и ФИО, разблокируем роль студента. Обновление прав — до 24 часов.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 211,
    question: "В ведомости стоит «незачёт», хотя все работы сданы — кому писать?",
    answer:
      "Пришлите скрин LMS и номер зачётки — сверим с преподавателями дисциплин. Часто не закрыт один модуль. Исправление ведомости через деканат после нашего подтверждения.",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 212,
    question: "Когда комиссия по пересдаче дисциплины «Архитектура ПО» в этом семестре?",
    answer:
      "Комиссия 22 декабря, заявки до 15 декабря в деканате. Нужна справка об оплате и согласование темы. Список слотов вышлем после сбора заявок.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 213,
    question: "Можно ли перевестись на заочку с очного по семейным обстоятельствам?",
    answer:
      "Вопрос решается через деканат и учёный совет. Подготовьте заявление и подтверждающие документы. Я дам рекомендацию после разговора на приёме по четвергам.",
  },
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 214,
    question: "Не работает пропуск в корпус B после перевыпуска карты.",
    answer:
      "Обратитесь в охрану с временной справкой из деканата. Параллельно напишите в АХЧ — синхронизация СКУД до 3 рабочих дней. На занятия пустят по списку.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 215,
    question: "Стипендия академическая — какие критерии по среднему баллу в этом году?",
    answer:
      "Средний ≥ 4.5 без троек, посещаемость, публикации/проекты — бонусы. Решение комиссии кафедры в октябре. Критерии на сайте в разделе «Стипендии».",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 216,
    question: "Пропустил пересдачу по уважительной — перенос возможен?",
    answer:
      "При наличии документа от деканата назначим следующий свободный слот в зачётную неделю. Без документа — только следующий семестр. Напишите дату готовности.",
  },
  {
    teacherKey: "teacher_5",
    category: "PROJECT",
    daysAgo: 217,
    question: "Дипломный проект — нужно ли согласование темы с вами лично?",
    answer:
      "Темы согласуются через форму на сайте, я утверждаю список раз в две недели. До 1 октября подайте черновик. Назначим научрука из кафедры.",
  },
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 218,
    question: "Электронная зачётка не отображает дисциплину текущего семестра.",
    answer:
      "Это задержка синхронизации с 1С деканата. Обычно 2-3 дня после приказа. Если дольше — напишите номер приказа о зачислении на курс.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 219,
    question: "Оспаривание оценки на экзамене — процедура?",
    answer:
      "В течение 3 дней заявление в деканат + апелляция комиссии. Я назначу второго проверяющего. Пересмотр только при процедурных нарушениях или арифметической ошибке.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 220,
    question: "График приёма студентов по организационным вопросам на неделе?",
    answer:
      "Вторник 12:00–13:30, каб. 401, предварительная запись в таблице. Срочные вопросы — через бота с тегом «организация».",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 221,
    question: "Сколько попыток пересдачи одной дисциплины допускается?",
    answer:
      "Две пересдачи по регламенту вуза, третья — через ГЭК. Исключения только по решению учсовета. Фиксируйте даты в зачётке.",
  },
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 222,
    question: "Не добавили в чат курса в MAX после перевода из другой группы.",
    answer:
      "Отправьте новый номер группы куратору. Обновление списков MAX — по понедельникам. Временно смотрите объявления в LMS.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 223,
    question: "Портфолио: работа на проверке 2 недели — ускорить можно?",
    answer:
      "Напомню модератору курса. Стандартный SLA — 10 рабочих дней. Если дедлайн стипендии — укажите дату в комментарии к работе.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 224,
    question: "Практика в компании не из списка кафедры — засчитают?",
    answer:
      "Нужно согласование до начала практики: договор, программа, руководитель с высшим образованием. Подайте пакет за месяц. Иначе только внутренние базы.",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 225,
    question: "Академический отпуск — сохраняется ли место в проектной группе?",
    answer:
      "Место в группе не резервируется — после выхода распределим заново. Договорённости с командой зафиксируйте письмом научруку. Сроки вернитесь в деканат.",
  },
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 226,
    question: "VPN университета для доступа к внутренним ресурсам — заявка куда?",
    answer:
      "Форма на portal.university.ru, категория VPN student. Одобрение 1-2 дня. Для кафедральных серверов дополнительно список IP в тикете.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 227,
    question: "Разница между оценкой «хорошо» в LMS и в зачётке — что верно?",
    answer:
      "Официальна бумажная/электронная зачётка после приказа. LMS — рабочая. При расхождении пишите в деканат с номером ведомости. Мы инициируем сверку.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 228,
    question: "Справка об обучении для военкомата — электронная подойдёт?",
    answer:
      "Да, QR-справка из личного кабинета студента. Печатная — в деканате 1 этаж. Срок изготовления 1 рабочий день.",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 229,
    question: "Неявка на пересдачу без предупреждения — какие последствия?",
    answer:
      "Фиксируется как неудовлетворительно, следующий шанс — через комиссию в следующем периоде. Уважительные — только с документом заранее.",
  },
  {
    teacherKey: "teacher_5",
    category: "PROJECT",
    daysAgo: 230,
    question: "Междисциплинарный проект — можно ли зачесть как дипломный этап?",
    answer:
      "При объёме ≥ 6 месяцев и отчёте по стандарту диплома — частично. Решение на заседании кафедры. Подайте сравнительную таблицу компетенций.",
  },
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 231,
    question: "Библиотека ЭБС Лань — доступ истёк, хотя я обучаюсь.",
    answer:
      "Продление раз в год по спискам от кафедры. Отправьте email из заявления деканата. Временный доступ выдам на 7 дней вручную.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 232,
    question: "Красный диплом — учитываются ли оценки за первые два курса?",
    answer:
      "Да, средний за весь период без троек и «удовл.» на госэкзаменах. Подробная таблица на сайте. Консультация по вашему transcript — на приёме.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 233,
    question: "Кого назначить официальным представителем группы на учсовете?",
    answer:
      "Выберите старосту и заместителя голосованием в группе, список мне до пятницы. Полномочия: сбор вопросов, протокол, связь с деканатом.",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 234,
    question: "Пересдача зачёта по физкультуре — через кафедру или спорткомплекс?",
    answer:
      "Нормативы в спорткомплексе, зачёт выставляет преподаватель ФК после акта. Расписание слотов у них. Мы только фиксируем в ведомости по их списку.",
  },
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 235,
    question: "Не приходит OTP на почту при входе в систему тикетов.",
    answer:
      "Проверьте spam и корпоративный домен. Если сменили почту в деканате — сообщите, обновим LDAP. Временный обход — приёмная кафедры.",
  },
  {
    teacherKey: "teacher_5",
    category: "GRADING",
    daysAgo: 236,
    question: "Можно ли пересмотреть итоговую оценку за курсовой после публикации?",
    answer:
      "В течение 5 дней после публикации — апелляция научруку и мне. Нужны конкретные пункты рубрики. После подписания ведомости — только через комиссию.",
  },
  {
    teacherKey: "teacher_5",
    category: "OTHER",
    daysAgo: 237,
    question: "Смена научного руководителя диплома — возможна на 4 курсе?",
    answer:
      "Возможна до защиты темы, при согласии обоих преподавателей и приказе. Подайте мотивированное заявление. Не позднее чем за 6 месяцев до защиты.",
  },
  {
    teacherKey: "teacher_5",
    category: "RETAKE",
    daysAgo: 238,
    question: "Допуск к сессии при одной «неудовл.» с прошлого семестра?",
    answer:
      "Допуск после ликвидации долга или академ. Справка. Список долгов — в деканате. Я подпишу допуск при наличии плана пересдачи до 15 числа.",
  },
  {
    teacherKey: "teacher_5",
    category: "ACCESS",
    daysAgo: 239,
    question: "Расписание экзаменов в Google Calendar — можно подписаться на фид группы?",
    answer:
      "Да, iCal ссылка в LMS в разделе «Расписание». Обновление при изменении приказа — задержка до суток. Критичные переносы дублируем в MAX.",
  },
  // teacher_6 — Холмогоров: математика, биг дата (daysAgo 240–269)
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 240,
    question: "Здравствуйте! В лабе по матрицам в NumPy eigvals даёт комплексные при симметричной матрице — это ошибка округления?",
    answer:
      "При симметричной A мнимая часть — численный шум. Используйте eigh вместо eig. Покажите ||A-A.T||. В отчёте укажите tol для отбрасывания мнимой части.",
  },
  {
    teacherKey: "teacher_6",
    category: "PROJECT",
    daysAgo: 241,
    question: "Курсовой по MapReduce — можно ли Spark вместо Hadoop для учебного?",
    answer:
      "Spark допустим и предпочтительнее. Нужны те же этапы: ingest, transform, aggregate. Сравните время на том же датасете. Конфиг кластера в appendix.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 242,
    question: "Интеграл Монте-Карло lab: оценка π сходится медленно — норм?",
    answer:
      "Сходимость O(1/sqrt(N)) — ожидаемо. Постройте график ошибки vs N. Для отчёта сравните с детерминированным методом на том же интервале.",
  },
  {
    teacherKey: "teacher_6",
    category: "GRADING",
    daysAgo: 243,
    question: "Сняли баллы за «нет обоснования выбора метода» в задаче на SVD.",
    answer:
      "Нужно объяснить, зачем SVD для сжатия/ранга, указать долю объяснённой дисперсии. Числа без текста — минус. Допишите 5-7 предложений вывода.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 244,
    question: "Spark lab: shuffle read 10GB на маленьком датасете — где ошибка?",
    answer:
      "Вероятно cartesian join или groupBy без предфильтра. Проверьте explain plan. Увеличьте партиции осмысленно, не вслепую. Пришлите DAG screenshot.",
  },
  {
    teacherKey: "teacher_6",
    category: "OTHER",
    daysAgo: 245,
    question: "Запись лекции про Hadoop HDFS будет?",
    answer:
      "Запись появится в LMS через 2 дня после лекции. Конспект с формулами replica и rack awareness — в slides.pdf. Практика по Spark в пятницу.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 246,
    question: "Градиентный спуск lab: loss осциллирует — learning rate большой?",
    answer:
      "Уменьшите lr в 10 раз или используйте Adam. Проверьте нормализацию фичей. Постройте кривую loss по итерациям. В отчёте укажите финальный lr.",
  },
  {
    teacherKey: "teacher_6",
    category: "PROJECT",
    daysAgo: 247,
    question: "Датасет 50GB — обязательно HDFS или хватит S3 + Spark?",
    answer:
      "S3/MinIO + Spark через s3a — достаточно для проекта. HDFS — бонус. Важна воспроизводимость pipeline и метрики runtime на кластере курса.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 248,
    question: "Вероятности lab: байес с неинформативным prior — какой выбрать?",
    answer:
      "Для учебной — равномерный или слабый conjugate prior. Сравните posterior при разных prior. Вывод: как меняется решение при n→∞.",
  },
  {
    teacherKey: "teacher_6",
    category: "GRADING",
    daysAgo: 249,
    question: "Контрольная: задача 3 засчитана 0 баллов из-за знака — можно перепроверить?",
    answer:
      "Пришлите скан решения с номером варианта. Если знак верный при корректном ходе — исправим. Пересмотр до публикации итоговой ведомости.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 250,
    question: "Kafka lab: consumer lag растёт при малой нагрузке.",
    answer:
      "Проверьте число партиций и max.poll.interval. Увеличьте consumers до числа партиций. Обработчик не должен блокироваться. Метрики в Grafana dashboard курса.",
  },
  {
    teacherKey: "teacher_6",
    category: "PROJECT",
    daysAgo: 251,
    question: "Стриминг Flink vs Spark Streaming для дипломной части?",
    answer:
      "Оба допустимы. Flink — если нужны event time и watermarks глубже. Опишите семантику exactly-once. Для курса достаточно micro-batch structured streaming.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 252,
    question: "FFT lab: спектр шумный — окно Ханна применили?",
    answer:
      "Примените окно и zero-padding. Укажите sampling rate. Сравните с эталонным синусом. В отчёте подпишите оси частоту в Гц.",
  },
  {
    teacherKey: "teacher_6",
    category: "OTHER",
    daysAgo: 253,
    question: "Доступ к JupyterHub кластера big data — как запросить?",
    answer:
      "Форма в LMS, поле «BigData access». Активация 24ч. Не храните пароли в ноутбуках. Сессии завершаются через 8ч неактивности.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 254,
    question: "Линейная регрессия нормальное уравнение — матрица singular.",
    answer:
      "Коллинеарность фичей — ridge или удалите зависимые столбцы. Проверьте rank(X). Используйте np.linalg.lstsq с rcond. Обоснуйте в тексте.",
  },
  {
    teacherKey: "teacher_6",
    category: "GRADING",
    daysAgo: 255,
    question: "Проект big data: «нет SLA на pipeline» — что дописать?",
    answer:
      "Укажите ожидаемое время batch, частоту запуска, политику retry и alert. Таблица 5 строк достаточна. Пример в rubric проекта.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 256,
    question: "Hive lab: ORC vs Parquet для учебного склада?",
    answer:
      "Parquet предпочтительнее для Spark. ORC — если стек Hadoop native. В отчёте сравните размер и время scan одного запроса. Один формат на весь проект.",
  },
  {
    teacherKey: "teacher_6",
    category: "PROJECT",
    daysAgo: 257,
    question: "Можно ли использовать публичный weather dataset для time series в big data проекте?",
    answer:
      "Да, с указанием источника и лицензии. Добавьте geo и temporal keys для партиционирования. Объём после агрегации должен быть ≥ 1GB.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 258,
    question: "Графы lab: PageRank не сходится за 20 итераций.",
    answer:
      "Проверьте damping factor 0.85 и нормализацию исходящих степеней нуля. Используйте tolerance на delta. Для отчёта — график сходимости.",
  },
  {
    teacherKey: "teacher_6",
    category: "RETAKE",
    daysAgo: 259,
    question: "Не сдал экзамен по матану для программистов — что входит в пересдачу?",
    answer:
      "Пределы, производные, матрицы, базовая вероятность — 6 задач без справочника. Билеты в LMS. Консультация понедельник 11:00.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 260,
    question: "Airflow lab: DAG в состоянии upstream_failed без явной ошибки.",
    answer:
      "Смотрите логи первой failed task. Часто sensor timeout. Увеличьте poke_interval или задайте execution_delta. Не ставьте все depends_on_past=True.",
  },
  {
    teacherKey: "teacher_6",
    category: "OTHER",
    daysAgo: 261,
    question: "Нужен ли TensorFlow для курса или достаточно NumPy/Spark?",
    answer:
      "Базовый курс — NumPy, SciPy, Spark. TensorFlow — опционально в проекте ML-сегмента. Не смешивайте фреймворки без необходимости.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 262,
    question: "Статистика lab: t-test на малых выборках n=8 — корректно?",
    answer:
      "Используйте t-test с проверкой нормальности или Mann-Whitney при отказе. Укажите p-value и alpha. Малые n — оговорите мощность теста в выводе.",
  },
  {
    teacherKey: "teacher_6",
    category: "PROJECT",
    daysAgo: 263,
    question: "Data quality checks в pipeline — какие минимум?",
    answer:
      "Null rate, duplicates, schema drift, row count bounds. Great Expectations или custom asserts в Spark. Один failed check — блокирует publish слоя.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 264,
    question: "Регуляризация L1 lab: веса все нули при alpha=0.1.",
    answer:
      "Слишком сильная регуляризация или ненормированные фичи. Стандартизируйте X, подберите alpha по CV logspace. Покажите path коэффициентов.",
  },
  {
    teacherKey: "teacher_6",
    category: "GRADING",
    daysAgo: 265,
    question: "Защита проекта big data: сколько минут на демо кластера?",
    answer:
      "7 минут доклад + 3 минуты demo live или видео. Запись demo заранее если сеть ненадёжна. Слайды с архитектурой обязательны.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 266,
    question: "Dask lab: client disconnected during compute.",
    answer:
      "Увеличьте timeouts, не закрывайте notebook kernel. Для больших задач — persist промежуточно на disk. На кластере курса — лимит 4 workers.",
  },
  {
    teacherKey: "teacher_6",
    category: "PROJECT",
    daysAgo: 267,
    question: "Delta Lake в проекте — обязателен или достаточно Parquet?",
    answer:
      "Parquet достаточно. Delta — если нужны ACID upserts и time travel. Опишите, зачем выбрали. Не усложняйте без upsert сценария.",
  },
  {
    teacherKey: "teacher_6",
    category: "LAB",
    daysAgo: 268,
    question: "Оптимизация lab: метод Ньютона расходится на корне x^3.",
    answer:
      "Нужен хороший start point и damping. Для кратных корней — модификация Ньютона. Сравните с bisection. В отчёте таблица итераций.",
  },
  {
    teacherKey: "teacher_6",
    category: "OTHER",
    daysAgo: 269,
    question: "Семинар по теории информации переносится?",
    answer:
      "Семинар сдвинут на 16:20 того же дня, ауд. 105. Тема: энтропия и сжатие. Домашнее задание дедлайн не меняется.",
  },
  // teacher_7 — Клёсов: фреймворки Spring, React, Docker (daysAgo 270–299)
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 270,
    question: "Привет! Spring Security lab — 403 на /api/admin хотя роль ADMIN в JWT есть.",
    answer:
      "Проверьте claim roles vs hasRole prefix ROLE_. Конвертер JwtAuthenticationConverter должен мапить scope в authorities. Логируйте Authentication на входе фильтра.",
  },
  {
    teacherKey: "teacher_7",
    category: "PROJECT",
    daysAgo: 271,
    question: "Микросервисный проект — минимум сколько сервисов для зачёта?",
    answer:
      "Минимум два доменных сервиса + gateway или BFF. Общая auth, docker-compose, контракт OpenAPI. Монолит с модулями — только с обоснованием.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 272,
    question: "React lab: React Query stale data после mutation.",
    answer:
      "Вызовите queryClient.invalidateQueries с ключом списка. Optimistic update опционально. Проверьте, что mutation onSuccess срабатывает. Пример в starter week-4.",
  },
  {
    teacherKey: "teacher_7",
    category: "ACCESS",
    daysAgo: 273,
    question: "Docker registry курса — unauthorized при push.",
    answer:
      "docker login с токеном из LMS. Используйте namespace student_xx/repo:tag. Токен обновляется каждые 90 дней. CI использует отдельный robot account.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 274,
    question: "Docker lab: контейнер exits 137 сразу после start.",
    answer:
      "OOM kill — увеличьте memory limit в compose или уменьшите JVM heap. Проверьте dmesg на хосте. Для Java — -XX:MaxRAMPercentage=75.0.",
  },
  {
    teacherKey: "teacher_7",
    category: "GRADING",
    daysAgo: 275,
    question: "Сняли баллы за отсутствие healthcheck в compose — в ТЗ не видел.",
    answer:
      "Healthcheck в рубрике недели 8, раздел DevOps. Добавьте curl/wget в Dockerfile и depends_on condition service_healthy. Пересдача без штрафа до среды.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 276,
    question: "Spring Boot 3 migration — javax.persistence not found.",
    answer:
      "Замените на jakarta.persistence API. Spring Boot 3 требует Java 17+. Список замен в migration guide репозитория. Проверьте springdoc-openapi v2.",
  },
  {
    teacherKey: "teacher_7",
    category: "PROJECT",
    daysAgo: 277,
    question: "CI GitHub Actions — тесты падают только в pipeline, локально green.",
    answer:
      "Часто timezone или embedded DB profile. Используйте testcontainers с фиксированным tag. Логи Actions приложите. Проверьте spring.profiles.active=test в yaml.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 278,
    question: "Redux toolkit lab: serializable check warning на Date в state.",
    answer:
      "Храните ISO string, не Date object. Или отключите check для тестового slice — не для прод. В отчёте объясните выбор нормализации.",
  },
  {
    teacherKey: "teacher_7",
    category: "OTHER",
    daysAgo: 279,
    question: "Воркшоп по Kubernetes для группы будет в этом месяце?",
    answer:
      "Да, 8 числа, 2 часа, lab k8s на minikube. Запись в таблице. Не обязателен для сдачи, но плюс к проекту за deployment manifest.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 280,
    question: "Hibernate N+1 на лабе — как быстро увидеть в логах?",
    answer:
      "Включите show_sql и statistics или p6spy. Решение — @EntityGraph или join fetch осознанно. Не fetch EAGER везде. Сравните число запросов до/после.",
  },
  {
    teacherKey: "teacher_7",
    category: "ACCESS",
    daysAgo: 281,
    question: "Не могу клонировать monorepo — LFS bandwidth exceeded.",
    answer:
      "GIT_LFS_SKIP_SMUDGE=1 clone, затем pull только нужных LFS файлов. Для сдачи лабы 3 хватит submodule backend. Напишите — временно поднимем лимит.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 282,
    question: "Vite proxy к backend dev — CORS всё равно ругается.",
    answer:
      "Настройте proxy в vite.config и относительные URL в axios. CORS на backend для dev origin localhost:5173. Не вызывайте полный URL мимо proxy.",
  },
  {
    teacherKey: "teacher_7",
    category: "PROJECT",
    daysAgo: 283,
    question: "OpenAPI codegen клиент — версии springdoc и generator конфликтуют.",
    answer:
      "Зафиксируйте версии из BOM курса. Генерируйте в отдельном модуле api-client. Коммитьте generated sources только если CI без сети. Иначе generate в build.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 284,
    question: "JUnit 5 @SpringBootTest поднимает весь контекст 2 минуты — ускорить?",
    answer:
      "Используйте @DataJpaTest/@WebMvcTest для узких срезов. @MockBean вместо полного контекста. spring.test.context.cache.enabled=true. Профиль test-lite в примере.",
  },
  {
    teacherKey: "teacher_7",
    category: "GRADING",
    daysAgo: 285,
    question: "Code review от бота: «нет rate limiting» — обязательно?",
    answer:
      "Для API с auth — bucket4j или gateway filter. Минимум на login endpoint. Документируйте лимиты в OpenAPI. Без этого −10% DevOps части.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 286,
    question: "WebSocket STOMP Spring — disconnect сразу после connect.",
    answer:
      "Проверьте SockJS fallback и CSRF отключение для stomp endpoint. Origin patterns в setAllowedOriginPatterns. Heartbeat 10s/10s в клиенте.",
  },
  {
    teacherKey: "teacher_7",
    category: "PROJECT",
    daysAgo: 287,
    question: "Можно ли фронт на Vue, бэк Spring — для командного проекта?",
    answer:
      "Да, стек свободный в рамках JVM backend. Контракт API общий. CI должен собирать оба. README с инструкцией docker compose up.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 288,
    question: "Docker multi-stage — образ всё равно 800MB из-за JDK.",
    answer:
      "Используйте distroless или eclipse-temurin jre slim runtime stage. jlink для custom runtime — бонус. Сравните размеры в отчёте lab 9.",
  },
  {
    teacherKey: "teacher_7",
    category: "OTHER",
    daysAgo: 289,
    question: "Литература по Spring — что из нового читать после 6?",
    answer:
      "Официальные guides Spring Boot 3 и migration notes. Книга Walls 6th — база. Практика важнее — наши лабы покрывают 80% экзамена.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 290,
    question: "React router 6 loader — ошибка 404 на refresh в nginx.",
    answer:
      "Настройте try_files $uri /index.html для SPA. В dev Vite historyApiFallback автоматом. В production compose — отдельный nginx config в repo.",
  },
  {
    teacherKey: "teacher_7",
    category: "ACCESS",
    daysAgo: 291,
    question: "SonarQube курса — не вижу проект группы 5.",
    answer:
      "Проекты создаются по cron после push в main. Сделайте push с sonar-project.properties. Ключ в LMS. Первый анализ — до 30 минут.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 292,
    question: "MapStruct lab: mapper bean not found в runtime.",
    answer:
      "Добавьте mapstruct-processor в annotationProcessorPaths maven-compiler. componentModel=spring. clean install после смены DTO. Проверьте generated sources.",
  },
  {
    teacherKey: "teacher_7",
    category: "RETAKE",
    daysAgo: 293,
    question: "Пересдача практики по фреймворкам — что принести?",
    answer:
      "Рабочий docker-compose, два endpoint по ТЗ, тесты green. Устный опрос 10 минут по Spring и React basics. Запись на слот в LMS Retake.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 294,
    question: "Cypress e2e flaky на login — timeout waiting for dashboard.",
    answer:
      "Используйте data-testid, intercept login API, увеличьте defaultCommandTimeout. Не зависьте от анимаций. В CI — одна retry допустима по конфигу курса.",
  },
  {
    teacherKey: "teacher_7",
    category: "PROJECT",
    daysAgo: 295,
    question: "Secrets в .env попали в git — как исправить для оценки?",
    answer:
      "Немедленно rotate keys, git filter-repo удалить историю, force push только после согласования. Новые secrets в vault/env example. Отчёт об инциденте — плюс к зрелости.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 296,
    question: "Spring Cloud Gateway — 504 gateway timeout на медленный сервис.",
    answer:
      "Увеличьте response-timeout и resilience4j circuit breaker. Настройте fallback response. Для лабы достаточно 30s timeout и лог причины.",
  },
  {
    teacherKey: "teacher_7",
    category: "GRADING",
    daysAgo: 297,
    question: "Проект: «слабое покрытие тестами» — порог какой?",
    answer:
      "Минимум 60% line coverage backend, 40% frontend по JaCoCo/Vitest. Исключения DTO и config. Отчёт coverage в CI badge. Ниже — доработка.",
  },
  {
    teacherKey: "teacher_7",
    category: "LAB",
    daysAgo: 298,
    question: "Tailwind + React lab: классы не применяются в storybook.",
    answer:
      "Импортируйте index.css в preview.js. content paths в tailwind.config включают stories. Postcss в storybook main. Пример в ветке tailwind-fix.",
  },
  {
    teacherKey: "teacher_7",
    category: "OTHER",
    daysAgo: 299,
    question: "Пары по Docker перенос на понедельник — подтвердите?",
    answer:
      "Да, понедельник 15:30, та же аудитория. Лаба 9 и quiz по compose networks. Запись лекции с четверга уже в LMS.",
  },
  // teacher_8 — Коняшкин: embedded, MCU (daysAgo 300–329)
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 300,
    question: "Добрый день! STM32 lab — USART printf ничего не выводит в терминал.",
    answer:
      "Проверьте инициализацию UART, baud 115200, remap pins в CubeMX. Retarget printf через _write syscalls. GND common с USB-UART. Сравните с blink проектом.",
  },
  {
    teacherKey: "teacher_8",
    category: "PROJECT",
    daysAgo: 301,
    question: "Курсовой по IoT — ESP32 или STM32 предпочтительнее?",
    answer:
      "Оба допустимы. ESP32 — если нужен Wi-Fi/BLE out of box. STM32 — для RTOS и промышленных периферий. Обоснуйте выбор и питание в ТЗ.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 302,
    question: "Прерывание EXTI срабатывает многократно на один клик кнопки.",
    answer:
      "Добавьте debounce 20-50ms в ISR или используйте таймер. Подтяжка pull-up. Не делайте delay в ISR. Логируйте флаг в main loop.",
  },
  {
    teacherKey: "teacher_8",
    category: "ACCESS",
    daysAgo: 303,
    question: "Не выдают плату STM32 Nucleo из лаборатории — альтернатива?",
    answer:
      "На время можно симулятор Proteus только для схемотехники части. Для сдачи кода нужна реальная плата — запишитесь в очередь выдачи на 3 дня.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 304,
    question: "ADC шум на LDR — значения прыгают.",
    answer:
      "Усредните 16 выборок, добавьте конденсатор 100nF на вход. Калибровка min/max в EEPROM. В отчёте график до/после фильтра.",
  },
  {
    teacherKey: "teacher_8",
    category: "OTHER",
    daysAgo: 305,
    question: "Список компонентов для домашней отладки — что купить минимум?",
    answer:
      "NUCLEO-F401RE, USB-UART, макетка, LED, кнопки, резисторы, LDR. Опционально осциллограф — в лабе есть. Список с артикулами в LMS.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 306,
    question: "FreeRTOS lab: stack overflow в задаче sensor_task.",
    answer:
      "Увеличьте stack size в xTaskCreate, включите configCHECK_FOR_STACK_OVERFLOW. Уберите большие буферы из локальных переменных задачи. Используйте heap аккуратно.",
  },
  {
    teacherKey: "teacher_8",
    category: "PROJECT",
    daysAgo: 307,
    question: "Питание устройства от LiPo — нужна ли схема заряда в проекте?",
    answer:
      "Если автономное устройство — да, TP4056 или аналог в схеме и раздел безопасности. Иначе USB power only — укажите в ТЗ. Сертификация не требуется.",
  },
  {
    teacherKey: "teacher_8",
    category: "GRADING",
    daysAgo: 308,
    question: "Сняли баллы за отсутствие комментариев в протоколе UART.",
    answer:
      "В рубрике нужен формат кадра: старт, длина, CRC. Документируйте в README и диаграмме timing. Дополните и пришлите hex dump примера.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 309,
    question: "I2C OLED не инициализируется — адрес 0x3C или 0x3D?",
    answer:
      "Зависит от модуля — просканируйте i2c bus scanner утилитой. Проверьте pull-up 4.7k и питание 3.3V. Длинные провода — источник ошибок.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 310,
    question: "PWM lab: мотор гудит на низкой скважности но не крутится.",
    answer:
      "Нужен драйвер L298N или MOS, не GPIO напрямую. Частота PWM 1-20 kHz подберите. Flyback диод обязателен. Ток не из пина MCU.",
  },
  {
    teacherKey: "teacher_8",
    category: "ACCESS",
    daysAgo: 311,
    question: "ST-Link не определяется Windows 11 — device descriptor failed.",
    answer:
      "Переустановите STSW-LINK009, другой USB порт без хаба. Отключите driver signature enforcement не нужно. Попробуйте плату в lab PC #4.",
  },
  {
    teacherKey: "teacher_8",
    category: "PROJECT",
    daysAgo: 312,
    question: "Документация по курсовому — нужен ли PCB макет в Gerber?",
    answer:
      "Для «отлично» — схема в KiCad и layout или обоснование breadboard. Gerber — бонус. Минимум — принципиальная схема и BOM.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 313,
    question: "Watchdog сбрасывает МК каждые 2 сек — где искать?",
    answer:
      "Кормите IWDG в idle hook или отдельной задаче. Долгие блокирующие HAL_Delay без refresh. Увеличьте timeout на отладке, потом верните production value.",
  },
  {
    teacherKey: "teacher_8",
    category: "OTHER",
    daysAgo: 314,
    question: "Экскурсия на производство по embedded состоится?",
    answer:
      "Планируется 20 ноября, 15 мест. Запись в форме. Нужна спецодежда и инструктаж. Замена — виртуальный тур если не наберём группу.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 315,
    question: "SPI flash чтение JEDEC id возвращает 0xFFFFFF.",
    answer:
      "Проверьте mode SPI, CPOL/CPHA, и пины CS. Питание 3.3V. Не используйте DMA до базового polling. Осциллографом — clk есть?",
  },
  {
    teacherKey: "teacher_8",
    category: "RETAKE",
    daysAgo: 316,
    question: "Пересдача лаб по микроконтроллерам — какие работы повторно?",
    answer:
      "Лабы 4-6: UART, ADC, RTOS. Принести плату и прошивку. Устно — вопросы по регистрам таймера. Запись через деканат и слот в чате курса.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 317,
    question: "CAN bus lab на учебной плате — терминатор 120 Ом нужен?",
    answer:
      "Да, на концах шины 120 Ом, даже для двух узлов на столе. Иначе отражения и ошибки ACK. Измерьте сопротивление между CAN_H и CAN_L.",
  },
  {
    teacherKey: "teacher_8",
    category: "PROJECT",
    daysAgo: 318,
    question: "MQTT на ESP32 — TLS обязателен для зачёта?",
    answer:
      "Для учебного брокера курса — достаточно username/password. TLS — плюс. Не храните пароль в прошивке plaintext — используйте NVS partition.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 319,
    question: "Timer input capture для измерения частоты — показания нестабильны.",
    answer:
      "Усредните несколько периодов, фильтруйте выбросы. Prescaler подберите под диапазон. При низкой частоте — увеличьте время capture window.",
  },
  {
    teacherKey: "teacher_8",
    category: "GRADING",
    daysAgo: 320,
    question: "Защита лабы 7: сняли за «нет обработки ошибок HAL».",
    answer:
      "Проверяйте return HAL_OK и в error_handler логируйте код. Не игнорируйте Error_Handler пустым while. Пример wrapper в шаблоне курса.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 321,
    question: "Low power STOP mode — просыпается только от reset, не от RTC.",
    answer:
      "Настройте EXTI для RTC wakeup, очистите флаги перед сном. Отключите debug в STOP для измерения тока. Проверьте clock после wake.",
  },
  {
    teacherKey: "teacher_8",
    category: "ACCESS",
    daysAgo: 322,
    question: "Arduino IDE не видит COM порт CH340.",
    answer:
      "Драйвер CH340 для вашей ОС, кабель data+, не charge-only. Диспетчер устройств — конфликт COM3 зарезервирован, смените номер.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 323,
    question: "DMA UART TX зависает — не вызывается callback complete.",
    answer:
      "Включите NVIC для DMA stream. Проверьте Normal mode vs Circular. Буфер static, не stack. HAL_UART_TxCpltCallback зарегистрирован в том же файле.",
  },
  {
    teacherKey: "teacher_8",
    category: "OTHER",
    daysAgo: 324,
    question: "Можно ли использовать PlatformIO вместо CubeIDE?",
    answer:
      "Да, если проект собирается и flash тем же ST-Link. platformio.ini в репозитории. CubeMX codegen — в git. На защите покажите прошивку.",
  },
  {
    teacherKey: "teacher_8",
    category: "PROJECT",
    daysAgo: 325,
    question: "Эмуляция датчика без железа для части отчёта — допустимо?",
    answer:
      "Для алгоритмов фильтрации — да, в unit test на PC. Финальная демонстрация — на hardware. Укажите границы simulation vs target.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 326,
    question: "Реле щёлкает, но нагрузка 220В не включается — что проверить?",
    answer:
      "Низковольтная часть только в лабе с 12V нагрузкой. 220В запрещено на столе. Используйте лампу 12V и измерьте контакты реле мультиметром.",
  },
  {
    teacherKey: "teacher_8",
    category: "RETAKE",
    daysAgo: 327,
    question: "Не сдал зачёт по embedded тесту — минимум для пересдачи?",
    answer:
      "≥14 из 20, билет с практическим заданием на таймер и GPIO. Список формул не нужен. Регистрация в деканате обязательна.",
  },
  {
    teacherKey: "teacher_8",
    category: "LAB",
    daysAgo: 328,
    question: "Bootloader custom — прошивка по UART не входит в DFU.",
    answer:
      "BOOT0 pin high при reset, правильная скорость 57600. Проверьте pin map Nucleo. Документация AN2606 для вашего чипа. Не прошивайте при 3.3V на USB отключенном.",
  },
  {
    teacherKey: "teacher_8",
    category: "OTHER",
    daysAgo: 329,
    question: "Рекомендуете ли курс по электробезопасности перед практикой в мастерской?",
    answer:
      "Обязательный инструктаж 1 раз в год, запись в журнале. Без него не допускаем к стендам с сетью 220В. Ближайший слот — среда 9:00.",
  },
];
