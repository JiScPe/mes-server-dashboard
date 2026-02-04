# MES Server Dashboard

**Version:** 1.0.1  
**Project Name:** `mes-server-dashboard`

## Overview

MES Server Dashboard is a web-based monitoring and management system for **Manufacturing Execution System (MES)** environments.  
It provides real-time visibility into **MES servers and their services**, including service status per server, and supports **remote command execution** via SSH.

This project is designed to help IT and MES administrators quickly identify service issues, monitor system health, and perform remote operations from a single interface.

---

## Key Features

- 📊 **MES Server Monitoring**
  - Display all registered MES servers
  - View service status per server (running / stopped / unreachable)

- 🔍 **Service-Level Visibility**
  - Monitor individual MES services on each server
  - Clear status indicators for quick diagnostics

- 🖥️ **Remote Command Execution**
  - Execute commands on remote servers via SSH
  - Web-based terminal powered by WebSocket + xterm.js

- 🔐 **Authentication**
  - User authentication handled via **NextAuth**
  - Environment-based configuration using `.env`

- ⚡ **Modern Web Stack**
  - Built with **Next.js**
  - Real-time communication using **WebSocket**
  - Responsive UI with **Tailwind CSS** and **Radix UI**

---

## Tech Stack

### Frontend
- **Next.js**
- **React 19**
- **Tailwind CSS**
- **Radix UI**
- **Lucide Icons**
- **xterm.js** (Web terminal)

### Backend / Services
- **Node.js**
- **WebSocket (`ws`)**
- **SSH (`ssh2`)**
- **NextAuth** for authentication

### Tooling
- **TypeScript**
- **ESLint**
- **ts-node**
- **dotenv**

---

## Project Structure (High-Level)

```text
.
├── app/                    # Next.js App Router
├── components/             # Reusable UI components
├── server/
│   └── ws/
│       └── ssh-terminal.ts # WebSocket SSH server
├── public/                 # Static assets
├── dist/                   # Compiled server output
├── tsconfig.server.json    # Server-side TypeScript config
├── package.json
└── README.md
```
# Released Notes
## [1.0.1] - 2026-02-04
🚀 Overview
Version 1.0.1 introduces essential authentication infrastructure and establishes secure remote management protocols for server-side operations. This release focuses on securing the application entry point and streamlining deployment workflows.

### 🔑 New Features
1. Authentication Interface
Login Page Implementation: Deployed a standardized login portal (/login) utilizing Next.js functional components.

Client-Side Validation: Integrated robust form handling to ensure data integrity before submission.

Responsive Design: Optimized the authentication UI for seamless performance across desktop and mobile devices.

2. Beckend Service & API

Remote SSH Access: Established secure Secure Shell (SSH) protocols to facilitate direct server management.

Server Communication: Create a Web-Socket server to handle the SSH protocal.