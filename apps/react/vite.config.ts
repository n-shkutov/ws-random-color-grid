import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  resolve: {
    alias: {
      "@app/contracts": resolve(__dirname, "../../packages/contracts/mod.ts"),
      "@app/styles": resolve(__dirname, "../../packages/styles"),
      "@app/utils": resolve(__dirname, "../../packages/utils/mod.ts"),
      "@app/ws": resolve(__dirname, "../../packages/ws/mod.ts"),
    },
  },
  server: {
    port: 4000,
    proxy: {
      "/ws": {
        target: "ws://localhost:8000",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
