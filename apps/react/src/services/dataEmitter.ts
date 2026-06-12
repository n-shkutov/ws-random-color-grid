import type { Color, Listener } from "../shared/types";

const createDataEmitter = () => {
  const listeners = new Map<number, Set<Listener>>();

  const emit = (index: number, color: Color) => {
    listeners.get(index)?.forEach((fn) => fn(color));
  };

  const subscribe = (index: number, fn: Listener) => {
    if (!listeners.has(index)) {
      listeners.set(index, new Set<Listener>());
    }
    listeners.get(index)?.add(fn);

    return () => {
      listeners.get(index)?.delete(fn);
    };
  };

  return {
    emit,
    subscribe,
  };
};

export const dataEmitter = createDataEmitter();
