# max-hack

Бот для консультаций с преподавателями (хакатон MAX).

Стек: next.js, prisma, postgres, tailwind.

## как запустить

1. поставить postgres и прописать `DATABASE_URL` в `.env` (можно скопировать из `.env.example`)
2. `npm install`
3. `npm run db:generate`
4. `npm run db:migrate`
5. `npm run dev`

вебхук: `POST http://localhost:3000/api/max/webhook`

## postman

тест /start:

```json
{
  "message": {
    "text": "/start",
    "chat": { "id": "chat_1" },
    "from": { "id": "user_1", "first_name": "Ivan" }
  }
}
```

дальше по цепочке: `accept_consent` -> `create_ticket` -> `teacher_1` -> `category_ACADEMIC` -> текст с вопросом -> `confirm_ticket`

ответы бота пока в консоли (max api замокан)

## prisma

- `npm run db:migrate` - миграции
- `npm run db:studio` - посмотреть бд
