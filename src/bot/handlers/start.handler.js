import { ConsentService } from "@/services/consent.service";
import { MaxService } from "@/services/max.service";
import { getConsentKeyboard } from "@/bot/keyboards/consent.keyboard";
import { CONSENT_TEXT } from "@/bot/texts/legal";
import { getRoleSelectionKeyboard } from "@/bot/keyboards/role.keyboard";

export async function startHandler(ctx) {
  const hasConsent = await ConsentService.hasConsent(ctx.user.id);

  if (!hasConsent) {
    await MaxService.sendMessage(
      ctx.recipient,
      CONSENT_TEXT,
      getConsentKeyboard(),
    );
    return;
  }

  await MaxService.sendMessage(
    ctx.recipient,
    "Выберите роль для работы с ботом:",
    getRoleSelectionKeyboard(),
  );
}