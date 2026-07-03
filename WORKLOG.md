# WORKLOG

**Purpose:** Append-only history for completed work.

Use this file for dated session notes, verification summaries, and references to evidence artifacts.

## 2026-06-10 - Initialize from StateDD template

- Cloned `https://github.com/lennertvhoy/StateDD_Template` into `C:\Users\Admin\opencode\new\tobypelfrene`.
- Removed the cloned upstream `.git` directory.
- Ran `python scripts/init_template.py new --name "tobypelfrene"` to stamp the scaffold in bootstrap mode.
- Initialized a fresh local Git repository on branch `main` with no commits and no remote configured.
- Verified `python scripts/check_state_docs.py` and `python scripts/test_init_template.py` passed.
- Bootstrap remains incomplete pending project intake: product identity, primary user, first milestone, target runtime, constraints, and blocker are still unknown.

## 2026-06-10 - Build Toby Pelfrene portfolio

- Implemented a React, TypeScript, TailwindCSS and Vite personal portfolio for Toby Pelfrene.
- Added hero, about, skills, projects, timeline, certifications, contact form and footer sections.
- Added SEO metadata, Open Graph tags, Twitter card metadata and structured Person data in `index.html`.
- Added a downloadable CV placeholder at `public/Toby-Pelfrene-CV.html`.
- Ran `npm.cmd install`; npm reported zero vulnerabilities.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified Vite preview served `http://127.0.0.1:4173/` and `http://127.0.0.1:4173/Toby-Pelfrene-CV.html` with HTTP 200.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-001`.
- Remaining unknowns: final public contact details, final CV artifact, production VPS target and HTTPS runtime identity.

## 2026-06-10 - Update Certifications to Learning Journey

- Renamed the user-facing Certifications section to Learning Journey.
- Updated the section subtitle to: "Building practical experience through real-world projects while preparing for future industry certifications."
- Replaced the certification cards with planned learning targets: Cisco CCNA (Planned), Microsoft AZ-900 (Planned), Microsoft MS-900 (Planned) and Linux Essentials (Planned).
- Added supporting card copy that communicates current practical growth and future certification goals without presenting certifications as completed achievements.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified Vite preview served `http://127.0.0.1:4173/` with HTTP 200.
- Verified the rendered section in a headless Edge browser and captured screenshot/DOM evidence.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-002`.

## 2026-06-10 - Refine portfolio for IT support and administration applications

- Added a Current Focus section near the top of the homepage.
- Reworked Skills into stronger recruiter-readable category cards with visible badges and currently improving labels.
- Expanded Projects into larger cards with Problem, Solution, Technologies used and What I learned.
- Reframed the former public finance-related project as `Infrastructure Automation Platform` and removed public finance/trading framing from source, README and CV placeholder content.
- Added a subtle Why Hire Me section focused on practical projects, structured work, troubleshooting and active development toward IT support, network administration and systems administration roles.
- Cleaned the footer to show Toby Pelfrene, Network & Systems Administration, LinkedIn, GitHub and `© 2025 Toby Pelfrene` without footer email.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified no forbidden public terms were found in `src`, `public`, `index.html` or `README.md` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-003`.

## 2026-06-10 - Refactor projects for recruiter scanning

- Replaced the category-card Skills section with a prominent badge grid for Linux, Windows Server, Networking, TCP/IP, Subnetting, VLSM, DNS, DHCP, Active Directory, PowerShell, Python, Git, GitHub Actions, Nginx, Cloudflare and VPS Management.
- Refactored Projects to a single-column desktop layout with wider cards and increased whitespace.
- Removed public Project card subsections for Problem, Solution and What I Learned.
- Replaced long project case-study content with short summaries, Skills Demonstrated and technology badges.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified no forbidden public terms and no removed project case-study labels were found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-004`.

## 2026-06-10 - Compact Technical Skills section

- Renamed the Skills section title to `Technical Skills`.
- Removed the descriptive paragraph below the Skills title.
- Reduced section vertical spacing and converted the skill display into smaller compact badges.
- Updated the responsive grid to show dense multi-column badges, including six columns on large desktop screens.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified `python scripts/check_state_docs.py` passed.
- Verified no requested forbidden public terms were found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-005`.

## 2026-06-10 - Update Technical Skills badge list

