# Take-home replacement / real-time app

Deno + Hono + WebSocket + React | SolidJS

https://github.com/user-attachments/assets/a70f4a67-18e8-457d-bd1b-934255d386a1

---

### Why this approach

Any pre-interview test is essentially a "lazy filter" used for candidate
screening. If the process involved only a handful of tasks, such as five at
most, and offered a reasonable chance of success, such assignments could be
justified as a method of verifying qualifications. However, when the number of
required assignments becomes excessive or the time allotted is too short, it
puts job seekers at a disadvantage. When combined with the multiple stages of
the standard interview process, this creates an overwhelming stress factor.
Therefore, I created this application because its diverse range of features
should be sufficient to bypass the take-home assignment stage entirely

### Security

Scams targeting job seekers are on the rise. Running an unknown repo on your
local machine with post-install scripts is a risk. Docker helps, but checking
whether something escapes its sandbox and escalates privileges is not how I want
to spend an evening

### Uniqueness

As of June 2026, this project has no direct counterparts. It features Deno 2.x,
Hono, Vite, React, and SolidJS within a Deno monorepo, yet there are no stable
tutorials, no references, and no AI capable of generating it in a single shot.
The complexity of the stack itself serves as proof of the manual effort required
to build it

### What's Next?

This is a technical showcase project. Sure, it works, you can run it locally or
deploy it on Railway. But the real point is that this code is built for
interviews: I want you to dive into different sections and ask, "Why did you
choose this approach?" Basically, I designed it as something that would help me
get hired by your team, but feel free to use it as an example for other people's
technical deep dives too

---

> [!WARNING] **Seizure/Epilepsy Trigger Warning** Please be aware that the grid
> pattern flashes rapidly at high speeds. Individuals sensitive to flashing
> lights should operate the speed slider at a low setting

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
