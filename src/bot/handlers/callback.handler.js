import { ConsentService } from "@/services/consent.service";
import { StateService } from "@/services/state.service";
import { TicketService } from "@/services/ticket.service";
import { UserService } from "@/services/user.service";
import { MaxService } from "@/services/max.service";
import { FSM_STATES } from "@/bot/states/ticketCreation.states";
import { ROLES } from "@/bot/constants/roles";
import {
  getTeacherByKey,
  TICKET_CATEGORIES,
  CATEGORY_LABELS,
} from "@/bot/constants/categories";
import { getStudentMenuKeyboard } from "@/bot/keyboards/menu.keyboard";
import {
  getTeacherSelectionKeyboard,
  getCategoriesKeyboard,
} from "@/bot/keyboards/ticket.keyboard";

function buildTicketSummary(payload) {
  const teacher = getTeacherByKey(payload.teacherKey);
  const categoryLabel = CATEGORY_LABELS[payload.category] ?? payload.category;

  return `Проверьте данные тикета:

Преподаватель: ${teacher?.displayName ?? "—"}
Категория: ${categoryLabel}
Описание: ${payload.description ?? "—"}

Подтвердите создание тикета или отмените.`;
}

async function showMainMenu(chatId, displayName) {
  await MaxService.sendMessage(
    chatId,
    `Главное меню. Здравствуйте, ${displayName ?? "студент"}!`,
    getStudentMenuKeyboard(),
  );
}

export async function callbackHandler(ctx) {
  const { user, chatId, data } = ctx;

  if (data === "accept_consent") {
    await ConsentService.accept(user.id);
    await StateService.clear(user.id);
    await showMainMenu(chatId, user.displayName);
    return;
  }

  if (data === "create_ticket") {
    await StateService.set(user.id, FSM_STATES.WAITING_TEACHER, {});
    await MaxService.sendMessage(
      chatId,
      "Выберите преподавателя для консультации:",
      getTeacherSelectionKeyboard(),
    );
    return;
  }

  if (data.startsWith("teacher_")) {
    const teacherMeta = getTeacherByKey(data);

    if (!teacherMeta) {
      await MaxService.sendMessage(chatId, "Преподаватель не найден.");
      return;
    }

    const teacher = await UserService.findOrCreate(
      { id: teacherMeta.maxUserId, first_name: teacherMeta.displayName },
      ROLES.TEACHER,
    );

    await StateService.set(user.id, FSM_STATES.WAITING_CATEGORY, {
      teacherKey: data,
      teacherId: teacher.id,
    });

    await MaxService.sendMessage(
      chatId,
      "Выберите категорию обращения:",
      getCategoriesKeyboard(),
    );
    return;
  }

  if (data.startsWith("category_")) {
    const category = data.replace("category_", "");

    if (!Object.values(TICKET_CATEGORIES).includes(category)) {
      await MaxService.sendMessage(chatId, "Некорректная категория.");
      return;
    }

    const { payload } = await StateService.get(user.id);

    await StateService.set(user.id, FSM_STATES.WAITING_DESCRIPTION, {
      ...payload,
      category,
    });

    await MaxService.sendMessage(
      chatId,
      "Опишите ваш вопрос одним сообщением:",
    );
    return;
  }

  if (data === "confirm_ticket") {
    const { state, payload } = await StateService.get(user.id);

    if (state !== FSM_STATES.WAITING_CONFIRMATION) {
      await MaxService.sendMessage(chatId, "Нет активного тикета для подтверждения.");
      return;
    }

    if (!payload.teacherId || !payload.category || !payload.description) {
      await MaxService.sendMessage(
        chatId,
        "Не хватает данных для создания тикета. Начните заново через /start.",
      );
      await StateService.clear(user.id);
      return;
    }

    const ticket = await TicketService.create({
      studentId: user.id,
      teacherId: payload.teacherId,
      category: payload.category,
      description: payload.description,
    });

    await StateService.clear(user.id);

    const teacher = getTeacherByKey(payload.teacherKey);

    await MaxService.sendMessage(
      chatId,
      `Тикет #${ticket.ticketNumber} создан.

Преподаватель: ${teacher?.displayName ?? "—"}
Категория: ${CATEGORY_LABELS[payload.category]}
Статус: ${ticket.status}

Ожидайте ответа преподавателя.`,
      getStudentMenuKeyboard(),
    );
    return;
  }

  if (data === "cancel_ticket") {
    await StateService.clear(user.id);
    await MaxService.sendMessage(chatId, "Создание тикета отменено.");
    await showMainMenu(chatId, user.displayName);
    return;
  }

  await MaxService.sendMessage(chatId, "Неизвестное действие. Используйте /start.");
}
