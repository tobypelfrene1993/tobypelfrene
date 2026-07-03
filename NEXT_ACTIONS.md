# NEXT_ACTIONS - Active Execution Queue

**Updated At:** 2026-06-10 11:42 +02:00
**Execution Mode:** bootstrap
**Max Items:** 10

## Active Work

### P1 [BL-005] Confirm public contact and identity details

- Owner: Toby
- Next action: Provide final LinkedIn URL, GitHub URL, email address and intended production domain.
- Exit criteria: `src/portfolioData.ts`, `index.html` and `public/Toby-Pelfrene-CV.html` contain verified public contact details.

### P2 [BL-006] Replace CV placeholder with final CV artifact

- Owner: Toby / coding agent
- Next action: Provide final CV content or PDF source.
- Exit criteria: Download CV button serves the approved CV file and runtime verification confirms HTTP 200.

### P3 [BL-007] Deploy portfolio to VPS and verify HTTPS runtime

- Owner: Toby / coding agent
- Next action: Build `dist/`, deploy to target VPS web root and configure Nginx or equivalent static hosting.
- Exit criteria: Public HTTPS URL serves the portfolio, duplicate runtimes are checked, and evidence is added to `docs/EVIDENCE_LOG.md`.

## Queue Rules

- Keep this file short.
- List only active, open work.
- Remove completed items immediately.
- Every active item must reference a backlog ID like `[BL-001]`.
- Include owner, next action, and exit criteria when items exist.
