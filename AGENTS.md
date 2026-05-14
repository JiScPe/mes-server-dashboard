# AGENTS.md — MES Server Dashboard

This file provides guidance for AI agents (Claude, Copilot, Cursor, etc.) working on this codebase. Read this before making any changes.

---

## Project Overview

**MES Server Dashboard** is a Next.js 16 full-stack web application for monitoring and managing Manufacturing Execution System (MES) servers. It provides real-time service health tracking, SSH-based remote command execution, Nginx upstream monitoring, and Samsung Somos quality data management.

---

## Repository Layout

```
.
├── app/                          # Next.js App Router (all pages & API routes)
│   ├── (samsung_somos)/          # Samsung Somos module pages (quality data)
│   ├── (server)/                 # Server status pages (PRD / QAS environments)
│   ├── api/                      # API route handlers
│   │   ├── auth/                 # NextAuth.js endpoints
│   │   ├── samsung-somos/        # Samsung quality data endpoints
│   │   └── *.ts                  # check-status, nginx, restart, etc.
│   ├── generated/prisma/         # Auto-generated Prisma client (do not edit)
│   ├── login/                    # Login page
│   └── page.tsx                  # Home / dashboard entry point
├── components/                   # Shared React components
│   ├── ui/                       # Radix UI primitives wrappers
│   ├── Navbar/                   # Navigation bar
│   ├── servers/                  # Server card and status components
│   ├── samsung-somos/            # Data table components (TanStack Table)
│   └── terminal/                 # xterm.js WebSocket terminal
├── lib/
│   ├── utils/                    # Server status logic, SSH command helpers
│   │   └── server-list.ts        # MES server registry (IPs, services, SSH creds)
│   └── helpers/                  # String utilities, data grouping
├── server/ws/                    # Standalone WebSocket SSH server (ws + ssh2)
├── prisma/                       # Prisma schema and migrations
├── public/                       # Static assets
└── dist/                         # Compiled WebSocket server output (do not edit)
```

> **Key rule:** `app/generated/prisma/` and `dist/` are generated artifacts. Never edit them directly — regenerate via `npx prisma generate` and `npm run build` respectively.

---

## Tech Stack Quick Reference

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4 |
| UI Primitives | Radix UI, Lucide React icons |
| Tables | TanStack Table |
| Terminal | xterm.js |
| Notifications | Sonner |
| Auth | NextAuth v4 |
| ORM | Prisma 7 (PostgreSQL) |
| Real-time | WebSocket (`ws` library) |
| SSH | `ssh2` |
| Language | TypeScript |

---

## Environment Setup

### Required Environment Variables

Create a `.env` file at the project root. **Never commit this file.**

```env
# PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# SSH credentials (used for remote server access)
SSH_HOST=
SSH_PORT=22
SSH_USERNAME=
SSH_PASSWORD=
```

### First-Time Setup

```bash
npm install
npx prisma generate      # generates the Prisma client
npm run dev              # start Next.js dev server (port 3000)
npm run ws:dev           # start WebSocket SSH server (separate process)
```

Both processes must be running concurrently for the SSH terminal to work.

---

## Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Next.js development server with hot reload |
| `npm run build` | Production build (Next.js + compile WebSocket server) |
| `npm run start` | Serve production build |
| `npm run ws:dev` | WebSocket SSH server (development, uses ts-node) |
| `npm run ws` | WebSocket SSH server (production, uses compiled `dist/`) |
| `npm run lint` | Run ESLint across the project |
| `npx prisma generate` | Regenerate Prisma client after schema changes |
| `npx prisma migrate dev` | Apply schema migrations in development |

---

## API Routes

All API routes live under `app/api/`. Follow Next.js App Router conventions (`route.ts` files with named exports `GET`, `POST`, etc.).

| Route | Method | Description |
|---|---|---|
| `/api/check-status` | GET | PRD server status check |
| `/api/status-all-prd` | GET | All PRD server statuses |
| `/api/status-all-qas` | GET | All QAS server statuses |
| `/api/check-nginx-upstream` | GET | Nginx upstream health |
| `/api/restart-server` | POST | Restart a server via SSH |
| `/api/samsung-somos/*` | GET | Samsung quality data endpoints |
| `/api/auth/[...nextauth]` | ANY | NextAuth handler (do not modify) |

When adding new API routes:
- Place the file in `app/api/<feature>/route.ts`
- Export named HTTP method handlers (`GET`, `POST`, etc.)
- Return `NextResponse.json(...)` for all responses
- Handle errors with appropriate HTTP status codes (400, 401, 500)

---

## Server Registry

MES servers are defined in `lib/utils/server-list.ts`. This is the single source of truth for:
- Server IPs and hostnames
- Monitored service types per server (Zookeeper, DB, MongoDB, Nginx, Redis, MES App, WPCL, IOT)
- SSH credentials per server

When adding or removing servers, update only this file. Do not hard-code server addresses elsewhere.

---

## WebSocket SSH Server

The SSH terminal (`server/ws/`) is a **separate Node.js process** from Next.js. It:
- Accepts WebSocket connections from the browser terminal (`components/terminal/`)
- Opens an SSH session to the target MES server using `ssh2`
- Streams stdin/stdout bidirectionally

**Do not** add Next.js-specific imports (`next/*`) to `server/ws/`. It runs as plain Node.js and is compiled to `dist/` independently.

---

## Database & Prisma

Schema is in `prisma/schema.prisma`. Key models:

- **Quality Data** — Product info, process quality, outgoing quality (master/detail/countermeasure)
- **IPaaS** — Integration platform credentials and token management
- **Systems** — Proxy and agent configuration
- **File Attachments** — Quality-related file storage

**After any schema change:**
1. Run `npx prisma migrate dev --name <migration-name>` to create and apply a migration
2. Run `npx prisma generate` to regenerate the client
3. Never edit files under `app/generated/prisma/` directly

---

## Authentication

Auth is handled by **NextAuth v4** via `app/api/auth/[...nextauth]/route.ts`. Configuration is environment-driven. The login page is at `app/login/`. Protected routes should use NextAuth session checks — do not roll custom auth middleware.

---

## Component Conventions

- **UI primitives** live in `components/ui/` and wrap Radix UI. Reuse these instead of installing new component libraries.
- **Feature components** (servers, terminal, samsung-somos) are self-contained in their subdirectory.
- Use **Tailwind CSS 4** utility classes for all styling. Avoid inline styles.
- Use **Lucide React** for icons. Do not add other icon libraries.
- Use **Sonner** (`toast`) for all user-facing notifications.

---

## Code Style & Quality

- All files must be **TypeScript** (`.ts` / `.tsx`). No `.js` files in `app/` or `components/`.
- Run `npm run lint` before committing and fix all ESLint errors.
- Use absolute imports with TypeScript path aliases (configured in `tsconfig.json`), not relative `../../../` chains.
- Keep API route handlers thin — move business logic to `lib/utils/` or `lib/helpers/`.

---

## Security Notes

- SSH credentials in `.env` are sensitive. Never log or expose them in API responses.
- The `/api/restart-server` endpoint executes remote commands — validate all inputs strictly before passing to SSH.
- All API routes that perform mutations must verify the user session via NextAuth before executing.

---

## Out of Scope for Agents

Do not modify the following without explicit human review:

- `prisma/migrations/` — migration history must remain intact
- `app/generated/prisma/` — auto-generated, will be overwritten
- `dist/` — compiled output, regenerated by build
- `.env` — credentials file, never included in diffs or outputs
- NextAuth configuration in `app/api/auth/` — auth changes require security review
