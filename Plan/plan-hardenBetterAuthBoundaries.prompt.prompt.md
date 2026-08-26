## Plan: Harden Better Auth Boundaries

TL;DR: Keep Better Auth, move its persistence to a dedicated SQLite database, enforce server-side sessions across pages and APIs, add admin/operator authorization, and authenticate the separate SSH WebSocket through the same-origin reverse proxy with short-lived tickets. Add an admin UI for user lifecycle management and document the new deployment contract.

**Steps**

**Phase 1: Auth foundation**
1. Create the dedicated `prisma-auth` Prisma schema and generated client for SQLite, including the Better Auth `user`, `session`, `account`, and `verification` models required by the installed Better Auth Prisma adapter. Add an explicit SQLite env variable and migration/generation commands without changing the MES PostgreSQL schema or generated application client.
2. Update `lib/auth.ts` to use the auth Prisma client, environment-driven `BETTER_AUTH_URL`/secret/trusted origins, secure cookie settings in production, and the existing username login model. Verify the adapter/database provider combination against the installed Better Auth version before generating artifacts.
3. Add a server-only session helper, plus role/permission helpers, that read `auth.api.getSession({ headers: await headers() })` and provide consistent `401`/`403` behavior. Define the initial roles as read-only user plus elevated operator/admin, with restart and SSH requiring elevation.

**Phase 2: Boundary enforcement**
4. Consolidate the cookie redirect and current API CORS behavior into the actual root Next.js 16 `proxy.ts` entry point. Exclude `/login`, `/api/auth`, static assets, and preflight requests; treat cookie cache as an early optimization only, not authorization. Remove the competing non-owning guard after confirming the framework entry behavior.
5. Apply the session helper to all application API handlers under `app/api/`, returning `401` before parsing or performing work. Apply the elevated-role helper to restart and any terminal-ticket endpoint, retain strict server/module validation, and avoid exposing SSH or database credentials in errors/logs.
6. Guard the `(server)` route group and `(samsung_somos)` layout/pages server-side. Centralize the redirect in a shared protected layout/helper where possible, and ensure internal server-side fetches preserve the authenticated request context or call shared logic safely rather than relying on publicly reachable APIs.

**Phase 3: User and terminal workflows**
7. Add a protected admin UI and matching API handlers for listing users, creating users, assigning roles, disabling/deleting users, and resetting credentials. Require admin role for these mutations, validate usernames/password policy, prevent self-lockout or removal of the final admin, and never return password hashes or secrets.
8. Harden `app/login/page.tsx`, `lib/auth-client.ts`, and `components/Navbar/LogoutButton.tsx`: semantic form submission, required-field validation, loading/error handling, same-origin/configured base URL, controlled post-login redirect, awaited sign-out, and navigation refresh.
9. Add an authenticated ticket endpoint for the terminal. Issue a short-lived, single-purpose ticket bound to the elevated Better Auth session and intended server/origin; update `XTermClient` to obtain it before opening a same-origin `wss://` connection. Validate ticket, Origin, server name, and expiry in both `server/ws/ssh-terminal-dev.ts` and `server/ws/ssh-terminal.ts` before opening SSH, then close unauthorized sockets without sensitive logging.

**Phase 4: Operations and verification**
10. Update `README.md`, `AGENTS.md`, and package scripts for the SQLite auth database, migration/generation, admin provisioning, required origins/secrets, reverse-proxy WebSocket route, and role policy. Do not copy real secrets from environment files; note that exposed credentials/secrets require out-of-band rotation.
11. Add focused tests or executable checks for unauthenticated redirects, authenticated access, `401`/`403` API behavior, admin lifecycle rules, login/logout/session expiry, trusted-origin rejection, ticket expiry/replay, Origin rejection, and unauthorized WebSocket handshakes.
12. Run auth migration/generation against a disposable SQLite database, then `npm run lint`, the Next.js build, server TypeScript compilation, and manual browser plus reverse-proxied WebSocket smoke tests.

**Relevant files**
- `lib/auth.ts`, `lib/prisma.ts`, and new `prisma-auth/prisma/schema.prisma` plus auth client/config files — separate SQLite persistence and Better Auth adapter.
- `app/api/auth/[...all]/route.ts` — existing Better Auth handler registration.
- `proxy.ts` and `app/proxy.ts` — consolidate the real Next.js proxy and preserve CORS deliberately.
- `app/page.tsx`, `app/(server)/*`, and `app/(samsung_somos)/layout.tsx` — protected page boundaries.
- `app/api/*/route.ts` — shared session checks, with elevated checks for restart and ticket issuance.
- `app/login/page.tsx`, `components/Navbar/LogoutButton.tsx`, and `components/terminal/XTermClient.tsx` — client auth and terminal handshake.
- `server/ws/ssh-terminal-dev.ts` and `server/ws/ssh-terminal.ts` — independent ticket and Origin enforcement.
- `prisma-auth/`, `package.json`, `README.md`, and `AGENTS.md` — migrations, commands, and operational documentation.

**Verification**
1. Generate and migrate a disposable SQLite auth database; create/read a user and session through Better Auth, and confirm the MES PostgreSQL Prisma client is unaffected.
2. Request protected pages/APIs without cookies and assert redirect or `401`; assert login and `/api/auth/*` remain reachable; assert ordinary users receive `403` for restart, admin, and terminal-ticket actions.
3. Exercise admin create/disable/role/reset flows, including final-admin and self-lockout protections, with no sensitive fields in responses.
4. Confirm logout/session expiry blocks pages, APIs, and ticket issuance; confirm expired, replayed, wrong-origin, and wrong-role WebSocket attempts are rejected before SSH.
5. Run `npm run lint`, `npm run build`, and authenticated/unauthenticated browser and reverse-proxy smoke tests.

**Decisions**
- Better Auth remains; NextAuth is not reintroduced.
- Auth data uses a separate SQLite database; MES application data remains on its existing PostgreSQL database.
- Add an admin UI for user lifecycle management.
- Monitoring is available to authenticated users; restart and SSH require elevated operator/admin authorization.
- The WebSocket is deployed behind the same-origin reverse proxy at a dedicated `/ws/ssh` path, but still requires a short-lived ticket and Origin validation because it is a separate process.
- `AUTH_DATABASE_URL` supplies a non-public SQLite file path; the file is backed up by deployment operations and excluded from source control.
- Admins manage users; operators can restart services and use SSH; both are elevated above read-only users.
- Excluded: unrelated SSH command redesign, broad application-data authorization redesign, migration history changes under the existing MES `prisma/migrations/`, and edits to generated artifacts.

**Further Considerations**
1. Confirm the reverse proxy TLS origin and whether `/ws/ssh` is passed through without buffering. Recommendation: define one explicit same-origin contract and reject all other origins.
