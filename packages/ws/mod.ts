import {
  type Command,
  ServerMessageSchema,
  type Settings,
  type WSClientAPI,
  type WSEventMap,
} from "@app/contracts";
import { getNextDelay } from "@app/utils";

type WSEventMapKeys = keyof WSEventMap;

const PING_INTERVAL_MS = 15_000;
const PONG_TIMEOUT_MS = 5_000;

export function createWSClient(url: string): WSClientAPI {
  let ws: WebSocket | null = null;
  let reconnectAttempts = 0;
  let explicitClose = false;

  let pingIntervalId: ReturnType<typeof setInterval> | null = null;
  let pongTimeoutId: ReturnType<typeof setTimeout> | null = null;

  const listeners = new Map<WSEventMapKeys, Set<(payload: any) => void>>();

  function on<K extends WSEventMapKeys>(
    event: K,
    handler: (payload: WSEventMap[K]) => void,
  ) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)!.add(handler);
  }

  function off<K extends WSEventMapKeys>(
    event: K,
    handler: (payload: WSEventMap[K]) => void,
  ) {
    listeners.get(event)?.delete(handler);
  }

  function emit<K extends WSEventMapKeys>(
    event: K,
    payload: WSEventMap[K],
  ) {
    listeners.get(event)?.forEach((h) => h(payload));
  }

  function connect() {
    if (ws && ws.readyState !== WebSocket.CLOSED) return;

    ws = new WebSocket(url);
    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onerror = handleError;
    ws.onclose = handleClose;
  }

  function disconnect() {
    explicitClose = true;
    stopPing();
    ws?.close();
    ws = null;
  }

  function scheduleReconnect() {
    const delay = getNextDelay(reconnectAttempts);
    console.log(
      `Connection lost. Reconnecting in ${delay}ms (attempt ${
        reconnectAttempts + 1
      }).`,
    );
    reconnectAttempts++;
    setTimeout(connect, delay);
  }

  function handleOpen() {
    console.log(reconnectAttempts > 0 ? "Reconnected." : "Connected.");
    const reconnect = reconnectAttempts > 0;
    reconnectAttempts = 0;
    explicitClose = false;
    startPing();
    emit("connect", { reconnect });
  }

  function handleMessage({ data }: MessageEvent): void {
    let msg: ReturnType<typeof ServerMessageSchema.parse>;

    try {
      msg = ServerMessageSchema.parse(JSON.parse(data));
    } catch {
      console.error("Received malformed message:", data);
      return;
    }

    switch (msg.type) {
      case "cell-data":
        emit("message", msg.payload);
        break;

      case "pong":
        clearPongTimeout();
        break;

      default:
        console.warn("Unhandled message type:", (msg as { type: string }).type);
    }
  }

  function handleError(event: Event): void {
    console.warn("WebSocket error:", event);
    emit("error", { event });
  }

  function handleClose(): void {
    stopPing();
    emit("disconnect", { explicit: explicitClose });

    if (explicitClose) {
      console.log("Connection closed by client.");
    } else {
      scheduleReconnect();
    }
  }

  function startPing() {
    pingIntervalId = setInterval(() => {
      if (ws?.readyState !== WebSocket.OPEN) return;
      send({ type: "ping" });
      schedulePongTimeout();
    }, PING_INTERVAL_MS);
  }

  function stopPing() {
    if (pingIntervalId !== null) {
      clearInterval(pingIntervalId);
      pingIntervalId = null;
    }
    clearPongTimeout();
  }

  function schedulePongTimeout() {
    pongTimeoutId = setTimeout(() => {
      console.warn("Pong timeout — closing stale connection.");
      ws?.close();
    }, PONG_TIMEOUT_MS);
  }

  function clearPongTimeout() {
    if (pongTimeoutId !== null) {
      clearTimeout(pongTimeoutId);
      pongTimeoutId = null;
    }
  }

  function send(command: Command) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(command));
    } else {
      console.warn("Cannot send — socket is not open.");
    }
  }

  return {
    on,
    off,
    connect,
    disconnect,
    start: (payload: Settings) => send({ type: "start", payload }),
    stop: () => send({ type: "stop" }),
    updateSettings: (payload: Settings) => send({ type: "settings", payload }),
  };
}
