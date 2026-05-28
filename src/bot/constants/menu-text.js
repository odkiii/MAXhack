import { ROLES } from "@/bot/constants/roles";

export const MENU_TEXT = {
  START: "🏠 Главное меню",
  CREATE_TICKET: "Создать обращение",
  MY_TICKETS: "Мои обращения",
  HELP: "Помощь",
  DELETE_DATA: "Удаление данных",
  QUEUE: "Очередь (новые)",
  ACTIVE: "Активные тикеты",
  CLOSED: "Закрытые тикеты",
  DIAG: "Диагностика",
};

const STUDENT_ACTIONS = new Map([
  [MENU_TEXT.START, "main_menu"],
  [MENU_TEXT.CREATE_TICKET, "create_ticket"],
  [MENU_TEXT.MY_TICKETS, "my_tickets"],
  [MENU_TEXT.HELP, "help"],
  [MENU_TEXT.DELETE_DATA, "delete_data"],
]);

const TEACHER_ACTIONS = new Map([
  [MENU_TEXT.START, "main_menu"],
  [MENU_TEXT.QUEUE, "t_queue"],
  [MENU_TEXT.ACTIVE, "t_active"],
  [MENU_TEXT.CLOSED, "t_closed"],
  [MENU_TEXT.DIAG, "t_diag"],
  [MENU_TEXT.HELP, "help"],
]);

export function resolveMenuTextAction(text, role) {
  const normalized = (text ?? "").trim();

  if (!normalized) {
    return null;
  }

  if (normalized === "/start" || normalized.startsWith("/start@")) {
    return "start";
  }

  if (role === ROLES.TEACHER) {
    return TEACHER_ACTIONS.get(normalized) ?? null;
  }

  return STUDENT_ACTIONS.get(normalized) ?? null;
}