- Updated the Technical Skills badge list to include Windows Server, Active Directory, DNS & DHCP, Windows 11, Linux, Cisco Networking (CCNA), PowerShell, Virtualization, Microsoft 365, Exchange Server, Intune, Microsoft Azure, Azure Virtual Desktop, Security Fundamentals, Backup & Recovery, Troubleshooting, TCP/IP Networking and Subnetting & VLSM.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified `python scripts/check_state_docs.py` passed.
- Verified no requested forbidden public terms were found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-006`.

## 2026-06-10 - Refactor right-side hero card to About Me

- Replaced the right-side hero card with a recruiter-focused About Me card.
- Removed the old Current focus, Learning actively, focus item list and Working style content from the hero card.
- Added short About Me paragraphs covering IT1.be Network & Systems Administration training, practical project experience and target IT support/system/network administration opportunities.
- Added highlighted Education and Core Technologies blocks.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified removed hero-card terms and requested forbidden public terms were not found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-007`.

## 2026-06-10 - Update hero positioning for recruiter readability

- Replaced the hero subtitle with `Junior IT Professional`.
- Replaced the hero summary with practical experience wording around system administration, networking, cloud technologies and automation.
- Updated the three hero focus cards to Infrastructure, System Administration and Automation with shorter subtitles.
- Shortened the About Me close with current opportunity targeting.
- Renamed the About Me highlight label to `Education & Training`.
- Expanded hero Core Technologies to include Intune, DNS, DHCP and TCP/IP.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified `python scripts/check_state_docs.py` passed.
- Verified replaced old hero text and requested forbidden public terms were not found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-008`.

## 2026-06-10 - Optimize homepage for recruiter scanning

- Reordered the homepage flow so Technical Skills appears immediately after the hero and before Projects.
- Removed the separate long About section from the rendered page because the hero now contains the concise About Me card.
- Simplified Current Focus to compact badges only.
- Updated navigation to prioritize Skills, Projects, LinkedIn and CV.
- Reworked Projects into wide, cleaner cards with one-sentence summaries, technology badges, three highlights and an expandable Learn More section for detail.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified removed long project labels and requested forbidden public terms were not found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-009`.

## 2026-06-10 - Add hero profile photo slot

- Added a circular profile image to the top of the right-side hero About Me card.
- Styled the image with object-cover, a subtle border, blue accent glow and responsive desktop/mobile sizing.
- Used the expected public asset path `/toby-pelfrene-profile.jpg`.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified no requested forbidden public terms were found in `src` using the Grep tool.
- Verified `public/toby-pelfrene-profile.jpg` is not currently present, so rendered image verification remains pending until the asset exists.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-010`.

## 2026-06-10 - Update hero CTA priority and social links

- Replaced the About Me text with concise recruiter-focused copy.
- Made `Download CV` the primary hero CTA and reordered hero buttons to Download CV, LinkedIn, View Projects and Contact Me.
- Added a LinkedIn hero CTA that opens in a new tab.
- Updated central contact links to `https://www.linkedin.com/in/toby-pelfrene-1a9365323/` and `https://github.com/tobypelfrene1993`.
- Added compact LinkedIn and GitHub links below the profile photo inside the right-side hero card.
- Increased profile image sizing by roughly 15-20% while preserving circular styling, border and blue glow.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified old hero copy and old contact URLs were not found in `src` using the Grep tool.
- Verified requested forbidden public terms were not found in `src` using the Grep tool.
- Verified `public/toby-pelfrene-profile.jpg` exists and `dist/toby-pelfrene-profile.jpg` was present after the production build.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-011`.

## 2026-06-10 - Refine right-side hero card layout

- Removed the LinkedIn and GitHub buttons underneath the profile photo in the right-side hero card.
- Reordered the card to read naturally as profile photo, About Me, Education & Training and Core Technologies.
- Increased spacing between the profile photo and About Me section, and between About Me and Education & Training.
- Removed now-unused social-link CSS.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified removed social-button code and requested forbidden public terms were not found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-012`.

## 2026-06-10 - Clean Current Focus section

- Removed the `Fast recruiter scan` helper text from the Current Focus section.
- Centered the Current Focus label above the badge grid to reduce visual noise.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the removed helper text and requested forbidden public terms were not found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-013`.

## 2026-06-10 - Update About Me security interest copy

- Added a concise About Me paragraph stating interest in infrastructure security, network security and security best practices alongside systems administration and networking.
- Preserved the existing hero card styling and paragraph spacing.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the new About Me security-interest text exists in `src/App.tsx` using the Grep tool.
- Verified requested forbidden public terms were not found in `src` using the Grep tool.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-10-014`.

## 2026-06-12 - Refresh color style lighter and friendlier

