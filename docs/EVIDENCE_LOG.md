# EVIDENCE_LOG.md

**Purpose:** Structured ledger of proof artifacts for user-facing claims.

## Entry Format

```yaml
- ID: EV-YYYY-MM-DD-001
  File: /absolute/path/to/artifact.png
  Title: short description
  Source/System: browser | api | test | log | screenshot
  Route/Page: optional route or URL
  Action: what was done
  Shows:
    - visible fact 1
    - visible fact 2
  Proves:
    - why the artifact matters
  Type: source-data | chatbot | gap | integration | docs-render-verification
  as_of: 2026-03-18T18:00:00+01:00
  Notes: optional context
```

## Guidance

- Link evidence to the specific claim it supports.
- Prefer durable artifact paths.
- Place saved artifacts under `docs/evidence/YYYY-MM-DD-<slug>/` when possible.
- Add timestamps for anything that may become stale.

## EV-2026-06-10-001: Portfolio build and local preview verification

```yaml
- ID: EV-2026-06-10-001
  File:
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\2026-06-10-portfolio-runtime\npm-build.log
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\2026-06-10-portfolio-runtime\vite-preview.log
  Title: Portfolio production build and Vite preview runtime verification
  Source/System: test | local_http_runtime
  Route/Page:
    - http://127.0.0.1:4173/
    - http://127.0.0.1:4173/Toby-Pelfrene-CV.html
  Action: Built the React TypeScript Tailwind portfolio and served the production build through Vite preview.
  Shows:
    - npm run build completed successfully
    - Vite preview served the built site on localhost port 4173
    - Homepage returned HTTP 200 and contained Toby Pelfrene plus the expected professional subtitle
    - Downloadable CV HTML route returned HTTP 200
  Proves:
    - The portfolio source compiles into a production build
    - The built artifact can be served as a static website locally
  Type: test-output
  as_of: 2026-06-10T11:42:34+02:00
  Notes: Browser screenshot evidence was not captured in this slice; VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-002: Learning Journey section verification

```yaml
- ID: EV-2026-06-10-002
  File:
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\2026-06-10-learning-journey\npm-build.log
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\2026-06-10-learning-journey\vite-preview.log
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\2026-06-10-learning-journey\learning-journey-section.png
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\2026-06-10-learning-journey\learning-journey-mobile.png
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\2026-06-10-learning-journey\dom-verification.json
  Title: Learning Journey section copy and planned certification card verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:4173/
  Action: Built the React TypeScript Tailwind portfolio, served the production build through Vite preview, and inspected the Learning Journey section in a headless Edge browser.
  Shows:
    - npm run build completed successfully
    - Vite preview served the built site on localhost port 4173
    - Rendered section title is Learning Journey
    - Rendered subtitle says "Building practical experience through real-world projects while preparing for future industry certifications."
    - Rendered cards are Cisco CCNA (Planned), Microsoft AZ-900 (Planned), Microsoft MS-900 (Planned), and Linux Essentials (Planned)
    - The section presents future targets and does not present certifications as completed achievements
    - Desktop and mobile screenshots show the cards populated and readable
  Proves:
    - The requested user-facing section copy and card labels render in the production preview
    - The dark card layout remains populated and visually verified
  Type: docs-render-verification
  as_of: 2026-06-10T13:06:00+02:00
  Notes: Public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-003: IT portfolio content refactor build verification

```yaml
- ID: EV-2026-06-10-003
  File: none
  Title: Portfolio content refactor production build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Updated portfolio source content and ran production build plus source searches for forbidden public terms.
  Shows:
    - npm.cmd run build completed successfully
    - Current Focus section was added to src/App.tsx
    - Projects now include Problem, Solution, Technologies used and What I learned fields
    - Former public finance-related project was reframed as Infrastructure Automation Platform
    - Public source/content search returned no matches in src, public, index.html or README.md for the requested forbidden terms
  Proves:
    - The updated React TypeScript Tailwind source compiles into a production build
    - The public source content no longer contains the requested forbidden public terms in the checked website files
  Type: test-output
  as_of: 2026-06-10T13:30:00+02:00
  Notes: New browser screenshot evidence was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-004: Recruiter-focused Skills and Projects refactor

```yaml
- ID: EV-2026-06-10-004
  File: none
  Title: Recruiter-focused skills badges and project cards build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Refactored Skills and Projects source content, then ran production build and source searches.
  Shows:
    - npm.cmd run build completed successfully
    - Skills section source contains prominent technical skill badges
    - Projects section source uses single-column card layout
    - Projects display short summaries, Skills Demonstrated and technology badges
    - Source search found no removed case-study labels in src
    - Source search found no requested forbidden public terms in checked public website files
  Proves:
    - The updated recruiter-focused source compiles into a production build
    - The public Projects source no longer uses Problem, Solution or What I Learned labels
  Type: test-output
  as_of: 2026-06-10T13:45:00+02:00
  Notes: New browser screenshot evidence was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-005: Compact Technical Skills section build verification

```yaml
- ID: EV-2026-06-10-005
  File: none
  Title: Compact Technical Skills section build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Refactored the Skills section into a compact Technical Skills badge grid, then ran production build, state hygiene and source search checks.
  Shows:
    - npm.cmd run build completed successfully
    - python scripts/check_state_docs.py passed
    - Skills section title source is Technical Skills
    - Skills section uses compact badges with a dense responsive grid
    - Source search found no requested forbidden public terms in src
  Proves:
    - The compact Technical Skills source compiles into a production build
    - StateDD documentation hygiene remains valid after the change
  Type: test-output
  as_of: 2026-06-10T14:00:00+02:00
  Notes: New browser screenshot evidence was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-006: Technical Skills badge list update

```yaml
- ID: EV-2026-06-10-006
  File: none
  Title: Technical Skills badge list update build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Updated the Technical Skills badge list, then ran production build, state hygiene and source search checks.
  Shows:
    - npm.cmd run build completed successfully
    - python scripts/check_state_docs.py passed
    - src/portfolioData.ts contains the updated Technical Skills badge list
    - Source search found no requested forbidden public terms in src
  Proves:
    - The updated Technical Skills source compiles into a production build
    - StateDD documentation hygiene remains valid after the change
  Type: test-output
  as_of: 2026-06-10T14:10:00+02:00
  Notes: New browser screenshot evidence was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-007: Recruiter-focused About Me hero card

