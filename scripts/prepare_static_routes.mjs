import { readFile, writeFile, mkdir, access, copyFile } from 'node:fs/promises';
const template = await readFile('dist/index.html', 'utf8');
const pages = JSON.parse(await readFile('src/byteaha.json', 'utf8'));
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
for (const page of pages) {
  const url = `https://tobypelfrene.be${page.path}`;
  const nav = pages.map((entry) => `<a href="${entry.path}">${escape(entry.title)}</a>`).join(' · ');
  const sections = page.sections.map((section) => `<section><h2>${escape(section.title)}</h2>${(section.paragraphs ?? []).map((text) => `<p>${escape(text)}</p>`).join('')}${section.items ? `<ul>${section.items.map((text) => `<li>${escape(text)}</li>`).join('')}</ul>` : ''}</section>`).join('');
  const links = (page.links ?? []).map((link) => `<li><a href="${escape(link.href)}">${escape(link.label)}</a></li>`).join('');
  const body = `<main class="manuals-page byteaha-page" lang="nl"><div class="container"><div class="manuals-intro"><h1>${escape(page.title)}</h1><p>${escape(page.subtitle)}</p></div><nav class="byteaha-links" aria-label="ByteAha Poster pagina's">${nav}</nav><article class="manual-prose byteaha-content">${sections}${links ? `<section><h2>Relevante links</h2><ul>${links}</ul></section>` : ''}<p><a href="/#contact">Contact met Toby Pelfrene</a></p></article></div></main>`;
  let html = template.replace('<html lang="en">', '<html lang="nl">').replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`).replace(/(<link rel="canonical" href=")[^"]+/, `$1${url}`).replace(/(<meta\s+name="description"\s+content=")[^"]+/, `$1${escape(page.subtitle)}`).replace(/(<meta property="og:url" content=")[^"]+/, `$1${url}`).replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]+/g, `$1${escape(page.title)}`).replace(/(<meta\s+(?:property="og:description"|name="twitter:description")\s+content=")[^"]+/g, `$1${escape(page.subtitle)}`).replace(/<script type="application\/ld\+json">.*?<\/script>/s, '').replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const directory = `dist${page.path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}index.html`, html);
}
try { await access('dist/projects'); try { await access('dist/projects/index.html'); } catch { await copyFile('dist/index.html', 'dist/projects/index.html'); } } catch { /* No physical route directory. */ }