- Updated the global palette toward lighter dark navy/slate-blue backgrounds, softer blue-gray gradients and brighter text contrast.
- Lightened card surfaces, section wrappers, borders, badges, form fields and contact/project UI while keeping the site in a dark modern IT style.
- Refreshed the primary CTA and badge accents toward softer sky-blue tones.
- Adjusted the mobile hero width and title sizing to avoid clipping in the captured 390px viewport.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified local Vite preview at `http://127.0.0.1:4173/` with headless Edge desktop and mobile screenshots.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-06-12-001`.

## 2026-07-01 - Professional colorful dark IT visual refresh

- Added centralized CSS color tokens for the page background, section backgrounds, cards, borders, primary blue, secondary turquoise, warm highlight, text and muted text.
- Added controlled visual accents to the hero, profile photo ring, primary CTA, focus cards, skills, project cards, Why Hire Me cards, Learning Journey cards and contact form/link states.
- Preserved existing website copy, personal details and section structure.
- Added visible focus styling and kept the existing reduced-motion support.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/` with browser screenshots at 320px, mobile, tablet and desktop widths.
- Verified the responsive audit reported no horizontal overflow and no button overflow at 320, 390, 768 and 1440 widths.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-001`.
- No commit, push, deployment or Git remote change was performed.

## 2026-07-01 - Portfolio content and project copy refresh

- Rewrote the hero, About Me, education, Core Technologies, Current Focus, Projects, How I Work, Learning Journey and Contact copy for junior IT support, network administration, systems administration and infrastructure support positioning.
- Converted Technical Skills into grouped categories for Networking, Systems, Infrastructure and Automation and Development.
- Added Dell Fan Controller as a data-driven project card with safety-focused PowerShell, monitoring, validation and recovery wording.
- Updated project order to Subnet Master, Dell Fan Controller, VPS Infrastructure, Infrastructure Automation Platform and Automation Systems.
- Updated project labels, statuses and external link attributes for consistent terminology and safer new-tab behavior.
- Updated metadata and structured data to match the Aspiring Network & Systems Administrator positioning.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/` with browser DOM checks and mobile, tablet and desktop screenshots.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-002`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Compact Projects section layout

- Reduced project card padding, spacing, title sizing, highlight badge size, technology badge size and action button height.
- Changed the Projects card layout to one column on mobile/tablet and two columns from desktop-width layouts where the content remains readable.
- Kept all five projects and the required order: Subnet Master, Dell Fan Controller, VPS Infrastructure, Infrastructure Automation Platform and Automation Systems.
- Limited visible technology badges to the first five technologies plus compact `+N more` indicators where needed.
- Kept Learn More as a compact disclosure instead of a fake page link.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/#projects` across 320, 390, 768, 1024 and 1440 widths with no horizontal overflow or overflowing interactive labels.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-003`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Correct Projects layout to wide horizontal banners

- Replaced the previous two-card desktop layout with one wide project banner per row.
- Reworked each project card internally into left, middle and right desktop columns for project summary/actions, key highlights and technologies/Learn More.
- Kept all five projects, the required order, project accent colors and existing project information.
- Kept mobile/tablet layouts stacked and readable while using three internal columns from 1024px upward.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/#projects` across 320, 390, 768, 1024 and 1440 widths with no horizontal overflow or overflowing labels.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-004`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Compact Future Learning Goals section

- Renamed the former Learning Journey section to Future Learning Goals.
- Replaced four large certification cards with one compact dark/premium shell containing four small future-goal items.
- Updated certification copy to frame Cisco CCNA, Microsoft AZ-900, Microsoft MS-900 and Linux Essentials as long-term goals or future targets.
- Removed visible `Planned` wording from the certification goals and replaced the hero education `In progress` phrase with `Currently studying`.
- Kept the section after Projects and How I Work and before Contact.
- Tuned the responsive layout so the goals stack on mobile, use two columns on tablet and fit in a compact horizontal desktop shell.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/` with Edge headless DOM evidence and screenshots at 320, 390, 768, 1024 and 1440 widths.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-005`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - ResumX-inspired editorial portfolio refresh

- Reworked the portfolio structure into a calmer editorial personal website while keeping React, TypeScript, Vite, existing project data and existing links.
- Simplified navigation to About, Work, Skills and Contact.
- Rebuilt the hero around Toby Pelfrene, the Network & Systems Administrator positioning, one larger profile image, two primary actions and smaller secondary links.
- Removed the three hero focus cards and the old hero card-within-card presentation.
- Replaced the Projects card layout with Selected Work editorial project rows, alternating preview/text position on desktop and stacking image above text on mobile.
- Removed visible project labels such as Project Evidence, Key Highlights and Technologies Used.
- Replaced the skill badge wall with four quiet skill categories.
- Replaced five numbered How I Work cards with three text principles.
- Moved future certification information into About as a single future-learning line.
- Removed the contact form and kept direct email, LinkedIn and GitHub contact links.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/` with browser console checks, DOM checks, responsive checks at 320, 390, 768, 1024 and 1440 widths and screenshots.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-006`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Editorial hero spacing correction

- Reduced the editorial hero vertical footprint by removing the viewport-height behavior and tightening hero padding, gaps, title spacing, action spacing and portrait width.
- Moved the Projects/Selected Work section closer to the hero by reducing top padding and project-list lead-in spacing.
- Shifted the stacked mobile/tablet breakpoint from 900px to 760px so 768px uses the more compact two-column hero layout.
- Preserved the ResumX-inspired editorial direction, dark visual style, project content and page structure.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/` across 390, 768, 1024 and 1440 widths with no horizontal overflow and no console warnings or errors.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-007`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Tightened hero-to-project rhythm

- Further reduced hero padding, internal gaps, hero title sizing and profile image width for a more compact first viewport.
- Tightened the Selected Work heading layout, reduced its maximum display size and reduced the lead-in margin before the first project row.
- Kept the ResumX-inspired editorial direction, dark base, personal tone and existing project content intact.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/` across 390, 768, 1024 and 1440 widths with no horizontal overflow and no console warnings or errors.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-008`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Compact Selected Work title

- Reduced only the Projects/Selected Work heading size, line-height, letter spacing and maximum width.
- Preserved the exact heading text: `Practical projects, built while learning real infrastructure work.`
- Left the surrounding layout and section content unchanged.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/` at 1024 and 1440 widths; the heading remained start-aligned, measured as two lines and reported no horizontal overflow.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-009`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Compact project banner rows

- Reworked only the Projects/Selected Work styling into compact horizontal project rows.
- Reduced project visual size, preview padding, preview typography, row padding and list spacing.
- Replaced alternating desktop order with consistent visual, content, technologies and actions scanning order.
- Preserved all five project titles, descriptions, technologies, links and the existing project order.
- Added responsive Projects rules so tablet remains compact and mobile stacks without horizontal overflow.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified the local Vite runtime at `http://127.0.0.1:5173/#projects` at 390, 768, 1024 and 1440 widths with no horizontal overflow and no console warnings or errors.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-010`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - About, Skills and How I Work copy and typography

