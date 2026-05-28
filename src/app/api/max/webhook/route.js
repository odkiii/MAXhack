import { botRouter } from "@/bot/router";
import { normalizeUpdate, extractReplyRecipient } from "@/lib/max-update";
import { sendMessage } from "@/lib/max-api";

export const runtime = "nodejs";

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
    console.error("[MAX Webhook] 403 — secret mismatch (check MAX_WEBHOOK_SECRET on Vercel and in subscription)");
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  let raw = null;

  try {
    raw = await request.json();

    console.log("[MAX Webhook]", raw.update_type ?? "legacy", JSON.stringify(raw).slice(0, 500));

    const update = normalizeUpdate(raw);

    if (!update) {
      console.log("[MAX Webhook] skipped — unsupported or invalid payload");
      return Response.json({ ok: true });
    }

    await botRouter(update);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[MAX Webhook Error]", error?.message, error?.data ?? error);

    try {
      const recipient = raw ? extractReplyRecipient(raw) : null;

      if (recipient?.userId != null && process.env.MAX_BOT_TOKEN) {
        await sendMessage(
          recipient,
          "Произошла ошибка. Попробуйте снова отправить /start или нажмите «Запустить» в чате с ботом.",
        );
      }
    } catch (notifyError) {
      console.error("[MAX Webhook] failed to notify user:", notifyError?.message);
    }

    return Response.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
