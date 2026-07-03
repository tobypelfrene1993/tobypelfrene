# Toby Pelfrene Portfolio

Modern personal portfolio website for Toby Pelfrene, focused on future job applications in Network Administration, Systems Administration, Server Administration, IT Infrastructure and IT Support roles.

The site presents Toby as a Network & Systems Administration student with interests in Network Administration, Systems Administration, Server Administration, IT Infrastructure, Virtualization, Storage, Backup and Recovery, Data Management and IT Support. Public project content is framed around safe, recruiter-friendly infrastructure and administration experience.

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
- `public/Toby-Pelfrene-CV.html` - downloadable CV placeholder document.
- `docs/evidence/` - verification artifacts for StateDD evidence tracking.

## Verification

Current verified commands:

```bash
npm run build
```

Runtime preview was verified at `http://127.0.0.1:4173/` with Vite preview. Evidence is recorded in `docs/EVIDENCE_LOG.md`.
