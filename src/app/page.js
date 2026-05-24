export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">MAX Consultation Tickets</h1>
      <p className="mt-2 text-neutral-600">
        Бот: @spring_cat4_bot · Webhook: POST /api/max/webhook
      </p>
      <p className="mt-1 text-sm text-neutral-500">
        Настройка: см. README (Vercel + npm run max:webhook)
      </p>
    </main>
  );
}
