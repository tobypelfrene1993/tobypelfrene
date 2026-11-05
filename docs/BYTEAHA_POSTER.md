# ByteAha Poster information pages

Implemented 2026-11-05 for the owner's personal YouTube upload bot. Content is in `src/byteaha.json`; React uses the existing header/footer and styles. `scripts/prepare_static_routes.mjs` writes crawlable Dutch HTML, route-specific titles, descriptions and canonical URLs after Vite builds. It also preserves the physical projects-directory index fix. No OAuth client, token storage or upload bot is implemented here.

Public routes:
- https://tobypelfrene.be/byteaha-poster/
- https://tobypelfrene.be/byteaha-poster/privacy/
- https://tobypelfrene.be/byteaha-poster/terms/

Before enabling the bot, the owner must check:
- Actual requested scope and final control over upload metadata/publication.
- Actual token storage, access controls, encryption, logs and backups.
- Documented retention and deletion behavior, including revocation handling and applicable YouTube deadlines.
- Acceptance of the privacy policy before use.
- Google Console branding, support email, domain ownership and any verification or API upload restrictions. Publishing these pages does not prove Google approval.
- Hosting log configuration and retention, which were not audited for this task.

Official references reviewed:
- https://developers.google.com/identity/protocols/oauth2/policies
- https://support.google.com/cloud/answer/13464321
- https://developers.google.com/terms/api-services-user-data-policy
- https://developers.google.com/youtube/terms/developer-policies

Local browser checks at 1440, 768 and 375px include direct routes, refresh, metadata, mutual links, overflow and JS errors. Regressions cover the homepage, six projects, manuals search/filter, 62 manual URLs, CV and favicon. Browser evidence remains local in `docs/evidence/byteaha-2026-11-05/`.
