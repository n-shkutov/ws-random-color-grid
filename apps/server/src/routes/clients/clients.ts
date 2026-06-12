import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { html } from "hono/html";

const availablePaths = ["/", "statics/solid/", "statics/react/"];
const root = Deno.env.get("DENO_ENV") === "production" ? "./apps/server" : "./";

export const clients: Hono = new Hono()
  .use(
    "/statics/*",
    serveStatic({
      root,
    }),
  )
  .get("/", (c) =>
    c.html(html`
      <html>
        <body>
          <ul>
            ${availablePaths.map((el) =>
              html`
                <li><a href="${el}">${el}</a></li>
              `
            )}
          </ul>
        </body>
      </html>
    `));
