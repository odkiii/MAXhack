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

export function fromMaxAttachments(attachments) {
  if (!Array.isArray(attachments)) {
    return null;
  }

  const inline = attachments.find((item) => item.type === "inline_keyboard");
  const buttons = inline?.payload?.buttons;

  if (!buttons?.length) {
    return null;
  }

  return {
    inline_keyboard: buttons.map((row) =>
      row.map((button) => {
        if (button.type === "message") {
          return {
            text: button.text,
            type: "message",
          };
        }

        return {
          text: button.text,
          callback_data: button.payload ?? button.callback_data ?? "",
        };
      }),
    ),
  };
}
