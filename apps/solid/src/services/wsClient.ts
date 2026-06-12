import { createWSClient } from "@app/ws";
import { setOnline } from "../store/online";
import { emmitCellData } from "../store/cells";
import { env } from "@app/utils";

export const wsClient = createWSClient(env.VITE_WS_URL);

wsClient.on("message", ({ index, color }) => {
  emmitCellData(index, color);
});

wsClient.on("connect", () => {
  setOnline(true);
});

wsClient.on("disconnect", () => {
  setOnline(false);
});