```yaml
- ID: EV-2026-06-10-007
  File: none
  Title: Recruiter-focused About Me hero card build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Replaced the right-side hero card with an About Me card, then ran production build and source search checks.
  Shows:
    - npm.cmd run build completed successfully
    - src/App.tsx contains the new About Me card content
    - Source search found no removed hero-card terms in src
    - Source search found no requested forbidden public terms in src
  Proves:
    - The updated hero card source compiles into a production build
    - The old right-side hero card content was removed from source
  Type: test-output
  as_of: 2026-06-10T14:25:00+02:00
  Notes: New browser screenshot evidence was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-008: Recruiter-focused hero positioning update

```yaml
- ID: EV-2026-06-10-008
  File: none
  Title: Recruiter-focused hero positioning build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Updated hero positioning copy, focus cards and About Me highlight content, then ran production build, StateDD hygiene and source search checks.
  Shows:
    - npm.cmd run build completed successfully
    - python scripts/check_state_docs.py passed
    - src/App.tsx contains Junior IT Professional hero positioning
    - src/App.tsx contains updated Infrastructure, System Administration and Automation focus cards
    - Source search found no replaced old hero text in src
    - Source search found no requested forbidden public terms in src
  Proves:
    - The updated recruiter-focused hero source compiles into a production build
    - StateDD documentation hygiene remains valid after the change
  Type: test-output
  as_of: 2026-06-10T14:40:00+02:00
  Notes: New browser screenshot evidence was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-009: Recruiter scan homepage optimization

```yaml
- ID: EV-2026-06-10-009
  File: none
  Title: Recruiter scan homepage optimization build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Reordered homepage sections, compacted Current Focus, shortened project cards, added expandable Learn More details, then ran production build and source search checks.
  Shows:
    - npm.cmd run build completed successfully
    - src/App.tsx renders Technical Skills before Current Focus and Projects
    - src/App.tsx contains compact Current Focus badge layout
    - Project source uses highlights and Learn More details instead of long case-study labels
    - Source search found no removed long project labels in src
    - Source search found no requested forbidden public terms in src
  Proves:
    - The recruiter-scanning optimized homepage source compiles into a production build
    - Long project case-study labels remain removed from the public source
  Type: test-output
  as_of: 2026-06-10T15:00:00+02:00
  Notes: New browser screenshot evidence was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-010: Hero profile photo slot build verification

```yaml
- ID: EV-2026-06-10-010
  File: none
  Title: Hero profile photo slot build verification
  Source/System: test | source-search | filesystem-check
  Route/Page:
    - local source files
  Action: Added circular profile image markup and styling to the hero About Me card, then ran production build, source search and expected asset path checks.
  Shows:
    - npm.cmd run build completed successfully
    - src/App.tsx contains an image at /toby-pelfrene-profile.jpg with alt text Toby Pelfrene
    - src/styles.css contains circular avatar styling with subtle border and blue glow
    - Source search found no requested forbidden public terms in src
    - public/toby-pelfrene-profile.jpg is not currently present
  Proves:
    - The hero profile photo layout source compiles into a production build
    - The actual profile image asset still needs to be provided before rendered image acceptance
  Type: test-output
  as_of: 2026-06-10T15:15:00+02:00
  Notes: Browser/runtime image rendering was not verified because the image asset is pending; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-011: Hero CTA priority and social links update

```yaml
- ID: EV-2026-06-10-011
  File: none
  Title: Hero CTA priority and social links build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Updated hero About Me copy, CTA order, LinkedIn/GitHub links and profile avatar sizing, then ran production build and source search checks.
  Shows:
    - npm.cmd run build completed successfully
    - src/App.tsx contains Download CV as the primary hero CTA before LinkedIn, View Projects and Contact Me
    - src/App.tsx contains compact LinkedIn and GitHub links below the profile photo
    - src/portfolioData.ts contains the user-provided LinkedIn and GitHub URLs
    - Source search found no old hero copy or old contact URLs in src
    - Source search found no requested forbidden public terms in src
    - public/toby-pelfrene-profile.jpg exists
    - dist/toby-pelfrene-profile.jpg was present after production build
  Proves:
    - The updated hero CTA/social-link source compiles into a production build
    - The requested recruiter-priority hero content is represented in source
  Type: test-output
  as_of: 2026-06-10T15:30:00+02:00
  Notes: Browser screenshot verification was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-012: Right-side hero card layout refinement

```yaml
- ID: EV-2026-06-10-012
  File: none
  Title: Right-side hero card layout refinement build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Removed social buttons beneath the hero profile photo, adjusted spacing and kept the card ordered as Photo, About Me, Education & Training and Core Technologies.
  Shows:
    - npm.cmd run build completed successfully
    - Source search found no social-link, LinkedIn profile or GitHub profile button code in src
    - Source search found no requested forbidden public terms in src
  Proves:
    - The refined right-side hero card source compiles into a production build
    - The social buttons underneath the hero profile photo were removed from source
  Type: test-output
  as_of: 2026-06-10T15:40:00+02:00
  Notes: Browser screenshot verification was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-013: Current Focus cleanup

```yaml
- ID: EV-2026-06-10-013
  File: none
  Title: Current Focus helper text removal build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Removed the Fast recruiter scan helper text from Current Focus and centered the section label above the badge grid.
  Shows:
    - npm.cmd run build completed successfully
    - Source search found no Fast recruiter scan text in src
    - Source search found no requested forbidden public terms in src
  Proves:
    - The cleaned Current Focus source compiles into a production build
    - The requested helper text was removed from source
  Type: test-output
  as_of: 2026-06-10T15:50:00+02:00
  Notes: Browser screenshot verification was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-10-014: About Me security interest copy update

```yaml
- ID: EV-2026-06-10-014
  File: none
  Title: About Me security interest copy build verification
  Source/System: test | source-search
  Route/Page:
    - local source files
  Action: Added a concise About Me paragraph about infrastructure security, network security and security best practices, then ran production build and source search checks.
  Shows:
    - npm.cmd run build completed successfully
    - Source search found the new About Me security-interest text in src/App.tsx
    - Source search found no requested forbidden public terms in src
  Proves:
    - The updated About Me source compiles into a production build
    - The requested security-interest wording is present in source
  Type: test-output
  as_of: 2026-06-10T16:00:00+02:00
  Notes: Browser screenshot verification was not captured in this slice; public VPS HTTPS runtime remains unverified.
```

## EV-2026-06-12-001: Lighter slate-blue color refresh

```yaml
- ID: EV-2026-06-12-001
  File:
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\color-refresh-desktop-2026-06-12-accepted.png
    - C:\Users\Admin\opencode\new\tobypelfrene\docs\evidence\color-refresh-mobile-2026-06-12-accepted.png
  Title: Lighter recruiter-friendly slate-blue color refresh verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:4173/
  Action: Updated the global color style, built the production site, served it through Vite preview and captured desktop plus mobile headless Edge screenshots.
  Shows:
    - npm.cmd run build completed successfully
    - Local Vite preview served the built homepage on port 4173
    - Desktop screenshot shows the lighter slate-blue background, softer card surfaces, clearer borders and brighter blue CTA styling
    - Mobile screenshot shows the refreshed hero styling with wrapped text and no observed hero clipping in the captured viewport
  Proves:
    - The requested color refresh compiles into a production build
    - The refreshed homepage was visually checked on desktop and mobile local preview viewports
  Type: docs-render-verification
  as_of: 2026-06-12T00:00:00+02:00
  Notes: Public VPS HTTPS runtime remains unverified; no deploy was performed.
