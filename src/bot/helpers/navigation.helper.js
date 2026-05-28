import { MaxService } from "@/services/max.service";
import { NavigationService } from "@/services/navigation.service";
import { NAV_CALLBACKS, NAV_LABELS } from "@/bot/constants/navigation";
import { MENU_TEXT } from "@/bot/constants/menu-text";

const NAV_BUTTON_TEXTS = new Set([
  NAV_LABELS.BACK,
  NAV_LABELS.MAIN_MENU,
  MENU_TEXT.START,
  "В главное меню",
  "В меню преподавателя",
]);

function isNavigationButton(button) {
  if (!button) {
    return false;
  }

  if (
    button.callback_data === NAV_CALLBACKS.BACK ||
    button.callback_data === NAV_CALLBACKS.MAIN_MENU ||
    button.callback_data === "main_menu"
  ) {
    return true;
  }

  if (button.type === "message" && NAV_BUTTON_TEXTS.has(button.text)) {
    return true;
  }

  return NAV_BUTTON_TEXTS.has(button.text);
}

function isNavigationRow(row) {
  return row.length > 0 && row.every(isNavigationButton);
}

export function stripNavigationRows(keyboard) {
  if (!keyboard?.inline_keyboard?.length) {
    return keyboard ?? null;
  }

  const inline_keyboard = keyboard.inline_keyboard.filter(
    (row) => !isNavigationRow(row),
  );

  if (!inline_keyboard.length) {
    return null;
  }

  return { inline_keyboard };
}

export async function buildNavigationKeyboard(ctx, keyboard, options = {}) {
  const {
    showBack = true,
    showMainMenu = true,
  } = options;

  const rows = [...(stripNavigationRows(keyboard)?.inline_keyboard ?? [])];
  const navRow = [];

  if (showBack && ctx.user?.id && (await NavigationService.canGoBack(ctx.user.id))) {
    navRow.push({
      text: NAV_LABELS.BACK,
      callback_data: NAV_CALLBACKS.BACK,
    });
  }

  if (showMainMenu) {
    navRow.push({
      text: NAV_LABELS.MAIN_MENU,
      callback_data: NAV_CALLBACKS.MAIN_MENU,
    });
  }

  if (navRow.length) {
    rows.push(navRow);
  }

  if (!rows.length) {
    return null;
  }

  return { inline_keyboard: rows };
}

function getCallbackFrame(ctx) {
  const message = ctx.callbackQuery?.message;

  if (!message?.text) {
    return null;
  }

  return {
    text: message.text,
    keyboard: stripNavigationRows(message.keyboard),
  };
}

export async function respondFromCallback(ctx, text, keyboard = null, options = {}) {
  const {
    navigation = true,
    showBack = true,
    showMainMenu = true,
    skipPush = false,
  } = options;

  if (navigation && ctx.callbackQuery && ctx.user?.id && !skipPush) {
    const frame = getCallbackFrame(ctx);

    if (frame) {
      await NavigationService.push(ctx.user.id, frame);
    }
  }

  let finalKeyboard = keyboard;

  if (navigation) {
    finalKeyboard = await buildNavigationKeyboard(ctx, keyboard, {
      showBack,
      showMainMenu,
    });
  }

  if (ctx.callbackQuery) {
    return MaxService.replyFromCallback(
      ctx.callbackQuery,
      ctx.recipient,
      text,
      finalKeyboard,
    );
  }

  return MaxService.sendMessage(ctx.recipient, text, finalKeyboard);
}

export async function sendBotMessage(ctx, text, keyboard = null, options = {}) {
  const { navigation = true, showBack = true, showMainMenu = true } = options;

  let finalKeyboard = keyboard;

  if (navigation) {
    finalKeyboard = await buildNavigationKeyboard(ctx, keyboard, {
      showBack,
      showMainMenu,
    });
  }

  return MaxService.sendMessage(ctx.recipient, text, finalKeyboard);
}

export async function handleNavigationBack(ctx) {
  const frame = await NavigationService.pop(ctx.user.id);

  if (!frame) {
    const { showMainMenu } = await import("@/bot/helpers/menu.helper");
    await showMainMenu(ctx);
    return;
  }

  await respondFromCallback(ctx, frame.text, frame.keyboard, {
    skipPush: true,
  });
}

export const NAV_NONE = { navigation: false };
export const NAV_HOME = {
  showBack: false,
  showMainMenu: false,
  skipPush: true,
};
