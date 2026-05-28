import { getMe } from "@/lib/max-api";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const checks = {
    ok: true,
    timestamp: new Date().toISOString(),
    hasToken: Boolean(process.env.MAX_BOT_TOKEN),
    hasDatabase: Boolean(process.env.DATABASE_URL),
    apiUrl: process.env.MAX_API_URL || "https://platform-api.max.ru",
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch (error) {
    checks.ok = false;
    checks.database = error.message;
  }

  if (process.env.MAX_BOT_TOKEN) {
    try {
      const me = await getMe();
      checks.bot = { username: me.username, user_id: me.user_id };
    } catch (error) {
      checks.ok = false;
      checks.bot = { error: error.message, hint: "Try MAX_USE_BEARER=1" };
    }
  }

  return Response.json(checks, { status: checks.ok ? 200 : 503 });
}
