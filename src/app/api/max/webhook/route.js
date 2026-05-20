import { botRouter } from "@/bot/router";

export async function POST(request) {
  try {
    const update = await request.json();

    console.log("[MAX Webhook]", JSON.stringify(update, null, 2));

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
