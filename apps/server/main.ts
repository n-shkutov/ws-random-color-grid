import { Hono } from "hono";
import { wsRoute } from "./src/routes/ws/wsRoute.ts";
import { clients } from "./src/routes/clients/clients.ts";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());
app.route("/ws", wsRoute);
app.route("/", clients);

Deno.serve({
  port: parseInt(Deno.env.get("PORT") ?? "8000"),
  hostname: "0.0.0.0",
}, app.fetch);
