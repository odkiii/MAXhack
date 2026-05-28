/**
 * Converts internal keyboard shape (Telegram-like) to MAX inline_keyboard attachment.
 */
export function toMaxInlineKeyboard(keyboard) {
  const rows = keyboard?.inline_keyboard;

  if (!rows?.length) {
    return null;
  }

  const buttons = rows.map((row) =>
    row.map((button) => {
      if (button.type === "message") {
        return {
          type: "message",
          text: button.text,
        };
      }

      return {
        type: "callback",
        text: button.text,
        payload: button.callback_data ?? button.payload,
      };
    }),
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
