# Take-home replacement / real-time app

Deno + Hono + WebSocket + React | SolidJS


https://github.com/user-attachments/assets/a70f4a67-18e8-457d-bd1b-934255d386a1


---

This project exists for a few practical reasons:

- A tiny todo app says nothing, a massive project asks too much of everyone.
  Grinding through take-homes is exhausting, and the math rarely works out
- Running an unknown repo on your local machine with post-install scripts is a
  risk. Docker helps, but checking whether something escapes its sandbox and
  escalates privileges is not how I want to spend an evening
- Deno 2.x, Hono, Vite, React and SolidJS in a Deno monorepo — no stable
  tutorial, no reference, no AI that can one-shot it. The stack itself is proof
  of the manual work behind it

---

## About the code

Think of this as my universal take-home — something I can bring to an interview
and talk through. Some decisions are overkill, some are left rough on purpose.
Why `useSyncExternalStore` over CSS variables, and much more. If you're planning
to interview me, let's talk about it there.

---

> [!WARNING]
> **Epilepsy warning.** At high speeds the grid flashes rapidly. If you are
> sensitive to flashing lights, keep the speed slider low or use the stop
> button. Take care of yourself.

---

## Stack

|               |                            |
| ------------- | -------------------------- |
| Backend       | Deno + Hono.js + WebSocket |
| React         | `http://localhost:4000`    |
| SolidJS       | `http://localhost:3000`    |
| Docker/Podman | `http://0.0.0.0:8000`      |

---

## Running

### Docker

```bash
docker build -t ws-random-color-grid . && docker run --rm -p 8000:8000 ws-random-color-grid
```

### Podman

```bash
podman build -t ws-random-color-grid . && podman run --rm -p 8000:8000 ws-random-color-grid
```

> Opens at `http://0.0.0.0:8000`, not `localhost:8000`

### Deno (2.8.3, should work on earlier 2.x)

```bash
deno task server:dev
```

```bash
deno task react:dev   # :4000
deno task solid:dev   # :3000
```

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calm-calm?referralCode=0lQmAz&utm_medium=integration&utm_source=template&utm_campaign=generic)
