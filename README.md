# Take-home replacement / real-time app

This project exists for a few practical reasons:

- A tiny todo app says nothing, a massive project asks too much of everyone.
  Grinding through take-homes is exhausting, and the math rarely works out
- Running an unknown repo on your local machine with post-install scripts is a
  risk. Dev containers and Docker help, but checking whether something escapes
  its sandbox and escalates privileges is not how I want to spend an evening
- Deno 2.8.3, Hono, Vite, React and SolidJS in a Deno monorepo -- no stable
  tutorial, no reference, no AI that can reliably scaffold it. It took real
  iteration to get working, and that's part of the point. The stack itself is
  proof of the manual work behind it

## About the code

This project is designed to replace a take-home assignment. It's also something
I can bring to an interview and talk through, which I hope only makes it better.
Some decisions are overkill, some are left rough on purpose. Why
`useSyncExternalStore` over CSS variables, and much more. If you're planning to
interview me, let's talk about it there

## Stack

- **Backend** - Deno + Hono.js, WebSocket
- **React** - `http://localhost:4000`
- **SolidJS** - `http://localhost:3000`

---

> # **⚠️ Epilepsy warning** At high speeds the grid flashes rapidly

---
> The app binds to `0.0.0.0:8000` - open `http://0.0.0.0:8000` on your host, not
> `localhost:8000`
---

### Docker

```bash
docker build -t ws-random-color-grid . && docker run --rm -p 8000:8000 ws-random-color-grid
```

### Podman

```bash
podman build -t ws-random-color-grid . && podman run --rm -p 8000:8000 ws-random-color-grid
```

---
> The app binds to `0.0.0.0:8000` - open `http://0.0.0.0:8000` on your host, not
> `localhost:8000`.
---

### Deno (2.8.3, should work on earlier 2.x)

Start the server first, then pick a client:

```bash
deno task server:dev
```

```bash
deno task react:dev   # http://localhost:4000
deno task solid:dev   # http://localhost:3000
```

## License

MIT