```

## EV-2026-07-01-001: Professional colorful dark IT visual refresh

```yaml
- ID: EV-2026-07-01-001
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\visual-refresh-2026-07-01\320.png
    - C:\Project Toby\tobypelfrene\docs\evidence\visual-refresh-2026-07-01\mobile.png
    - C:\Project Toby\tobypelfrene\docs\evidence\visual-refresh-2026-07-01\tablet.png
    - C:\Project Toby\tobypelfrene\docs\evidence\visual-refresh-2026-07-01\desktop.png
    - C:\Project Toby\tobypelfrene\docs\evidence\visual-refresh-2026-07-01\mobile-full.png
    - C:\Project Toby\tobypelfrene\docs\evidence\visual-refresh-2026-07-01\desktop-full.png
    - C:\Project Toby\tobypelfrene\docs\evidence\visual-refresh-2026-07-01\responsive-audit.json
  Title: Professional colorful dark IT visual refresh verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Added controlled blue, turquoise, warm and limited violet/green visual accents without changing website copy, then built and browser-verified the local Vite runtime across responsive viewports.
  Shows:
    - npm.cmd run build completed successfully
    - Local Vite dev runtime served the homepage on port 5173 with HTTP 200
    - Browser runtime rendered the existing Toby Pelfrene homepage sections
    - 320px, mobile, tablet and desktop screenshots were captured
    - Responsive audit found no horizontal overflow and no button overflow at 320, 390, 768 and 1440 widths
    - Focus-visible and prefers-reduced-motion rules were present
    - Contrast spot checks for primary text, secondary text, primary button, form fields and contact accent text passed the checked thresholds
  Proves:
    - The visual refresh compiles into a production build
    - The refreshed homepage was locally rendered and checked on the required responsive widths
    - The change preserves existing sections while adding controlled visual hierarchy and accent color
  Type: docs-render-verification
  as_of: 2026-07-01T20:14:36+02:00
  Notes: Public VPS HTTPS runtime remains unverified; no deploy, commit, push or remote change was performed.
```

## EV-2026-07-01-002: Portfolio content and project copy refresh

```yaml
- ID: EV-2026-07-01-002
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\content-refresh-2026-07-01\mobile.png
    - C:\Project Toby\tobypelfrene\docs\evidence\content-refresh-2026-07-01\tablet.png
    - C:\Project Toby\tobypelfrene\docs\evidence\content-refresh-2026-07-01\desktop.png
    - C:\Project Toby\tobypelfrene\docs\evidence\content-refresh-2026-07-01\runtime-content-audit.json
  Title: Portfolio content and project copy refresh verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Reworked visible portfolio copy, grouped technical skills, added Dell Fan Controller as a data-driven project card and verified the local Vite runtime.
  Shows:
    - npm.cmd run build completed successfully
    - Runtime rendered Toby Pelfrene with the Aspiring Network & Systems Administrator subtitle
    - Runtime rendered five project cards in the requested order
    - Runtime rendered four Technical Skills groups
    - Runtime kept four Learning Journey cards explicitly marked Planned
    - Runtime link audit found View Projects and Contact Me hash links, existing CV link and noopener noreferrer on external links
    - Responsive audit found no horizontal overflow and no overflowing interactive labels on mobile, tablet and desktop
  Proves:
    - The content refresh compiles into a production build
    - The updated visible portfolio content renders in the local runtime
    - The project/card/link requirements were checked against the rendered page
  Type: docs-render-verification
  as_of: 2026-07-01T20:27:50+02:00
  Notes: LinkedIn blocked automated GET with HTTP 999 during link probing, so the existing user-confirmed URL was preserved; no deploy, commit, push, branch or remote change was performed.
```

## EV-2026-07-01-003: Compact Projects section verification

```yaml
- ID: EV-2026-07-01-003
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\project-compact-2026-07-01\320-visible.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-compact-2026-07-01\1024-visible.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-compact-2026-07-01\1440-visible.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-compact-2026-07-01\project-compact-audit.json
  Title: Compact Projects section responsive verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/#projects
  Action: Reduced project card padding and spacing, switched Projects to a responsive compact grid, limited visible technology badges and verified the rendered section across required breakpoints.
  Shows:
    - npm.cmd run build completed successfully
    - Runtime rendered all five project cards in the required order
    - Runtime used one project card per row at 320, 390 and 768 widths
    - Runtime used two project cards per row at 1024 and 1440 widths
    - Responsive audit found no horizontal overflow and no overflowing interactive labels at 320, 390, 768, 1024 and 1440 widths
    - Technology badges are capped visually with compact more indicators where needed
    - Browser console returned no warnings or errors
  Proves:
    - The compact Projects layout compiles and renders locally
    - The Projects section keeps all projects and required order while reducing visual height
    - The responsive layout remains usable across the requested widths
  Type: docs-render-verification
  as_of: 2026-07-01T20:35:48+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```


## EV-2026-07-01-004: Wide horizontal project banner verification

```yaml
- ID: EV-2026-07-01-004
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\project-banner-2026-07-01\320-projects-visible.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-banner-2026-07-01\1024-projects-visible.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-banner-2026-07-01\1440-projects-visible.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-banner-2026-07-01\project-banner-audit.json
  Title: Wide horizontal project banner responsive verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/#projects
  Action: Replaced the two-card desktop grid with one wide project banner per row and a three-column internal desktop layout.
  Shows:
    - npm.cmd run build completed successfully
    - Runtime rendered all five project cards in the required order
    - Runtime rendered exactly one project card per row at 320, 390, 768, 1024 and 1440 widths
    - Runtime used a single internal column below 1024px and three internal columns at 1024px and 1440px
    - Responsive audit found no horizontal overflow and no overflowing labels at all checked widths
    - Browser console returned no warnings or errors
  Proves:
    - The Projects section now uses wide horizontal banners instead of two side-by-side cards
    - The responsive layout remains readable and usable across the requested widths
    - All project content, order and project accent colors were preserved
  Type: docs-render-verification
  as_of: 2026-07-01T20:44:34+02:00
  Notes: This supersedes the prior two-card desktop interpretation from EV-2026-07-01-003; no deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-005: Future Learning Goals compact section verification

