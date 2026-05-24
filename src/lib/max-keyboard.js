/**
 * Converts internal keyboard shape (Telegram-like) to MAX inline_keyboard attachment.
 */
export function toMaxInlineKeyboard(keyboard) {
  if (!keyboard?.inline_keyboard?.length) {
    return null;
  }

  const buttons = keyboard.inline_keyboard.map((row) =>
    row.map((button) => ({
      type: "callback",
      text: button.text,
      payload: button.callback_data ?? button.payload,
    })),
  );

  return {
    type: "inline_keyboard",
    payload: { buttons },
  };
}

export function toMaxAttachments(keyboard) {
  const attachment = toMaxInlineKeyboard(keyboard);

  return attachment ? [attachment] : null;
}
