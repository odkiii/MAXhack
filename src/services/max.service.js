export class MaxService {
  static async sendMessage(chatId, text, keyboard = null) {
    console.log("[MAX API]", {
      chatId,
      text,
      keyboard,
      apiUrl: process.env.MAX_API_URL,
    });

    return { ok: true };
  }
}