```yaml
- ID: EV-2026-07-01-005
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\future-learning-2026-07-01\runtime-dom-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\future-learning-2026-07-01\future-learning-frame-320-d.png
    - C:\Project Toby\tobypelfrene\docs\evidence\future-learning-2026-07-01\future-learning-frame-390-d.png
    - C:\Project Toby\tobypelfrene\docs\evidence\future-learning-2026-07-01\future-learning-frame-768-b.png
    - C:\Project Toby\tobypelfrene\docs\evidence\future-learning-2026-07-01\future-learning-frame-1024-c.png
    - C:\Project Toby\tobypelfrene\docs\evidence\future-learning-2026-07-01\future-learning-crop-1440.png
  Title: Future Learning Goals compact responsive verification
  Source/System: test | local_http_runtime | edge_headless | screenshot
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Replaced the prominent Learning Journey cards with one compact Future Learning Goals shell and repositioned it below Projects and How I Work.
  Shows:
    - npm.cmd run build completed successfully
    - Runtime DOM rendered Future Learning Goals with the requested long-term certification-target introduction
    - Runtime DOM rendered Cisco CCNA, Microsoft AZ-900, Microsoft MS-900 and Linux Essentials
    - Runtime DOM rendered Long-term goal and Future target labels
    - Runtime DOM did not contain Learning Journey, Certified, Currently preparing, In progress, Exam scheduled, Almost completed or Planned
    - Runtime DOM order was Projects, How I Work, Future Learning Goals, Contact
    - Screenshots were captured at 320, 390, 768, 1024 and 1440 widths
  Proves:
    - The certification targets are now presented as future goals rather than achieved or active certification tracks
    - The section is visually less prominent and more compact than the preceding project and working-style sections
    - The responsive layout remains readable on mobile, tablet and desktop widths
  Type: docs-render-verification
  as_of: 2026-07-01T21:18:00+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-006: Editorial portfolio refresh verification

```yaml
- ID: EV-2026-07-01-006
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\editorial-refresh-2026-07-01\editorial-refresh-audit.json
    - C:\Project Toby\tobypelfrene\docs\evidence\editorial-refresh-2026-07-01\desktop-page-stitched.png
    - C:\Project Toby\tobypelfrene\docs\evidence\editorial-refresh-2026-07-01\hero.png
    - C:\Project Toby\tobypelfrene\docs\evidence\editorial-refresh-2026-07-01\project-row.png
    - C:\Project Toby\tobypelfrene\docs\evidence\editorial-refresh-2026-07-01\about.png
    - C:\Project Toby\tobypelfrene\docs\evidence\editorial-refresh-2026-07-01\mobile-page.png
    - C:\Project Toby\tobypelfrene\docs\evidence\editorial-refresh-2026-07-01\mobile-work.png
  Title: ResumX-inspired editorial portfolio refresh verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Reworked the portfolio from a card-heavy IT layout into a calmer editorial personal portfolio style using only visual inspiration, not copied template assets or layouts.
  Shows:
    - npm.cmd run build completed successfully after the final CSS change
    - Runtime rendered sections in the order top, projects, about, skills, how-i-work, contact
    - Runtime rendered five project rows and four skill categories
    - Runtime removed the contact form and kept direct email, LinkedIn and GitHub links
    - Runtime no longer rendered Project Evidence, Key Highlights, Technologies Used or Learning Journey labels
    - Browser console returned no warnings or errors
    - Responsive audits at 320, 390, 768, 1024 and 1440 widths found no real horizontal overflow
    - Screenshots were captured for full desktop page, hero, one project row, About, mobile page and mobile work view
  Proves:
    - The structural/editorial refresh builds and runs locally
    - The Projects area is now the main Selected Work presentation with editorial project rows
    - The old badge/card-heavy patterns were reduced or removed across the main page
    - The responsive behavior remains usable across the requested widths
  Type: docs-render-verification
  as_of: 2026-07-01T21:55:00+02:00
  Notes: The desktop full-page evidence was stitched from normal viewport screenshots because direct fullPage capture repeated viewport content; no deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-007: Hero spacing and first-section rhythm verification

```yaml
- ID: EV-2026-07-01-007
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-2026-07-01\responsive-audit.json
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-2026-07-01\hero-spacing-390.png
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-2026-07-01\hero-spacing-768.png
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-2026-07-01\hero-spacing-1440.png
  Title: Hero spacing and early Selected Work verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Reduced the editorial hero height and tightened the transition into Selected Work while preserving the new visual direction.
  Shows:
    - npm.cmd run build completed successfully after the spacing changes
    - Runtime at 390, 768, 1024 and 1440 widths reported no real horizontal overflow
    - At 768, 1024 and 1440 widths the hero ended within the first viewport and the Selected Work heading was visible early
    - At 390 width the stacked mobile hero remained overflow-free while keeping the portrait and actions in the hero flow
    - Browser console returned no warnings or errors
  Proves:
    - The desktop and tablet hero no longer behaves like an empty full-viewport section
    - Projects/Selected Work now follows the hero sooner on wider screens
    - The first-page vertical rhythm is tighter without changing project content or site structure
  Type: docs-render-verification
  as_of: 2026-07-01T22:11:00+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-008: Tightened hero-to-project rhythm verification

```yaml
- ID: EV-2026-07-01-008
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-tightened-2026-07-01\responsive-audit.json
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-tightened-2026-07-01\hero-spacing-tightened-390.png
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-tightened-2026-07-01\hero-spacing-tightened-768.png
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-spacing-tightened-2026-07-01\hero-spacing-tightened-1440.png
  Title: Further tightened hero and Selected Work transition verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Further reduced hero spacing, tightened the Selected Work heading layout and brought the first project closer to the first viewport.
  Shows:
    - npm.cmd run build completed successfully after the final spacing changes
    - Runtime at 390, 768, 1024 and 1440 widths reported no real horizontal overflow
    - At 768, 1024 and 1440 widths the Selected Work heading was visible early and the first project was near the first viewport
    - At 1440 width hero height measured 614px and first project top measured 935px, down from the previous 1112px measurement
    - Browser console returned no warnings or errors
  Proves:
    - The first desktop page flow is more compact and professional without reverting the editorial direction
    - The Projects section now follows the hero with less empty-feeling vertical space
    - Responsive behavior remained stable across the requested widths
  Type: docs-render-verification
  as_of: 2026-07-01T22:22:00+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-009: Projects title compactness verification

