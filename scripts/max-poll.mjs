/**
 * Long polling for local testing WITHOUT webhook (only works if webhook is NOT active).
 */
import "dotenv/config";
import { getUpdates } from "../src/lib/max-api.js";
import { normalizeUpdate } from "../src/lib/max-update.js";
import { botRouter } from "../src/bot/router.js";

let marker;

async function pollOnce() {
  const data = await getUpdates({ marker, timeout: 25 });
  const updates = data?.updates ?? [];

  if (data?.marker != null) {
    marker = data.marker;
  }

  for (const raw of updates) {
    console.log("[poll]", raw.update_type);
    const update = normalizeUpdate(raw);

    if (update) {
      await botRouter(update);
    }
  }
}

async function main() {
  if (!process.env.MAX_BOT_TOKEN) {
    console.error("Set MAX_BOT_TOKEN in .env");
    process.exit(1);
  }

  console.log("Long polling started. Ctrl+C to stop.");
  console.log("Note: disable webhook first (npm run max:webhook:delete)");

  while (true) {
    try {
      await pollOnce();
    } catch (error) {
      console.error("Poll error:", error.message);
      if (error.data) {
        console.error(JSON.stringify(error.data, null, 2));
      }
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

main();
