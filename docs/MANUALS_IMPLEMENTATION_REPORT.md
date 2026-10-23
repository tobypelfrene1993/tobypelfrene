# Manuals implementation report

**Date:** 2026-10-23\
**Scope:** local repository only; no commit, push, or production deployment.

## Source and collection

- Index: `https://axelhuts.be/mac/` (live HTML and browser checked).
- Discovered: **62** manual cards and 62 distinct manual routes.
- Collected into Markdown: **62**. Implemented under `/manuals/<slug>`: **62**.
- Inaccessible manuals: **0** during collection. Source availability may change.
- Source PDF links in manual bodies: **0**; imported or linked PDFs: **0**. The source CV PDF is outside the manual collection.
- Imported content contains approximately **57,394 words**, **372 source `<pre>` blocks**, **173 tables**, **67 HTML concept/diagram elements**, and **one inline image**. The inline image remains linked to the source host and loaded during local browser verification. Decorative page banners were not imported.
- Source category codes and tags are retained in `src/manuals/manifest.json`. The full per-manual inventory is in `docs/MANUALS_SOURCE_AUDIT.md`.

## Implementation

- `/manuals`: searchable, category-filtered overview with source-based category codes.
- `/manuals/<slug>`: documentation, headings, internal table of contents, code copy controls, tables, and optional PDF view/download links. Source URLs remain in internal metadata.
- Source manual-to-manual links resolve to local routes when the target is imported.
- Markdown lives in `src/manuals/content/`; metadata lives in `src/manuals/manifest.json`. Files load on demand.
- Added `react-markdown` and `remark-gfm` runtime dependencies. Raw HTML is not rendered; external Markdown links use safe browser behavior.
- Added a Manuals link to existing header and footer navigation without changing the homepage or project records.

## Known differences and limits

- The source's CSS-driven concept maps are transcribed as text. Its interactive Packet Tracer checklist is retained as 40 readable checkbox-labeled entries, without the source's check/clear interaction or scratchpad behavior.
- Source callout styling, search UI, and decorative banners are not copied. Content was converted from HTML to Markdown, so visual formatting differs.
- Eight occurrences of source example plaintext passwords were replaced with `CHANGE_ME_STRONG_SECRET`, one SNMP community string with `CHANGE_ME_COMMUNITY`, and one sample username with `admin`. These are intentional content differences to avoid republishing lab credentials. Commands otherwise retain their source syntax, but users must supply unique secrets before running them.
- The one inline image is source-hosted. Its future availability and independent asset rights have not been established.
- No PDF exists in the audited manual set, so PDF view/download behavior remains untested with a real manual PDF.
- The import was checked structurally, including every direct route and source code/table counts; a line-by-line editorial review of all 62 manuals was not performed. Do not treat the import as a technical endorsement of every command.

## Verification and evidence

`npm.cmd run build` passed TypeScript and Vite production build. A rebuilt local preview at `http://127.0.0.1:4175/` was checked in Edge/Playwright at 1440px and 375px. The overview showed 62 cards; search and category filtering each returned the expected single item; all 62 direct routes loaded; representative code, tables, long text, source image, TOC target, copy command, mobile navigation, and no horizontal overflow were checked. Home, `/projects`, and the CV PDF URL were checked for regression. Results and screenshots are in `docs/evidence/manuals-2026-10-23/`.

The user guide is `README.md`; adding or refreshing content is described in `docs/MANUALS_MAINTENANCE.md`.

## Visible source attribution update (2026-10-23)

The owner explicitly confirmed Axel's permission to publish the 62 manuals without a visible name, link, or other source attribution. This confirmation is owner-reported, not independently verified. The manual overview, cards, document headers and footers no longer show attribution. Internal source URLs remain in the manifest, Markdown and source audit. A rebuilt local preview showed 62 cards and all 62 direct routes without visible attribution; see `docs/evidence/manuals-source-labels-2026-10-23/`.