```yaml
- ID: EV-2026-07-01-009
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\projects-title-compact-2026-07-01\projects-title-audit.json
    - C:\Project Toby\tobypelfrene\docs\evidence\projects-title-compact-2026-07-01\projects-title-1440.png
  Title: Selected Work title compactness verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Reduced only the Projects/Selected Work section title styling while preserving the exact heading text and the rest of the layout.
  Shows:
    - npm.cmd run build completed successfully
    - Runtime heading text remained "Practical projects, built while learning real infrastructure work."
    - At 1024 and 1440 widths the heading measured as two lines, max-width 760px and start-aligned text
    - Runtime reported no real horizontal overflow
    - Browser console returned no warnings or errors
  Proves:
    - The Projects title is visually smaller and no longer competes as strongly with the hero
    - The requested text and surrounding layout were preserved
  Type: docs-render-verification
  as_of: 2026-07-01T22:34:00+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-010: Compact project banner rows verification

```yaml
- ID: EV-2026-07-01-010
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\projects-compact-banners-2026-07-01\projects-banners-audit.json
    - C:\Project Toby\tobypelfrene\docs\evidence\projects-compact-banners-2026-07-01\projects-banners-390.png
    - C:\Project Toby\tobypelfrene\docs\evidence\projects-compact-banners-2026-07-01\projects-banners-768.png
    - C:\Project Toby\tobypelfrene\docs\evidence\projects-compact-banners-2026-07-01\projects-banners-1440.png
  Title: Projects section compact horizontal banner verification
  Source/System: test | local_http_runtime | browser | screenshot
  Route/Page:
    - http://127.0.0.1:5173/#projects
  Action: Reworked only the Projects/Selected Work section CSS into compact horizontal project rows with smaller visuals, tighter row spacing and responsive stacking.
  Shows:
    - npm.cmd run build completed successfully
    - Runtime rendered all five projects in the required order
    - Desktop rows at 1440 width measured about 192-215px tall
    - Tablet rows at 768 width measured about 180-199px tall
    - Runtime at 390, 768, 1024 and 1440 widths reported no real horizontal overflow
    - Browser console returned no warnings or errors
  Proves:
    - Projects now read as lower horizontal banners rather than large showcase sections on desktop and tablet
    - Existing project titles, descriptions, technologies, links and ordering were preserved
    - The responsive project layout remains usable without changing non-project sections
  Type: docs-render-verification
  as_of: 2026-07-01T22:43:00+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-011: About, Skills and How I Work copy and typography verification

```yaml
- ID: EV-2026-07-01-011
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\section-copy-typography-2026-07-01\section-copy-source-check.txt
    - C:\Project Toby\tobypelfrene\docs\evidence\section-copy-typography-2026-07-01\sections-how-edge-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\section-copy-typography-2026-07-01\sections-how-edge-390.png
  Title: About, Skills and How I Work copy and typography update
  Source/System: build | source_check | edge_headless_attempt
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Updated only the About, Skills and How I Work section headings, How I Work principle titles/text and their section-specific typography/grid styling.
  Shows:
    - npm.cmd run build completed successfully
    - Source contains the requested new About, Skills and How I Work headings
    - Source contains Build and test, Document changes and Troubleshoot step by step
    - Source no longer contains the old AI-like or marketing-style heading/principle labels
    - About, Skills and How I Work desktop columns now use minmax(300px, 0.8fr) minmax(0, 1.2fr)
  Proves:
    - The requested copy changes were applied without touching Projects, hero, navigation, contact or footer content
    - The affected section headings have a wider desktop text column and a section-specific heading size
  Type: build-and-source-verification
  as_of: 2026-07-01T22:55:00+02:00
  Notes: In-app browser verification repeatedly timed out in this slice; Edge headless screenshots were attempted but hash-route screenshots landed at the top of the page, so source/build checks are the primary evidence. No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-012: Recruiter-focused content polish verification

```yaml
- ID: EV-2026-07-01-012
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\content-polish-2026-07-01\content-polish-source-check.txt
  Title: Recruiter-focused content polish
  Source/System: build | source_check
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Updated visible portfolio copy and project technology ordering while preserving the existing layout and visual structure.
  Shows:
    - npm.cmd run build completed successfully
    - Hero now uses Network & Systems Administration Student as the single main position line
    - Project descriptions are shorter and project rows render up to five visible technologies
    - About, Skills, How I Work and Contact contain the requested direct recruiter-focused copy
    - Contact shows Email, LinkedIn, GitHub and Download CV links
    - No CSS layout file was edited in this slice
  Proves:
    - The content polish was applied without changing the current page layout direction
    - The update avoids active or achieved certification claims except the requested Education in-progress programme label
  Type: build-and-source-verification
  as_of: 2026-07-01T23:22:52+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-07-01-013: Role positioning text verification

```yaml
- ID: EV-2026-07-01-013
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\role-positioning-2026-07-01\role-positioning-source-check.txt
  Title: Role and IT-direction positioning update
  Source/System: build | state_doc_check | json_ld_parse | source_check
  Route/Page:
    - http://127.0.0.1:5173/
  Action: Updated only role-positioning text across visible portfolio copy, metadata and the CV placeholder.
  Shows:
    - Hero note uses the requested junior network, systems and server administration wording
    - Contact copy uses the requested network administration, systems administration, server infrastructure, IT support, virtualization, storage, backup and data management wording
    - Metadata and JSON-LD align with Network Administration, Systems Administration, Server Administration, IT Infrastructure and IT Support positioning
    - Source search found no Data Analyst, Data Scientist, Data Engineer or Database Administrator wording
    - npm.cmd run build completed successfully
    - python scripts\check_state_docs.py completed successfully
  Proves:
    - The role-positioning update was applied without introducing unsupported data career claims
    - The update remained text-only and did not edit layout or styling files
  Type: build-and-source-verification
  as_of: 2026-07-01T23:29:44+02:00
  Notes: No deploy, commit, push, branch, dependency install or Git remote change was performed.
```

## EV-2026-10-15-001: Light Tech 2.0 local redesign verification

```yaml
- ID: EV-2026-10-15-001
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\runtime-identity.txt
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\build.log
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\home-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\home-768-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\home-375-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\projects-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\light-tech-2026-10-15\projects-375-cdp.png
  Title: Light Tech 2.0 local preview and responsive audit
  Source/System: production_build | local_vite_preview | edge_devtools
  Route/Page:
    - http://127.0.0.1:4174/
    - http://127.0.0.1:4174/projects
  Action: Rebuilt and inspected the redesign at exact 1440, 768 and 375px viewports.
  Shows:
    - Three featured project cards on the homepage and six visible cards on /projects
    - Neither intentionally hidden project title appears on either route
    - No horizontal overflow at the tested viewport widths
    - Both routes, profile JPEG and placeholder HTML CV returned HTTP 200 locally; refreshing /projects kept all six visible cards
    - The homepage mailto link uses tobypelfrene@protonmail.com
  Proves: Local rebuilt preview behavior only; public production, external links and approved PDF remain unverified.
  Type: build-browser-runtime-verification
  as_of: 2026-10-15
  Notes: Source checkout is main at c1338841fd64038daeb642e50c699b8d70d5b317 with uncommitted redesign. Vite preview listener PID 13308 served port 4174. A separate pre-existing listener on 5173 was not used.
```

## EV-2026-10-15-002: Skills and education content verification

