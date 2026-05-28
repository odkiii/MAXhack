import { prisma } from "@/lib/prisma";
import { FSM_STATES } from "@/bot/states/user.states";

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
    const record = await prisma.userState.findUnique({
      where: { userId },
    });
    const existingNavStack = record?.payload?.navStack;
    const mergedPayload =
      existingNavStack !== undefined && payload.navStack === undefined
        ? { ...payload, navStack: existingNavStack }
        : payload;

    return prisma.userState.upsert({
      where: { userId },
      create: {
        userId,
        state,
        payload: mergedPayload,
      },
      update: {
        state,
        payload: mergedPayload,
      },
    });
  }

  static async clear(userId) {
    await prisma.userState.deleteMany({
      where: { userId },
    });
  }
}
