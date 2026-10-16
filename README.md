# Toby Pelfrene Portfolio

Light-themed personal portfolio website for Toby Pelfrene, focused on junior opportunities in Network Administration, Systems Administration, Server Administration, IT Infrastructure and IT Support.

The site presents Toby as a Network & Systems Administration student with interests in Network Administration, Systems Administration, Server Administration, IT Infrastructure, Virtualization, Storage, Backup and Recovery, Data Management and IT Support. Public project content is framed around safe, recruiter-friendly infrastructure and administration experience.

The homepage has a compact header, hero with Toby's existing real portrait, three featured projects, technical skills, About with work principles and direct contact links. `/projects` lists the six visible projects. Two projects remain deliberately hidden by `src/portfolioData.ts`.

The Download CV links serve `/Toby-Pelfrene-CV.pdf`, a public version of the supplied CV with private location and telephone details removed from the PDF content. The original source remains unchanged outside the repository. `/Toby-Pelfrene-CV.html` remains available as an accessible link to the PDF. Future CV replacements must receive the same text, metadata and visual privacy checks before publication.

## Tech Stack

- React
- TypeScript
- TailwindCSS
- Vite
- Static production build deployable on a VPS behind Nginx or another web server

## Local Development

```bash
npm install
npm run dev
```

The Vite dev server binds to `0.0.0.0` by default for VPS-friendly testing.

## Production Build

```bash
npm run build
npm run preview
```

The build output is generated in `dist/`.

## VPS Deployment Notes

1. Build locally or on the VPS with `npm run build`.
2. Copy the contents of `dist/` to the web root, for example `/var/www/tobypelfrene`.
3. Serve the folder with Nginx, Caddy or another static web server.
4. Add TLS through Cloudflare, Certbot or the chosen reverse proxy setup.
5. Update the canonical URL, contact email, LinkedIn URL and GitHub URL before public launch if they differ from `src/portfolioData.ts` and `index.html`.

## Project Structure

- `index.html` - SEO metadata, Open Graph tags and structured data.
- `src/App.tsx` - page sections and reusable UI components.
- `src/portfolioData.ts` - skills, project, learning journey and contact data.
- `src/styles.css` - Tailwind entrypoint and shared component styles.
- `public/Toby-Pelfrene-CV.pdf` - public CV document.
- `public/Toby-Pelfrene-CV.html` - compatibility page linking to the PDF.
- `docs/evidence/` - verification artifacts for StateDD evidence tracking.
- `docs/PORTFOLIO_BASELINE_AUDIT.md` - read-only inventory of the pre-redesign implementation.

## Verification

Current verified commands:

```bash
npm run build
```

The Light Tech 2.0 build was verified locally at `http://127.0.0.1:4174/` and `/projects` at 1440, 768 and 375px. Current screenshots and DOM checks are in `docs/evidence/light-tech-2026-10-15/`; the evidence ledger is `docs/EVIDENCE_LOG.md`. This does not verify the public VPS.
