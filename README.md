# MES Server Dashboard

**Version:** 1.0.1  
**Project Name:** `mes-server-dashboard`

## Overview

MES Server Dashboard is a web-based monitoring and management system for **Manufacturing Execution System (MES)** environments. It provides real-time visibility into **MES servers and their services**, including service status per server, and supports **remote command execution** via SSH.

This project helps IT and MES administrators quickly identify service issues, monitor system health, and perform remote operations from a single interface.

---

## Key Features

- **Server Monitoring** — Display all registered MES servers with their status (running/stopped/unreachable)
- **Service Tracking** — Monitor individual MES services (Zookeeper, DB, MongoDB, Nginx, Redis, MES App, WPCL, IOT)
- **SSH Terminal** — Execute commands on remote servers via a web-based terminal (WebSocket + xterm.js)
- **Nginx Upstream Monitoring** — Check upstream server health and availability
- **Samsung Somos Integration** — View and manage quality data (product info, process quality, outgoing quality)
- **Authentication** — Secure login via NextAuth with environment-based configuration

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Radix UI (primitives)
- Lucide React (icons)
- xterm.js (web terminal)
- TanStack Table (data tables)
- Sonner (toast notifications)

### Backend / Services
- Next.js API Routes
- NextAuth v4 (authentication)
- WebSocket (`ws`) for real-time communication
- SSH2 for remote server access
- Prisma 7 (PostgreSQL ORM)

### Tooling
- TypeScript
- ESLint
- ts-node / tsconfig-paths

---

## Prerequisites

- Node.js 18+
- PostgreSQL database
- SSH access to target MES servers

---

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev

# Run WebSocket SSH server (development)
npm run ws:dev
```

---

## Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── (samsung_somos)/          # Samsung Somos module pages
│   ├── (server)/                 # Server status pages (PRD/QAS)
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth endpoints
│   │   ├── samsung-somos/        # Samsung data endpoints
│   │   └── *.ts                  # Server status, nginx, restart APIs
│   ├── generated/prisma/         # Prisma generated client
│   ├── login/                    # Login page
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ui/                       # Radix UI primitives
│   ├── Navbar/                   # Navigation components
│   ├── servers/                  # Server card components
│   ├── samsung-somos/            # Data table components
│   └── terminal/                 # xterm.js terminal components
├── lib/                          # Utilities and helpers
│   ├── utils/                    # Server status, SSH commands
│   └── helpers/                   # String operations, grouping
├── server/ws/                    # WebSocket SSH server
├── prisma/                       # Database schema
├── public/                      # Static assets
└── dist/                        # Compiled server output
```

---

## Configuration

### Environment Variables

Create a `.env` file with the following:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# SSH Configuration (for each server)
SSH_HOST=
SSH_PORT=22
SSH_USERNAME=
SSH_PASSWORD=
```

### Server Configuration

Define your MES servers in `lib/utils/server-list.ts` with their IPs, service types, and SSH credentials.

---

## API Routes

| Endpoint | Description |
|----------|-------------|
| `GET /api/check-status` | Get PRD server status |
| `GET /api/status-all-prd` | Get all PRD server statuses |
| `GET /api/status-all-qas` | Get all QAS server statuses |
| `GET /api/check-nginx-upstream` | Check nginx upstream health |
| `POST /api/restart-server` | Restart a server via SSH |
| `GET /api/samsung-somos/*` | Samsung quality data endpoints |

---

## Database Schema

Key Prisma models:
- **Quality Data** — Product info, process quality, outgoing quality (master/detail/countermeasure)
- **IPaaS** — Integration credentials and token management
- **Systems** — Proxy and agent configuration
- **File Attachments** — Quality-related file storage

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js app + compile server |
| `npm run ws:dev` | Run WebSocket SSH server (dev) |
| `npm run ws` | Run WebSocket SSH server (prod) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Release Notes

### [1.0.1] - 2026-02-04

- **Authentication** — Login page with client-side validation and responsive design
- **SSH Terminal** — WebSocket-based remote command execution via xterm.js
- **API Infrastructure** — Endpoints for server status, nginx monitoring, and remote restart

---

## License

Private — All rights reserved