import { Hono } from "hono";
import { upgradeWebSocket } from "hono/deno";
import { WSContext } from "hono/ws";
import { randomColorHsl } from "../../utils/randomColorHsl.ts";
import { z } from "zod";
import {
  type Command,
  CommandSchema,
  type ServerMessage,
  type Settings,
} from "@app/contracts";

export const wsRoute = new Hono().get(
  "/",
  upgradeWebSocket(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let settings: Settings = { speed: 1, amount: 4 };

    const stopStreaming = () => {
      clearInterval(intervalId ?? undefined);
      intervalId = null;
    };

    const startStreaming = (ws: WSContext<WebSocket>) => {
      stopStreaming();

      intervalId = setInterval(() => {
        const payload: ServerMessage = {
          type: "cell-data",
          payload: {
            color: randomColorHsl(),
            index: Math.floor(Math.random() * settings.amount),
          },
        };

        ws.send(JSON.stringify(payload));
      }, 1000 / settings.speed);
    };

    return {
      onOpen() {
        console.log("Connection opened.");
      },

      onMessage(event, ws) {
        if (typeof event.data !== "string") {
          console.warn("Unexpected non-string message");
          return;
        }

        const result = CommandSchema.safeParse(JSON.parse(event.data));

        if (!result.success) {
          const tree = z.treeifyError(result.error);
          console.warn("Invalid command:", tree);
          return;
        }

        const cmd = result.data;

        switch (cmd.type) {
          case "start":
            settings = {
              ...settings,
              ...cmd.payload,
            };
            startStreaming(ws);
            break;

          case "stop":
            stopStreaming();
            break;

          case "settings":
            settings = {
              ...settings,
              ...cmd.payload,
            };
            if (intervalId !== null) startStreaming(ws);
            break;
          case "ping": {
            const payload: Command = { type: "pong" };

            ws.send(JSON.stringify(payload));
            break;
          }
        }
      },

      onClose() {
        stopStreaming();
        console.log("Connection closed.");
      },
    };
  }),
);
