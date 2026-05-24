function mapMaxUser(user) {
  if (!user || user.user_id == null) {
    return null;
  }

  return {
    id: user.user_id,
    first_name: user.first_name ?? user.name ?? null,
    last_name: user.last_name ?? null,
    username: user.username ?? null,
  };
}

function extractRecipient(message) {
  const recipient = message?.recipient ?? {};

  return {
    chatId: recipient.chat_id ?? null,
    chatType: recipient.chat_type ?? "dialog",
    userId:
      recipient.user_id ??
      (recipient.chat_type === "dialog" ? message?.sender?.user_id : null) ??
      null,
  };
}

function extractText(message) {
  return (message?.body?.text ?? "").trim();
}

export function normalizeUpdate(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  if (raw.message || raw.callback_query) {
    return raw;
  }

  const updateType = raw.update_type;

  if (updateType === "message_created") {
    return normalizeMessageCreated(raw);
  }

  if (updateType === "message_callback") {
    return normalizeMessageCallback(raw);
  }

  if (updateType === "bot_started") {
    return normalizeBotStarted(raw);
  }

  return null;
}

function normalizeMessageCreated(raw) {
  const message = raw.message;

  if (!message) {
    return null;
  }

  const sender = mapMaxUser(message.sender);
  const recipient = extractRecipient(message);
  const text = extractText(message);

  return {
    update_type: raw.update_type,
    message: {
      text,
      from: sender,
      chat: { id: recipient.chatId ?? recipient.userId },
      _maxRecipient: recipient,
    },
  };
}

function normalizeMessageCallback(raw) {
  const callback = raw.callback;
  const message = raw.message;

  if (!callback) {
    return null;
  }

  const from = mapMaxUser(callback.user);
  const recipient = message ? extractRecipient(message) : {
    chatId: raw.chat_id ?? null,
    chatType: "dialog",
    userId: from?.id ?? null,
  };

  return {
    update_type: raw.update_type,
    callback_query: {
      id: callback.callback_id,
      data: callback.payload ?? "",
      from,
      message: message
        ? {
            chat: { id: recipient.chatId ?? recipient.userId },
            _maxRecipient: recipient,
          }
        : {
            chat: { id: recipient.chatId ?? recipient.userId },
            _maxRecipient: recipient,
          },
    },
  };
}

function normalizeBotStarted(raw) {
  const user =
    mapMaxUser(raw.user) ??
    mapMaxUser(raw.message?.sender) ??
    mapMaxUser(raw.callback?.user);

  if (!user) {
    return null;
  }

  const recipient = raw.message
    ? extractRecipient(raw.message)
    : {
        chatId: raw.chat_id ?? user.id,
        chatType: "dialog",
        userId: user.id,
      };

  return {
    update_type: raw.update_type,
    message: {
      text: "/start",
      from: user,
      chat: { id: recipient.chatId ?? recipient.userId },
      _maxRecipient: recipient,
    },
  };
}

export function getRecipientFromContext(ctx) {
  const fromMessage = ctx.message?._maxRecipient;
  const fromCallback = ctx.callbackQuery?.message?._maxRecipient;

  return fromMessage ?? fromCallback ?? buildRecipientFromChatId(ctx.chatId);
}

function buildRecipientFromChatId(chatId) {
  if (chatId == null) {
    return { chatId: null, chatType: "dialog", userId: null };
  }

  return {
    chatId,
    chatType: "dialog",
    userId: chatId,
  };
}
