# Maintaining Toby's IT Knowledge Base

## Add an original manual

1. Create `src/manuals/content/<unique-slug>.md`. Use Markdown headings, fenced code blocks, GFM tables, and descriptive image alt text. Keep commands exactly as intended.
2. Add one record to `src/manuals/manifest.json` with `slug`, `title`, `category`, `tags`, `excerpt`, `status: "collected"`, `wordCount`, and `origin: "original"`. A `sourceUrl` is optional for original work. Imported material uses `origin: "imported"` and requires its source URL. The overview and document page display this distinction.
3. Put images you own or may rehost in `public/manuals/` and reference `/manuals/<filename>`. For other images, use an attributed remote URL only where permitted. Give images intrinsic dimensions where practical.
4. If a PDF is permitted, put it in `public/manuals/` and list its path in the manifest `pdfs` array. If local hosting is not permitted, use an attributed external URL. PDF view and download links are generated from this field.
5. Run `npm.cmd run build`, preview locally, and check the direct `/manuals/<slug>` route, search, filters, code, tables, image loading, links, and mobile width.

Markdown is rendered by `react-markdown` with GFM support. Raw HTML is not rendered; never enable raw HTML or execute imported scripts. Keep internal source provenance and imported/original distinctions clear. The owner reports explicit permission to show this 62-manual collection without visible attribution; check the terms separately for any future additions.

## Refresh an Axel manual

`scripts/collect_manuals.py` is a reviewable importer for the public M.A.C. index. It uses `requests`, `beautifulsoup4`, and `markdownify` as local Python tooling. It requests pages sequentially at roughly one page per second and writes the manifest, Markdown, and audit. Re-running it overwrites imported Markdown, so first review source changes and preserve any local corrections. Compare the new inventory to `docs/MANUALS_SOURCE_AUDIT.md`; inspect code blocks and unusual content such as interactive checklists before accepting the conversion. The importer stores source-hosted image links and transcribes HTML concept maps into text.

No source PDFs were found in the 62 manuals audited on 2026-10-23. PDF UI is therefore ready for future permitted content but has not been exercised with a source PDF.
