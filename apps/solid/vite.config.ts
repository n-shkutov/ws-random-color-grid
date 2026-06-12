import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [devtools(), solidPlugin()],
  base: "./",
  server: {
    port: 3000,
    proxy: {
      "/ws": {
        target: "ws://localhost:8000",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@app/contracts": resolve(__dirname, "../../packages/contracts/mod.ts"),
      "@app/utils": resolve(__dirname, "../../packages/utils/mod.ts"),
      "@app/ws": resolve(__dirname, "../../packages/ws/mod.ts"),
      "@app/styles": resolve(__dirname, "../../packages/styles"),
    },
  },
});
