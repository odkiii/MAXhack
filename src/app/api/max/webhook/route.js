import { botRouter } from "@/bot/router";
import { normalizeUpdate } from "@/lib/max-update";

function verifyWebhookSecret(request) {
  const secret = (process.env.MAX_WEBHOOK_SECRET || "").trim();

  if (!secret) {
    return true;
  }

  const received = request.headers.get("x-max-bot-api-secret") ?? "";

  return received === secret;
}

export async function POST(request) {
  if (!verifyWebhookSecret(request)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const raw = await request.json();

    console.log("[MAX Webhook]", JSON.stringify(raw, null, 2));

    const update = normalizeUpdate(raw);

    if (!update) {
      console.log("[MAX Webhook] unsupported update, skipped");
      return Response.json({ ok: true });
    }

    await botRouter(update);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[MAX Webhook Error]", error);

    return Response.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
