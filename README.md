# max-hack

Бот для консультаций с преподавателями (хакатон MAX), бот **@spring_cat4_bot**.

Стек: Next.js, Prisma, PostgreSQL, MAX Bot API (`platform-api.max.ru`).

## Тест в MAX через Vercel (без ngrok)

Рекомендуемый способ: деплой из GitHub → постоянный HTTPS → вебхук MAX.

### 1. Облачная PostgreSQL

На Vercel **не работает** `localhost` из `.env`. Нужна БД в облаке (бесплатно):

- [Neon](https://neon.tech) — Create project → скопировать **Connection string** (лучше **Pooled**)
- или [Supabase](https://supabase.com) → Project Settings → Database → URI
- или Vercel Storage → Postgres

Локально один раз применить схему к облачной БД:

```bash
# в .env подставьте облачный DATABASE_URL
npm run db:migrate
```

### 2. GitHub

Репозиторий: `https://github.com/odkiii/MAXhack`

Закоммитьте и запушьте изменения в `main`.

### 3. Деплой на Vercel

1. [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import репозитория **MAXhack**
3. **Environment Variables** (Production):

| Переменная | Значение |
|------------|----------|
| `DATABASE_URL` | строка подключения Neon/Supabase (pooled, если есть) |
| `MAX_BOT_TOKEN` | токен из business.max.ru → spring_cat4_bot → Интеграция |
| `MAX_API_URL` | `https://platform-api.max.ru` |
| `MAX_WEBHOOK_SECRET` | любая строка, напр. `my-secret-123` |

4. **Deploy** — дождитесь зелёного статуса.
5. Скопируйте URL проекта, например `https://maxhack-xxx.vercel.app`.

Вебхук MAX:

```
https://ваш-проект.vercel.app/api/max/webhook
```

### 4. Зарегистрировать вебхук в MAX

Локально в `.env`:

```env
MAX_BOT_TOKEN="..."
MAX_WEBHOOK_URL="https://ваш-проект.vercel.app/api/max/webhook"
MAX_WEBHOOK_SECRET="my-secret-123"
```

```bash
npm run max:webhook
npm run max:webhook:get
```

В Vercel добавьте ту же переменную **`MAX_WEBHOOK_SECRET`** (как в подписке) и сделайте **Redeploy**, чтобы вебхук не отвечал 403.

### 5. Проверка в MAX

Откройте **@spring_cat4_bot** → Запустить / `/start` → пройдите сценарий тикета.

Логи: Vercel → проект → **Logs** (Runtime Logs).

---

## Локальная разработка

### Токен

1. [business.max.ru](https://business.max.ru/self) → **Чат-боты** → **spring_cat4_bot** → **Интеграция** → **Получить токен**
2. `.env` из `.env.example`
3. `npm run max:me` — ожидается `username: "spring_cat4_bot"` (при 401: `MAX_USE_BEARER=1`)

### Сервер

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Локально вебхук MAX **не примет** `http://localhost` — для теста с телефона используйте Vercel (выше) или long polling:

```bash
npm run max:webhook:delete -- https://ваш-проект.vercel.app/api/max/webhook
npm run max:poll
```

## Отладка

| Проблема | Что сделать |
|----------|-------------|
| 401 на `max:me` | Токен, `MAX_USE_BEARER=1` |
| Vercel build падает на migrate | `DATABASE_URL` в env Vercel, БД доступна из интернета |
| Бот молчит | `max:webhook:get`, URL = `.../api/max/webhook`, логи Vercel |
| 403 на вебхуке | `MAX_WEBHOOK_SECRET` одинаковый в Vercel и в `npm run max:webhook` |
| Prisma на Vercel | Используйте **pooled** URL (Neon pooler) |

## Postman

```json
{
  "update_type": "message_created",
  "message": {
    "recipient": { "chat_id": 1, "chat_type": "dialog", "user_id": 1001 },
    "sender": { "user_id": 1001, "first_name": "Ivan", "is_bot": false },
    "body": { "text": "/start" }
  }
}
```

## Prisma

- `npm run db:migrate` — локально / к облачной БД
- `npm run db:studio` — просмотр данных
