import { prisma } from "@/lib/prisma";
import { FSM_STATES } from "@/bot/states/ticketCreation.states";

export class StateService {
  static async get(userId) {
    const record = await prisma.userState.findUnique({
      where: { userId },
    });

    if (!record) {
      return {
        state: FSM_STATES.IDLE,
        payload: {},
      };
    }

    return {
      state: record.state,
      payload: record.payload ?? {},
    };
  }

  static async set(userId, state, payload = {}) {
    return prisma.userState.upsert({
      where: { userId },
      create: {
        userId,
        state,
        payload,
      },
      update: {
        state,
        payload,
      },
    });
  }

  static async clear(userId) {
    await prisma.userState.deleteMany({
      where: { userId },
    });
  }
}
