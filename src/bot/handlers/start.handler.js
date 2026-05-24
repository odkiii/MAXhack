import { ConsentService } from "@/services/consent.service";
import { MaxService } from "@/services/max.service";
import { getConsentKeyboard } from "@/bot/keyboards/consent.keyboard";
import { getStudentMenuKeyboard } from "@/bot/keyboards/menu.keyboard";

const CONSENT_DISCLAIMER = `Добро пожаловать в систему консультаций преподавателей.

Перед использованием сервиса необходимо принять условия обработки персональных данных и политику конфиденциальности.

Нажмите кнопку ниже, чтобы продолжить.`;

export async function startHandler(ctx) {
  const { user, chatId } = ctx;

  const hasConsent = await ConsentService.hasConsent(user.id);

  if (!hasConsent) {
    await MaxService.sendMessage(
      ctx.recipient,
      CONSENT_DISCLAIMER,
      getConsentKeyboard(),
    );
    return;
  }

  await MaxService.sendMessage(
    ctx.recipient,
    `Здравствуйте, ${user.displayName ?? "студент"}!\n\nВыберите действие:`,
    getStudentMenuKeyboard(),
  );
}
