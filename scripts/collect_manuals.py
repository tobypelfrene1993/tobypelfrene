"""One-time, reviewable importer for Axel Huts's public M.A.C. manuals.

Run with: python -m pip install requests beautifulsoup4 markdownify
          python scripts/collect_manuals.py
The author has granted the site owner permission to reuse his manuals. Review
the generated Markdown and audit before publishing any update.
"""
from __future__ import annotations

import json
import re
import time
from collections import Counter
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from markdownify import markdownify

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "manuals" / "content"
AUDIT = ROOT / "docs" / "MANUALS_SOURCE_AUDIT.md"
BASE = "https://axelhuts.be"
INDEX = BASE + "/mac/"

session = requests.Session()
session.headers["User-Agent"] = "TobyPelfrene-ManualsAudit/1.0 (educational import; 1 request/sec)"


def fetch(url: str) -> BeautifulSoup:
    for attempt in range(3):
        response = session.get(url, timeout=30)
        response.encoding = "utf-8"
        if response.status_code == 200 and BeautifulSoup(response.text, "html.parser").find("main"):
            return BeautifulSoup(response.text, "html.parser")
        if attempt < 2:
            time.sleep(3 * (attempt + 1))
    raise RuntimeError(f"{url}: HTTP {response.status_code}, no usable main element")


def clean_document(node: BeautifulSoup, source_url: str) -> str:
    for el in node.select("script, style, .nav-back-link, .doc-header"):
        el.decompose()
    for figure in node.select(".concept-visual"):
        core = figure.select_one(".concept-core")
        spokes = [x.get_text(" ", strip=True) for x in figure.select(".concept-spoke")]
        if core:
            replacement = node.new_tag("blockquote")
            replacement.append("Concept map: " + core.get_text(" ", strip=True))
            for spoke in spokes:
                item = node.new_tag("p")
                item.string = spoke
                replacement.append(item)
            figure.replace_with(replacement)
    for label in node.select("label.checklist-item"):
        question = label.select_one(".check-question")
        detail = label.select_one(".check-desc")
        item = node.new_tag("p")
        item.string = "☐ " + (question.get_text(" ", strip=True) if question else "") + (" — " + detail.get_text(" ", strip=True) if detail else "")
        label.replace_with(item)
    for controls in node.select(".btn-check-section"):
        controls.parent.decompose()
    for button in node.select("button"):
        button.decompose()
    for image in node.select("img[src]"):
        image["src"] = urljoin(source_url, image["src"])
    for anchor in node.select("a[href]"):
        anchor["href"] = urljoin(source_url, anchor["href"])
    for pre in node.select("pre"):
        code = pre.select_one("code")
        if code:
            code.string = code.get_text().rstrip("\n")
    result = markdownify(str(node), heading_style="ATX", bullets="-", strip=["button"])
    result = re.sub(r"\n{3,}", "\n\n", result).strip() + "\n"
    # Literal CLI placeholders such as <DomainName> must not be parsed as HTML.
    fenced = False
    safe_lines = []
    for line in result.splitlines():
        if line.startswith("```"):
            fenced = not fenced
        elif not fenced:
            parts = re.split(r"(`[^`]*`)", line)
            line = "".join(part if part.startswith("`") else re.sub(
                r"<([A-Za-z][A-Za-z0-9_-]*)>", r"\\<\1>", part) for part in parts)
        safe_lines.append(line)
    result = "\n".join(safe_lines) + "\n"
    for sample_secret in ("YourP@ssword", "MySecurePassword", "Azerty01!",
                          "SecureConsolePass123!", "SecureVTYPass123!", "EnableSecretPass123!", "P@ssw0rd1"):
        result = result.replace(sample_secret, "CHANGE_ME_STRONG_SECRET")
    result = result.replace("username Joske secret", "username admin secret")
    result = result.replace("snmp-server community CCNA ro", "snmp-server community CHANGE_ME_COMMUNITY ro")
    return result