- Updated only the About, Skills and How I Work section headings to shorter, more direct text.
- Replaced How I Work principle titles with Build and test, Document changes and Troubleshoot step by step.
- Rewrote the three principle descriptions in simpler, factual wording.
- Removed the split-heading treatment from How I Work so the heading no longer breaks unnaturally.
- Made the About, Skills and How I Work left columns wider on desktop and added a section-specific heading size.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified source contains the new requested copy and no longer contains the old marketing-style heading/principle text.
- Browser screenshot verification was attempted, but the in-app browser timed out and Edge headless hash-route screenshots landed at the page top; this limitation is recorded in `EV-2026-07-01-011`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Recruiter-focused content polish

- Updated visible content in the hero, project descriptions, About, Skills, How I Work and Contact sections for clearer recruiter scanability.
- Preserved the current layout and visual structure; no CSS file was edited in this slice.
- Kept all five projects, their order, links and underlying project details.
- Reordered project technology data so the existing project rows show up to five concise technologies per project.
- Added Download CV to the existing Contact link group alongside Email, LinkedIn and GitHub.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified source contains the requested direct copy and no banned active-certification wording beyond the requested Education `In progress` label.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-012`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.

## 2026-07-01 - Role positioning text update

- Updated only role and IT-direction wording in the hero note, hero text, About, Contact, footer, metadata, README and CV placeholder.
- Replaced the broad `Open to junior IT opportunities` wording with network, systems and server administration positioning.
- Added consistent wording for IT Infrastructure, Virtualization, Storage, Backup and Recovery, Data Management and IT Support.
- Confirmed no Data Analyst, Data Scientist, Data Engineer or Database Administrator wording was introduced.
- Verified JSON-LD in `index.html` parses successfully.
- Verified `npm.cmd run build` successfully generated `dist/`.
- Verified `python scripts\check_state_docs.py` passed with UTF-8 output enabled for the shell process.
- Recorded evidence in `docs/EVIDENCE_LOG.md` as `EV-2026-07-01-013`.
- No dependencies, commit, push, branch, deployment or Git remote change was performed.
