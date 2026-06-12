import { createWSClient } from "@app/ws";
import { dataEmitter } from "./dataEmitter";
import { env } from "@app/utils";

export const wsClient = createWSClient(env.VITE_WS_URL);

wsClient.on("message", ({ index, color }) => dataEmitter.emit(index, color));
