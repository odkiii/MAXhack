import "dotenv/config";
import {
  getSubscriptions,
  setSubscription,
  deleteSubscription,
} from "../src/lib/max-api.js";

const command = process.argv[2] ?? "set";
function resolveWebhookUrl() {
  if (process.argv[3]) {
    return process.argv[3];
  }

  if (process.env.MAX_WEBHOOK_URL?.trim()) {
    return process.env.MAX_WEBHOOK_URL.trim();
  }

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

  if (vercelHost) {
    const host = vercelHost.replace(/^https?:\/\//, "");
    return `https://${host}/api/max/webhook`;
  }

  return null;
}

const webhookUrl = resolveWebhookUrl();

async function main() {
  if (!process.env.MAX_BOT_TOKEN) {
    console.error("Set MAX_BOT_TOKEN in .env");
    process.exit(1);
  }

  try {
    if (command === "get") {
      const subs = await getSubscriptions();
      console.log(JSON.stringify(subs, null, 2));
      return;
    }

    if (command === "delete") {
      if (!webhookUrl) {
        console.error("Usage: npm run max:webhook:delete -- https://your-url/api/max/webhook");
        process.exit(1);
      }
      await deleteSubscription(webhookUrl);
      console.log("Subscription deleted:", webhookUrl);
      return;
    }

    if (!webhookUrl) {
      console.error(
        "Set MAX_WEBHOOK_URL in .env or pass URL:\n  npm run max:webhook -- https://xxxx.ngrok-free.app/api/max/webhook",
      );
      process.exit(1);
    }

    const secret = process.env.MAX_WEBHOOK_SECRET?.trim();

    const result = await setSubscription({
      url: webhookUrl,
      secret: secret || undefined,
    });

    console.log("Webhook registered:", webhookUrl);
    console.log(JSON.stringify(result, null, 2));

    if (secret) {
      console.log("\nMAX_WEBHOOK_SECRET is set — incoming requests will be verified.");
    } else {
      console.log(
        "\nWarning: no MAX_WEBHOOK_SECRET — webhook accepts any POST (ok for quick test only).",
      );
    }
  } catch (error) {
    console.error("Failed:", error.message);
    if (error.data) {
      console.error(JSON.stringify(error.data, null, 2));
    }
    process.exit(1);
  }
}

main();