```yaml
- ID: EV-2026-10-15-002
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\skills-2026-10-15\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\skills-2026-10-15\home-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\skills-2026-10-15\home-375-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\skills-2026-10-15\projects-1440-cdp.png
  Title: Full curriculum skills and education in the local Light Tech 2.0 preview
  Source/System: production_build | local_vite_preview | edge_devtools | source_data_check
  Route/Page:
    - http://127.0.0.1:4174/
    - http://127.0.0.1:4174/projects
  Action: Updated the four existing skill groups and the existing About education paragraph, then rebuilt and captured the local preview.
  Shows:
    - Four skill groups contain the 37 requested technology items and no skill status labels
    - About displays Network & Systems Administration — IT1.be (2026 – Present) and the requested training description
    - Three featured projects retain their order; six projects remain visible on /projects, including Dell Fan Controller
    - Two intentionally hidden projects remain absent from both routes
    - No horizontal overflow was measured at 1440, 768 and 375px; desktop and mobile screenshots show readable skill text
  Proves: Rebuilt local preview behavior only; production deployment was not performed.
  Type: build-browser-runtime-verification
  as_of: 2026-10-15
  Notes: Source checkout is main at c1338841fd64038daeb642e50c699b8d70d5b317 with pre-existing uncommitted changes. Vite preview listener PID 13308 served port 4174. A separate listener on 5173 was not used.
```

## EV-2026-10-15-003: MC Service Evergem live site screenshot

```yaml
- ID: EV-2026-10-15-003
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\mcservice-screenshots\mcservice-evergem-desktop-1440x900-2x-20261015.png
    - C:\Project Toby\tobypelfrene\docs\evidence\mcservice-screenshots\mcservice-evergem-project-preview-1200x675-20261015.webp
  Title: Real MC Service Evergem homepage captures for portfolio review
  Source/System: live_https_site | Edge_DevTools | Pillow_WebP_export
  Route/Page:
    - https://mcservice-evergem.be/
  Action: Captured the live homepage at 1440x900 CSS pixels with device pixel ratio 2 and made a 16:9 WebP preview from a second 1200x675 browser capture.
  Shows:
    - Real MC Service logo, headline, orange accents and mechanical hero image
    - Loaded fonts and visible images before capture
    - PNG at 2880x1800 and WebP at 1200x675, visually inspected
  Proves: Images depict the live site as seen in the browser on 2026-10-15. They are not integrated into the portfolio.
  Type: live-browser-screenshot
  as_of: 2026-10-15
  Notes: Edge headless served the public HTTPS URL. The first temporary browser profile raised a Windows cache-lock warning during cleanup after a successful capture; saved files were validated. No MC Service or portfolio site changes were made.
```

## EV-2026-10-15-004: MC Service project image integration

```yaml
- ID: EV-2026-10-15-004
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\project-images-2026-10-15\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\project-images-2026-10-15\home-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-images-2026-10-15\home-375-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-images-2026-10-15\projects-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\project-images-2026-10-15\projects-375-cdp.png
  Title: Real MC Service screenshot in existing project cards
  Source/System: production_build | local_vite_preview | edge_devtools
  Route/Page:
    - http://127.0.0.1:4174/
    - http://127.0.0.1:4174/projects
  Action: Added the existing optimized WebP as an optional project image, rebuilt, scrolled to decode the lazy image, and captured both routes at desktop and mobile widths.
  Shows:
    - MC Service Evergem renders the same real screenshot on both routes with descriptive alt text
    - Other cards retain their typographic previews
    - Project visibility and order remain three featured, six visible, and two hidden
    - No horizontal overflow at 1440, 768 or 375px; image zone height remains 165px desktop and 160px mobile
  Proves: Rebuilt local preview behavior only; no public portfolio deployment was performed.
  Type: build-browser-runtime-verification
  as_of: 2026-10-15
  Notes: Source checkout is main at c1338841fd64038daeb642e50c699b8d70d5b317 with pre-existing uncommitted changes. Vite preview listener PID 13308 served port 4174. A separate listener on 5173 was not used.
```
## EV-2026-10-15-005: VPS Infrastructure card update

```yaml
- ID: EV-2026-10-15-005
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\vps-infrastructure-2026-10-15\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\vps-infrastructure-2026-10-15\home-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\vps-infrastructure-2026-10-15\home-375-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\vps-infrastructure-2026-10-15\projects-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\vps-infrastructure-2026-10-15\projects-375-cdp.png
  Title: VPS Infrastructure image and content in the existing cards
  Source/System: user_supplied_png | local_webp_conversion | production_build | local_vite_preview | edge_devtools
  Route/Page:
    - http://127.0.0.1:4174/
    - http://127.0.0.1:4174/projects
  Action: Converted the provided PNG to the requested WebP path, updated only the VPS project record and its no-link note, then rebuilt and captured both routes.
  Shows:
    - VPS and MC Service images decode on both routes with descriptive alt text
    - VPS card displays the supplied description, Linux/Docker/SSH tags and non-clickable private infrastructure note
    - Three featured projects, six visible projects and two hidden projects retain their selection and order
    - No horizontal overflow at 1440, 768 or 375px; image zone height remains 165px desktop and 160px mobile
  Proves: Rebuilt local preview behavior only; no public portfolio deployment was performed.
  Type: build-browser-runtime-verification
  as_of: 2026-10-15
  Notes: The requested WebP path was not found before this slice. The attached PNG supplied by the user was converted without generating new visual content. Docker use is reported by the user in the task brief and was not independently verified against a live VPS. Source checkout is main at c1338841fd64038daeb642e50c699b8d70d5b317 with pre-existing uncommitted changes. Vite preview listener PID 13308 served port 4174.
```

## EV-2026-10-15-006: Subnet Master project image integration

```yaml
- ID: EV-2026-10-15-006
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\subnet-master-2026-10-15\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\subnet-master-2026-10-15\home-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\subnet-master-2026-10-15\home-375-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\subnet-master-2026-10-15\projects-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\subnet-master-2026-10-15\projects-375-cdp.png
  Title: Subnet Master image in the existing project cards
  Source/System: user_supplied_png | production_build | local_vite_preview | edge_devtools
  Route/Page:
    - http://127.0.0.1:4174/
    - http://127.0.0.1:4174/projects
  Action: Copied the exact attached PNG to the requested public image path, added its image metadata to the Subnet Master record, rebuilt and captured both routes.
  Shows:
    - Subnet Master image decodes on both routes at natural resolution 1672x941 with descriptive alt text
    - Other project images, project records, selection and order remain unchanged
    - Three featured projects, six visible projects and two hidden projects retain their selection and order
    - No horizontal overflow at 1440, 768 or 375px; image zone height remains 165px desktop and 160px mobile
  Proves: Rebuilt local preview behavior only; no public portfolio deployment was performed.
  Type: build-browser-runtime-verification
  as_of: 2026-10-15
  Notes: The requested PNG path was absent before this slice. The attached source PNG was copied byte-for-byte (SHA256 2D3ECBC6A865ADDD2F323163CB54E08586F99B972B48908485A375643F778F91). Source checkout is main at c1338841fd64038daeb642e50c699b8d70d5b317 with pre-existing uncommitted changes. Vite preview listener PID 13308 served port 4174.
```

## EV-2026-10-15-007: Hero text and professional positioning

