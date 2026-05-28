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

function extractRecipientFromMessage(message) {
  const recipient = message?.recipient ?? {};
  const sender = message?.sender;
  const chatType = recipient.chat_type ?? "dialog";

  let userId = recipient.user_id ?? null;

  if (chatType === "dialog" && sender && !sender.is_bot) {
    userId = sender.user_id;
  }

  return {
    chatId: recipient.chat_id ?? null,
    chatType,
    userId,
  };
}

function extractRecipientFromCallback(raw, callback) {
  const from = mapMaxUser(callback?.user);
  const messageRecipient = raw.message
    ? extractRecipientFromMessage(raw.message)
    : null;

  return {
    chatId: messageRecipient?.chatId ?? raw.chat_id ?? null,
    chatType: messageRecipient?.chatType ?? "dialog",
    userId: from?.id ?? messageRecipient?.userId ?? null,
  };
}

function extractText(message) {
  return (message?.body?.text ?? "").trim();
}

export function normalizeUpdate(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  if (raw.message?.from?.id != null && raw.message?.text !== undefined) {
    return raw;
  }

  if (raw.callback_query?.from?.id != null && raw.callback_query?.data !== undefined) {
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

  console.log("[MAX] unsupported update_type:", updateType);
  return null;
}

export function extractReplyRecipient(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  if (raw.update_type === "message_callback" && raw.callback?.user) {
    return extractRecipientFromCallback(raw, raw.callback);
  }

  if (raw.message) {
    return extractRecipientFromMessage(raw.message);
  }

  if (raw.user?.user_id != null) {
    return {
      chatId: raw.chat_id ?? null,
      chatType: "dialog",
      userId: raw.user.user_id,
    };
  }

  return null;
}

function normalizeMessageCreated(raw) {
  const message = raw.message;

  if (!message) {
    return null;
  }

  const sender = mapMaxUser(message.sender);
  const recipient = extractRecipientFromMessage(message);
  const text = extractText(message);
  const from =
    sender ??
    (recipient.userId != null ? { id: recipient.userId } : null);

  if (!from) {
    console.warn("[MAX] message_created without sender/user_id");
    return null;
  }

  return {
    update_type: raw.update_type,
    message: {
      text,
      from,
      chat: { id: recipient.chatId ?? recipient.userId },
      _maxRecipient: recipient,
    },
  };
}

function normalizeMessageCallback(raw) {
  const callback = raw.callback;

  if (!callback) {
    return null;
  }

  const from = mapMaxUser(callback.user);

  if (!from) {
    console.warn("[MAX] message_callback without callback.user");
    return null;
  }

  const recipient = extractRecipientFromCallback(raw, callback);

  return {
    update_type: raw.update_type,
    callback_query: {
      id: callback.callback_id,
      data: callback.payload ?? "",
      from,
      message: {
        chat: { id: recipient.chatId ?? recipient.userId },
        messageId:
          raw.message?.body?.mid ??
          raw.message?.body?.message_id ??
          null,
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
    console.warn("[MAX] bot_started without user");
    return null;
  }

  const recipient = {
    chatId: raw.chat_id ?? null,
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

  return (
    fromMessage ??
    fromCallback ??
    (ctx.recipient
      ? ctx.recipient
      : buildRecipientFromChatId(ctx.chatId))
  );
}

function buildRecipientFromChatId(chatId) {
  if (chatId == null) {
    return { chatId: null, chatType: "dialog", userId: null };
  }

  return {
    chatId: null,
    chatType: "dialog",
    userId: chatId,
  };
}

export function isStartCommand(text) {
  const trimmed = (text ?? "").trim();
  const first = trimmed.split(/\s+/)[0] ?? "";
  return first === "/start" || first.startsWith("/start@");
}
