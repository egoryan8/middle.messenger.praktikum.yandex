export class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {};

  on(evt: string, cb: () => void) {
    if (!this.listeners[evt]) {
      this.listeners[evt] = [];
    }

    this.listeners[evt].push(cb);
  }

  off(evt: string, cb: () => void) {
    if (!this.listeners[evt]) {
      throw new Error(`Нет такого события (${evt})`);
    }

    this.listeners[evt] = this.listeners[evt].filter((listener) => listener !== cb);
  }

  emit(evt: string, ...args: any[]) {
    if (!this.listeners[evt]) {
      return;
    }

    this.listeners[evt].forEach((listener) => {
      // @ts-ignore
      listener(...args);
    });
  }
}