def main() -> None:
    index = fetch(INDEX)
    cards = index.select("article.manual-card")
    assert len(cards) == 62, f"Source index changed: {len(cards)} cards"
    OUT.mkdir(parents=True, exist_ok=True)
    records = []
    errors = []
    for n, card in enumerate(cards, 1):
        link = card.select_one('a[href^="/mac/"]')
        title = card.select_one(".manual-title").get_text(" ", strip=True)
        category = card.select_one(".manual-section").get_text(" ", strip=True)
        source = urljoin(BASE, link["href"])
        slug = urlparse(source).path.rstrip("/").split("/")[-1]
        tags = card.get("data-tags", "").split()
        excerpt = card.get("data-excerpt", "")
        try:
            page = fetch(source + "/")
            main_el = page.find("main")
            doc = next((child for child in main_el.find_all(recursive=False)
                        if child.name == "div" and child.find("h1")), None)
            if not doc:
                raise RuntimeError("document body not found")
            sections = [h.get_text(" ", strip=True) for h in doc.find_all(["h2", "h3", "h4"])]
            images = [{"url": urljoin(source, img["src"]), "alt": img.get("alt", "")}
                      for img in doc.select("img[src]")]
            diagrams = len(doc.select(".concept-visual, svg"))
            pdfs = [urljoin(source, a["href"]) for a in doc.select('a[href*=".pdf"]')]
            links = [urljoin(source, a["href"]) for a in doc.select("a[href]")]
            internal = sorted(set(x for x in links if urlparse(x).netloc == "axelhuts.be" and x != source))
            external = sorted(set(x for x in links if urlparse(x).netloc not in ("", "axelhuts.be")))
            code_count = len(doc.select("pre"))
            table_count = len(doc.select("table"))
            content = clean_document(doc, source)
            (OUT / f"{slug}.md").write_text(content, encoding="utf-8")
            records.append({"slug": slug, "title": title, "category": category, "origin": "imported", "tags": tags,
                            "excerpt": excerpt, "sourceUrl": source, "wordCount": len(content.split()),
                            "sectionCount": len(sections), "codeBlocks": code_count, "tables": table_count,
                            "diagrams": diagrams, "images": images, "pdfs": pdfs,
                            "internalLinks": internal, "externalLinks": external,
                            "status": "collected", "format": "HTML"})
            print(f"{n:02d}/{len(cards)} {slug}: {len(content.split())} words")
        except Exception as exc:
            errors.append((slug, str(exc)))
            records.append({"slug": slug, "title": title, "category": category, "origin": "imported", "tags": tags,
                            "excerpt": excerpt, "sourceUrl": source, "status": "inaccessible", "reason": str(exc)})
            print(f"{n:02d}/{len(cards)} {slug}: ERROR {exc}")
        time.sleep(1)
    (ROOT / "src" / "manuals" / "manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lines = ["# M.A.C. manuals source audit", "", f"Source index: {INDEX}",
             "Audited: 2026-10-23. The index listed 62 cards at collection time.",
             "The site's category codes are preserved exactly. Estimated size is the imported Markdown word count.",
             "The owner reports permission from Axel Huts to reuse Axel's own manuals; asset rights were not independently verified.",
             "Source images remain linked to Axel's host and are not copied into this repository.", "",
             f"Discovered: {len(cards)}. Collected: {sum(x['status']=='collected' for x in records)}. Inaccessible: {len(errors)}.",
             "No PDF links were found in these manual document bodies. The unrelated source CV PDF is out of scope.",
             "No pagination or nested manual index was present in the fetched index HTML; each card linked directly to a document.",
             "The index provides title/keyword/tag search. The source mobile menu and search interaction were not browser-verified by this importer.", "",
             "| # | Original title / URL | Category | Format / size | Images / diagrams | Code / tables | Downloads | Links | Status |",
             "|---:|---|---|---|---|---|---|---|---|"]
    for i, x in enumerate(records, 1):
        if x["status"] == "collected":
            links = f"{len(x['internalLinks'])} internal, {len(x['externalLinks'])} external"
            lines.append(f"| {i} | [{x['title']}]({x['sourceUrl']}) | {x['category']} | HTML / ~{x['wordCount']} words | {len(x['images'])} / {x['diagrams']} | {x['codeBlocks']} / {x['tables']} | {len(x['pdfs'])} PDF | {links} | Collected: `{x['slug']}.md` |")
        else:
            lines.append(f"| {i} | [{x['title']}]({x['sourceUrl']}) | {x['category']} | Unknown | Unknown | Unknown | Unknown | Unknown | Inaccessible: {x['reason']} |")
    lines += ["", "## Attachments and dependencies", "", "The structured manifest (`src/manuals/manifest.json`) records each image, PDF, internal link, and external link URL for every manual. No source PDF was discovered in the manual bodies. Images are remote source-hosted assets; availability can change. HTML concept maps are transcribed as text in Markdown. Source-site layout and decoration were not imported.", "", "## Categories on the source index", ""]
    for cat, count in Counter(x["category"] for x in records).items():
        lines.append(f"- `{cat}`: {count}")
    if errors:
        lines += ["", "## Inaccessible items", ""] + [f"- `{slug}`: {reason}" for slug, reason in errors]
    AUDIT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("DONE", len(records), "errors", len(errors))


if __name__ == "__main__":
    main()
