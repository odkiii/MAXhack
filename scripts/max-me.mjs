import "dotenv/config";
import { getMe } from "../src/lib/max-api.js";

async function main() {
  try {
    const me = await getMe();
    console.log("Bot connected:");
    console.log(JSON.stringify(me, null, 2));
  } catch (error) {
    console.error("Failed:", error.message);
    if (error.data) {
      console.error(JSON.stringify(error.data, null, 2));
    }
    if (error.status === 401) {
      console.error(
        "\nTip: check MAX_BOT_TOKEN in .env. Try MAX_USE_BEARER=1 if 401 persists.",
      );
    }
    process.exit(1);
  }
}

main();
