FROM denoland/deno:2.8.3 AS builder

ENV DENO_DIR=/deno-dir
WORKDIR /app

COPY deno.json deno.lock ./
COPY packages ./packages
COPY apps/react/package.json ./apps/react/package.json
COPY apps/solid/package.json ./apps/solid/package.json
COPY apps/server/deno.json ./apps/server/deno.json

RUN deno install --frozen

COPY apps/server ./apps/server
RUN deno cache apps/server/main.ts

COPY apps/react ./apps/react
COPY apps/solid ./apps/solid
RUN cd apps/react && deno task build && cd /app/apps/solid && deno task build

FROM denoland/deno:2.8.3

ENV DENO_DIR=/deno-dir
ENV DENO_ENV=production
WORKDIR /app

COPY deno.json deno.lock ./
COPY packages ./packages
COPY apps/server ./apps/server

COPY --from=builder $DENO_DIR $DENO_DIR

COPY --from=builder /app/apps/react/dist ./apps/server/statics/react
COPY --from=builder /app/apps/solid/dist ./apps/server/statics/solid

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
    CMD curl -f http://localhost:8000/ || exit 1

CMD ["deno", "run", "--allow-net", "--allow-read=/app/apps/server/statics", "--allow-env", "apps/server/main.ts"]