```yaml
- ID: EV-2026-10-15-007
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-positioning-2026-10-15\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-positioning-2026-10-15\home-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-positioning-2026-10-15\home-375-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-positioning-2026-10-15\projects-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\hero-positioning-2026-10-15\projects-375-cdp.png
  Title: Revised Hero text and infrastructure-focused job positioning
  Source/System: production_build | local_vite_preview | edge_devtools
  Route/Page:
    - http://127.0.0.1:4174/
    - http://127.0.0.1:4174/projects
  Action: Updated only Hero, Contact, CV objective and metadata wording; retained IT support in education and technical skills.
  Shows:
    - Exact requested Hero text and matching Contact opportunity text appear in the browser
    - SEO, Open Graph, Twitter and structured-data descriptions no longer position IT support as a sought role
    - Three featured projects, six visible projects and two hidden projects retain their selection and order
    - No horizontal overflow at 1440, 768 or 375px; all project images decode for screenshots
  Proves: Rebuilt local preview behavior only; no public portfolio deployment was performed.
  Type: build-browser-runtime-verification
  as_of: 2026-10-15
  Notes: Source checkout is main at c1338841fd64038daeb642e50c699b8d70d5b317 with pre-existing uncommitted changes. Vite preview listener PID 13308 served port 4174. A separate listener on port 5173 was not used. The downloadable HTML CV remains a placeholder pending final approved PDF.
```

## EV-2026-10-15-008: Public CV PDF integration

```yaml
- ID: EV-2026-10-15-008
  File:
    - C:\Project Toby\tobypelfrene\public\Toby-Pelfrene-CV.pdf
    - C:\Project Toby\tobypelfrene\docs\evidence\cv-integration-2026-10-15\pdf-validation.json
    - C:\Project Toby\tobypelfrene\docs\evidence\cv-integration-2026-10-15\public-cv.png
    - C:\Project Toby\tobypelfrene\docs\evidence\cv-integration-2026-10-15\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\cv-integration-2026-10-15\home-1440-cdp.png
    - C:\Project Toby\tobypelfrene\docs\evidence\cv-integration-2026-10-15\home-375-cdp.png
  Title: Separate public CV with private contact rows removed and verified downloads
  Source/System: user_supplied_pdf | pypdf | poppler | production_build | local_vite_preview | edge_devtools
  Route/Page:
    - http://127.0.0.1:4174/
    - http://127.0.0.1:4174/projects
    - http://127.0.0.1:4174/Toby-Pelfrene-CV.pdf
    - http://127.0.0.1:4174/Toby-Pelfrene-CV.html
  Action: Removed the two private contact text operators into a separate public PDF, excluded source metadata and embedded attachments, updated the three download hrefs, and replaced the HTML placeholder with a PDF link.
  Shows:
    - Source SHA256 unchanged; all other extracted text, images and four contact links retained
    - Public PDF has one A4 page, 97003 bytes, sanitized metadata, no embedded attachments or XMP
    - Rendered pixels are identical outside the two removed contact rows
    - All three buttons download byte-identical PDFs in desktop and mobile browser checks
    - Public file, dist file and HTTP 200 application/pdf response are byte-identical
    - Website screenshots are pixel-identical to the preceding Hero slice on both routes at desktop and mobile widths
    - Project selection and visibility remain unchanged with no horizontal overflow
  Proves: Rebuilt local preview and public PDF contents only; no production deployment occurred.
  Type: pdf-privacy-render-download-verification
  as_of: 2026-10-15
  Notes: The source explicitly attached by the user was found on Desktop; the path inside the pasted brief was absent. The original stays outside the repo. Source PDF structure tags and Content Credentials were not copied into the sanitized document; text remains searchable and the four public contact links remain active. Runtime is this repo on main at c1338841fd64038daeb642e50c699b8d70d5b317, Vite preview PID 13308 on port 4174, rebuilt in this slice. The pre-existing 5173 runtime was not used.
```
## EV-2026-10-23-001: Manuals source collection and local preview

```yaml
- ID: EV-2026-10-23-001
  File:
    - C:\Project Toby\tobypelfrene\docs\MANUALS_SOURCE_AUDIT.md
    - C:\Project Toby\tobypelfrene\src\manuals\manifest.json
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-2026-10-23\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-2026-10-23\overview-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-2026-10-23\overview-375-viewport.png
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-2026-10-23\manual-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-2026-10-23\manual-375-viewport.png
  Title: 62 imported manuals in Toby's IT Knowledge Base
  Source/System: live_source_html | edge_browser | markdown_import | production_build | local_vite_preview
  Route/Page:
    - https://axelhuts.be/mac/
    - http://127.0.0.1:4175/manuals
    - http://127.0.0.1:4175/manuals/ad-domain-controller-install-demote
  Action: Collected all linked manuals, built a native knowledge base and rebuilt the local preview.
  Shows:
    - 62 source cards and 62 accessible source manual pages
    - 62 implemented local document routes with no title/code/table count mismatches
    - Search, category filtering, TOC target, code copy and internal links work
    - Representative long text, tables, code and source-hosted image render
    - No horizontal overflow at 1440px or 375px on representative pages
    - Existing home hero, six projects and CV PDF URL remain available
  Proves: Local rebuilt preview behavior only; no production deployment or line-by-line editorial review.
  Type: source-inventory-build-browser-runtime-verification
  as_of: 2026-10-23
  Notes: Repository C:\Project Toby\tobypelfrene on main at fa505ddb0b02a803e9f90d2f84775af6868e6b3e; Vite preview PID 35592 listened on 127.0.0.1:4175. The worktree was already dirty and remains uncommitted. No source manual PDFs were found.
```

## EV-2026-10-23-002: Remove manuals overview notice

```yaml
- ID: EV-2026-10-23-002
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-notice-2026-10-23\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-notice-2026-10-23\overview-bottom-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-notice-2026-10-23\overview-bottom-375.png
  Title: Manuals overview notice removed without empty notice space
  Source/System: production_build | local_vite_preview | edge_browser
  Route/Page: http://127.0.0.1:4175/manuals
  Action: Removed the requested paragraph/link and its unused CSS.
  Shows:
    - Notice text and element absent at 1440px and 375px
    - 62 manual cards remain; search and category filter return expected results
    - Individual manual attribution remains; no horizontal overflow
  Proves: Rebuilt local preview behavior only; no production deployment.
  Type: build-browser-runtime-verification
  as_of: 2026-10-23
  Notes: Repository C:\Project Toby\tobypelfrene on main at fa505ddb0b02a803e9f90d2f84775af6868e6b3e; rebuilt Vite preview PID 35592 on 127.0.0.1:4175 served index-C81O7Fsg.js. Worktree remains dirty and uncommitted.
```

## EV-2026-10-23-003: Easyhost VPS production deployment

