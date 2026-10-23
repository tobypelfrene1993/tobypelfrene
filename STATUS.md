# Toby Pelfrene Portfolio Status

**Updated At:** 2026-10-23
**Execution Mode:** bootstrap
**Project State:** light_tech_2_tp_favicon_local_verified
**Public URL:** https://tobypelfrene.be (prior production build verified directly against VPS IP on 2026-10-23; TP favicon remains local)

## Snapshot

- Light Tech 2.0 is implemented locally with a light theme, compact header, existing real portrait, three featured project cards, four skill columns, About principles and a subtle contact panel.
- The `/projects` page renders the six visible projects; two intentionally hidden projects remain filtered out.
- Contact email was changed to the value supplied for this slice: `tobypelfrene@protonmail.com`. LinkedIn and GitHub match the supplied URLs.
- The public PDF CV is available at `/Toby-Pelfrene-CV.pdf`. Private location and phone rows were removed from its content; all three download buttons were verified on desktop and mobile. The former HTML URL links to the PDF.
- `/manuals` and 62 direct manual routes are implemented from Axel Huts's M.A.C. collection, with local Markdown, search and category filtering. The owner reports Axel's explicit permission to publish these manuals without visible attribution; internal source URLs remain. The rebuilt local preview and live site passed a 62-route browser sweep on 2026-10-23. No source manual PDFs were found. See `docs/MANUALS_IMPLEMENTATION_REPORT.md` for fidelity limits.
- The current build was deployed to the existing Easyhost VPS webroot `/var/www/tobypelfrene` on 2026-10-23. Direct VPS HTTPS returned 200 for `/`, `/projects/`, `/manuals`, a manual detail route and the CV PDF. Live Edge verified 62 manuals without visible source labels, search/filter behavior, six projects, loaded project images and mobile width. Backup: `/var/www/tobypelfrene-backup-20261023-120224`.
- The custom TP favicon was added locally from the supplied kit. `npm.cmd run build` passed; Edge on the rebuilt preview at `127.0.0.1:4182` loaded all five icon URLs without 404s, displayed the SVG, and checked homepage, both projects URLs, manuals and all 62 individual manual URLs. This favicon build has not been deployed.

## Immediate Priorities

1. Editorially review imported manuals and confirm independent reuse rights for the one source-hosted inline image.

## Open Risks

- The imported manuals have not received line-by-line editorial review; the one inline image remains source-hosted and its independent rights are unverified.

## Notes

- Current CV evidence: `docs/evidence/cv-integration-2026-10-15/` and `EV-2026-10-15-008`. Layout baseline: `EV-2026-10-15-001`.
- `portfolio-dist.tar.gz` was rebuilt for this deployment; prior VPS backups were retained.
- Earlier local manuals evidence: `docs/evidence/manuals-2026-10-23/` and `EV-2026-10-23-001`.
- Current deployment evidence: `docs/evidence/manuals-source-labels-2026-10-23/` and `EV-2026-10-23-004`. No commit or GitHub push was made; pre-existing uncommitted work remains.
- TP favicon local evidence: `docs/evidence/tp-favicon-2026-10-23/` and `EV-2026-10-23-005`. No commit, push or VPS deployment was made for the favicon.
