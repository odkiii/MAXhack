export const MEDIA_ATTACHMENT_TYPES = new Set(["image", "file", "video"]);

export function extractMediaAttachments(message) {
  const attachments = message?.body?.attachments ?? message?.attachments ?? [];

  if (!Array.isArray(attachments)) {
    return [];
  }

  return attachments.filter(
    (item) =>
      item?.type &&
      item.type !== "inline_keyboard" &&
      MEDIA_ATTACHMENT_TYPES.has(item.type) &&
      item.payload,
  );
}

export function pickIncomingMedia(attachments) {
  if (!Array.isArray(attachments) || !attachments.length) {
    return null;
  }

  const item = attachments.find((entry) => MEDIA_ATTACHMENT_TYPES.has(entry.type));

  if (!item) {
    return null;
  }

  return normalizeIncomingMedia(item);
}

export function normalizeIncomingMedia(attachment) {
  if (!attachment?.type || !attachment.payload) {
    return null;
  }

  if (!MEDIA_ATTACHMENT_TYPES.has(attachment.type)) {
    return null;
  }

  const token = attachment.payload.token ?? null;
  const url = attachment.payload.url ?? null;

  if (!token && !url) {
    return null;
  }

  return {
    type: attachment.type,
    token,
    url,
  };
}

export function toMaxOutgoingAttachment(stored) {
  if (!stored?.type) {
    return null;
  }

  if (stored.token) {
    return {
      type: stored.type,
      payload: { token: stored.token },
    };
  }

  if (stored.type === "image" && stored.url) {
    return {
      type: stored.type,
      payload: { url: stored.url },
    };
  }

  return null;
}

export function formatStoredAttachmentLabel(stored) {
  if (!stored?.type) {
    return null;
  }

  if (stored.type === "image") {
    return "📎 Есть скриншот — кнопка «Смотреть скриншот»";
  }

  if (stored.type === "file") {
    return "📎 Есть файл — кнопка «Смотреть файл»";
  }

  if (stored.type === "video") {
    return "📎 Есть видео — кнопка «Смотреть видео»";
  }

  return "📎 Есть вложение";
}

export function getAttachmentViewButtonLabel(stored) {
  if (!stored?.type) {
    return "📎 Смотреть вложение";
  }

  if (stored.type === "image") {
    return "🖼 Смотреть скриншот";
  }

  if (stored.type === "file") {
    return "📎 Смотреть файл";
  }

  if (stored.type === "video") {
    return "🎬 Смотреть видео";
  }

  return "📎 Смотреть вложение";
}

export function hasStoredAttachment(stored) {
  return Boolean(toMaxOutgoingAttachment(stored));
}
