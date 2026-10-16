# NEXT_ACTIONS - Active Execution Queue

**Updated At:** 2026-10-15
**Execution Mode:** bootstrap
**Max Items:** 10

## Active Work

### P1 [BL-005] Confirm production identity

- Owner: Toby
- Next action: Confirm intended production domain and deployment identity. The email, LinkedIn and GitHub values were supplied in the Light Tech 2.0 request and entered in source.
- Exit criteria: Production identity is confirmed and the canonical URL and public contact details are checked against the deployed artifact.

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
