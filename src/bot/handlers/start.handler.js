import { ConsentService } from "@/services/consent.service";
import { MaxService } from "@/services/max.service";
import { getConsentKeyboard } from "@/bot/keyboards/consent.keyboard";
import { CONSENT_TEXT } from "@/bot/texts/legal";
import { sendUserAfterAuth } from "@/bot/helpers/onboarding.helper";

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

  await sendUserAfterAuth(ctx);
}
