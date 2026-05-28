import { FSM_STATES } from "@/bot/states/user.states";
import { StateService } from "@/services/state.service";

const MAX_STACK_SIZE = 20;

export class NavigationService {
  static async getStack(userId) {
    const { payload } = await StateService.get(userId);
    return payload.navStack ?? [];
  }

  static async canGoBack(userId) {
    const stack = await this.getStack(userId);
    return stack.length > 0;
  }

  static async push(userId, frame) {
    const { state, payload } = await StateService.get(userId);
    const navStack = [...(payload.navStack ?? []), frame].slice(-MAX_STACK_SIZE);

    await StateService.set(userId, state, {
      ...payload,
      navStack,
    });
  }

  static async pop(userId) {
    const { state, payload } = await StateService.get(userId);
    const navStack = [...(payload.navStack ?? [])];
    const frame = navStack.pop() ?? null;

    await StateService.set(userId, state, {
      ...payload,
      navStack,
    });

    return frame;
  }

  static async clear(userId) {
    const { state, payload } = await StateService.get(userId);
    const { navStack, ...rest } = payload;

    if (state === FSM_STATES.IDLE && Object.keys(rest).length === 0) {
      await StateService.clear(userId);
      return;
    }

    await StateService.set(userId, state, rest);
  }
}
