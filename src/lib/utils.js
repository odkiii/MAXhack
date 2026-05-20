export function extractDisplayName(from) {
  if (!from) {
    return null;
  }

  const parts = [from.first_name, from.last_name].filter(Boolean);

  if (parts.length > 0) {
    return parts.join(" ");
  }

  return from.username ?? null;
}

export function getChatIdFromMessage(message) {
  return message?.chat?.id ?? null;
}

export function getChatIdFromCallback(callbackQuery) {
  return (
    callbackQuery?.message?.chat?.id ??
    callbackQuery?.chat?.id ??
    null
  );
}