```yaml
- ID: EV-2026-10-23-003
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\deployment-2026-10-23\deployment-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\deployment-2026-10-23\browser-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\deployment-2026-10-23\home-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\deployment-2026-10-23\projects-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\deployment-2026-10-23\manuals-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\deployment-2026-10-23\manuals-375.png
  Title: Current Light Tech 2.0 build deployed and verified on tobypelfrene.be
  Source/System: local_vite_build | tar_scp_ssh | nginx | direct_vps_https | edge_browser
  Route/Page:
    - https://tobypelfrene.be/
    - https://tobypelfrene.be/projects/
    - https://tobypelfrene.be/manuals
    - https://tobypelfrene.be/Toby-Pelfrene-CV.pdf
  Action: Built locally, archived, uploaded, backed up existing webroot, extracted into the verified webroot, tested and reloaded NGINX, then checked direct HTTPS and live browser behavior.
  Shows:
    - Local and uploaded archive SHA256 matched; required files including projects/index.html were present
    - Backup /var/www/tobypelfrene-backup-20261023-114738 matched the predeploy webroot
    - NGINX root and direct HTTPS index matched /var/www/tobypelfrene/index.html after deployment
    - Direct VPS HEAD returned HTTP 200 for all four required URLs; /projects/ was not 403
    - Live browser showed six projects, loaded project images, 62 manuals, search/filter, absent overview notice and individual attribution
  Proves: The specified artifact was served from the existing Easyhost VPS at the public HTTPS domain on 2026-10-23. No rollback was needed.
  Type: production-deployment-runtime-browser-verification
  as_of: 2026-10-23
  Notes: Repo C:\Project Toby\tobypelfrene, main at fa505ddb0b02a803e9f90d2f84775af6868e6b3e. NGINX on host cloud (Ubuntu 22.04.5 LTS) served /var/www/tobypelfrene at 136.144.222.226:443. Build was rebuilt in this slice. Worktree remains dirty; no commit or GitHub push.
```

## EV-2026-10-23-004: Manual source labels removed and live deployment

```yaml
- ID: EV-2026-10-23-004
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-source-labels-2026-10-23\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-source-labels-2026-10-23\live-runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-source-labels-2026-10-23\deployment-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-source-labels-2026-10-23\overview-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-source-labels-2026-10-23\live-overview-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-source-labels-2026-10-23\live-manual-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\manuals-source-labels-2026-10-23\live-manual-375.png
  Title: All 62 manuals without visible source attribution on production
  Source/System: local_vite_build | tar_scp_ssh | nginx | direct_vps_https | edge_browser
  Route/Page:
    - https://tobypelfrene.be/manuals
    - https://tobypelfrene.be/manuals/cisco-etherchannel
    - https://tobypelfrene.be/projects/
  Action: Removed visible source labels after owner-reported explicit permission, retained internal provenance, rebuilt, backed up and deployed.
  Shows:
    - Local and remote archive SHA256 matched; backup diff showed no differences
    - NGINX test and reload passed; webroot index hash matched direct VPS HTTPS response
    - Five direct HTTPS routes returned 200, including /projects/ and the CV
    - Live Edge checked all 62 manual routes with no visible source names or links
    - Search and filter worked; code and tables remained; projects images loaded; mobile had no overflow
  Proves: The rebuilt artifact was served on the existing VPS and the requested visible-label removal was verified in a live browser on 2026-10-23.
  Type: production-deployment-runtime-browser-verification
  as_of: 2026-10-23
  Notes: Repo C:\Project Toby\tobypelfrene, main at fa505ddb0b02a803e9f90d2f84775af6868e6b3e. Backup /var/www/tobypelfrene-backup-20261023-120224. Owner-reported permission is not independently verified. No rollback, commit or GitHub push.
```

## EV-2026-10-23-005: Custom TP favicon verified locally

```yaml
- ID: EV-2026-10-23-005
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\tp-favicon-2026-10-23\runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\tp-favicon-2026-10-23\favicon-svg-edge.png
    - C:\Project Toby\tobypelfrene\docs\evidence\tp-favicon-2026-10-23\manuals-with-favicon-head.png
  Title: TP favicon in rebuilt local portfolio preview
  Source/System: supplied_downloads_kit | production_build | local_vite_preview | edge_browser
  Route/Page: http://127.0.0.1:4182/
  Action: Copied five valid icon files to public and added versioned icon links to index.html.
  Shows:
    - TypeScript and Vite build passed; all five icons in dist match their public sources
    - Edge displayed the TP SVG; all five icon URLs returned 200 with bytes matching dist
    - Home, projects, manuals and a detail page render with five icon links
    - All 62 manual URLs returned 200 with the shared favicon links
  Proves: The local rebuilt site serves and renders the new TP favicon; production was not changed.
  Type: build-browser-runtime-verification
  as_of: 2026-10-23
  Notes: Repo C:\Project Toby\tobypelfrene on main at fa505ddb0b02a803e9f90d2f84775af6868e6b3e; node.exe PID 37832 served the rebuilt dist on 127.0.0.1:4182. Worktree remains dirty; no commit, push or VPS deployment.
```

## EV-2026-10-23-006: GitHub sync and TP favicon production release

```yaml
- ID: EV-2026-10-23-006
  File:
    - C:\Project Toby\tobypelfrene\docs\evidence\release-2026-10-23\deployment-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\release-2026-10-23\local-runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\release-2026-10-23\live-runtime-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\release-2026-10-23\live-favicon-check.json
    - C:\Project Toby\tobypelfrene\docs\evidence\release-2026-10-23\live-favicon-svg-edge.png
    - C:\Project Toby\tobypelfrene\docs\evidence\release-2026-10-23\live-overview-1440.png
    - C:\Project Toby\tobypelfrene\docs\evidence\release-2026-10-23\live-manual-375.png
  Title: Manuals and TP favicon pushed to GitHub and deployed to production
  Source/System: git_origin_main | local_vite_build | tar_scp_ssh | nginx | direct_vps_https | edge_browser
  Route/Page:
    - https://tobypelfrene.be/
    - https://tobypelfrene.be/projects/
    - https://tobypelfrene.be/manuals
    - https://tobypelfrene.be/favicon.svg
  Action: Committed reviewed source, verified the origin/main SHA, backed up the prior webroot, deployed the validated archive and checked live routes and behavior.
  Shows:
    - Source commit bcfa737b1c36c158b60dc5c50194de13c71caa59 matched origin/main
    - Local and remote archive SHA256 matched; backup /var/www/tobypelfrene-backup-20261023-124250 matched previous site
    - NGINX test and reload passed; local dist, webroot and direct HTTPS index SHA256 matched
    - Home, /projects/, /manuals, detail, CV and all five favicon assets returned 200 from the VPS
    - Edge verified 62 manual routes, search/filter, six projects, loaded images, mobile width and rendered TP SVG
  Proves: The GitHub source commit produced the verified artifact served from the existing Easyhost VPS on 2026-10-23.
  Type: github-sync-production-deployment-runtime-browser-verification
  as_of: 2026-10-23
  Notes: Repo C:\Project Toby\tobypelfrene on main. Owner-reported explicit public GitHub redistribution permission is recorded in docs/MANUALS_SOURCE_AUDIT.md. No rollback or unrelated service change; evidence and archive remain local and untracked.
```
