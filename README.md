# max-hack

Бот тикетов консультаций для MAX.

## Стек

- Next.js
- Prisma
- PostgreSQL
- MAX Bot API (`https://platform-api.max.ru`)

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните:

- `DATABASE_URL`
- `MAX_BOT_TOKEN`
- `MAX_API_URL`
- `MAX_WEBHOOK_URL`
- `MAX_WEBHOOK_SECRET`

## Локальный запуск

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

## Полезные команды

```bash
npm run max:me
npm run max:webhook
npm run max:webhook:get
npm run max:webhook:delete -- https://your-domain/api/max/webhook
npm run max:poll
```

## Webhook

Endpoint:

`POST /api/max/webhook`

Для production нужен публичный HTTPS-адрес:

`https://your-domain/api/max/webhook`

## Проверка

Проверка состояния:

`GET /api/health`

## Prisma

- `npm run db:migrate`
- `npm run db:studio`

