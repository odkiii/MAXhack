const DEFAULT_API_URL = "https://platform-api.max.ru";

function getApiUrl() {
  return (process.env.MAX_API_URL || DEFAULT_API_URL).replace(/\/$/, "");
}

function getToken() {
  return (process.env.MAX_BOT_TOKEN || "").trim();
}

function useBearer() {
  const value = (process.env.MAX_USE_BEARER || "").toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

export function getAuthorizationHeader() {
  const token = getToken();

  if (!token) {
    throw new Error("MAX_BOT_TOKEN is not set");
  }

  if (useBearer() && !token.toLowerCase().startsWith("bearer ")) {
    return `Bearer ${token}`;
  }

  return token;
}

function coerceApiId(id) {
  if (id == null) {
    return null;
  }

  const num = Number(id);

  if (Number.isFinite(num) && String(num) === String(id).trim()) {
    return num;
  }

  return id;
}

export async function maxApiRequest(path, options = {}) {
  const { method = "GET", params, body } = options;
  const url = new URL(`${getApiUrl()}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: getAuthorizationHeader(),
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!response.ok) {
    const error = new Error(
      `MAX API ${method} ${path} failed: ${response.status}`,
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function getMe() {
  return maxApiRequest("/me");
}

export async function getSubscriptions() {
  return maxApiRequest("/subscriptions");
}

export async function setSubscription({ url, secret, updateTypes }) {
  const payload = {
    url,
    update_types: updateTypes ?? [
      "message_created",
      "message_callback",
      "bot_started",
    ],
  };

  if (secret) {
    payload.secret = secret;
  }

  return maxApiRequest("/subscriptions", {
    method: "POST",
    body: payload,
  });
}

export async function deleteSubscription(url) {
  return maxApiRequest("/subscriptions", {
    method: "DELETE",
    params: { url },
  });
}

export async function getUpdates({ marker, limit = 50, timeout = 25 } = {}) {
  return maxApiRequest("/updates", {
    params: {
      limit,
      timeout,
      ...(marker !== undefined ? { marker } : {}),
    },
  });
}

export async function sendMessage(recipient, text, attachments = null) {
  const params = buildMessageQueryParams(recipient);
  const body = { text: text ?? "" };

  if (attachments?.length) {
    body.attachments = attachments;
  }

  return maxApiRequest("/messages", {
    method: "POST",
    params,
    body,
  });
}

export async function answerCallback(callbackId, { notification, message } = {}) {
  const body = {};

  if (notification) {
    body.notification = notification;
  }

  if (message) {
    body.message = message;
  }

  if (!body.notification && !body.message) {
    body.notification = "OK";
  }

  return maxApiRequest("/answers", {
    method: "POST",
    params: { callback_id: callbackId },
    body,
  });
}

export function buildMessageQueryParams(recipient) {
  const chatType = (recipient?.chatType ?? "dialog").toLowerCase();

  if (chatType === "chat" || chatType === "channel") {
    if (recipient?.chatId != null) {
      return { chat_id: coerceApiId(recipient.chatId) };
    }
  }

  if (recipient?.userId != null) {
    return { user_id: coerceApiId(recipient.userId) };
  }

  if (recipient?.chatId != null) {
    return { chat_id: coerceApiId(recipient.chatId) };
  }

  throw new Error("Cannot send message: missing userId and chatId");
}
