import pages from './byteaha.json';

export function ByteAhaPage({ path }: { path: string }) {
  const page = pages.find((entry) => entry.path.replace(/\/$/, '') === path)!;
  return <main className="manuals-page byteaha-page" lang="nl"><div className="container">
    <div className="manuals-intro"><p className="eyebrow">ByteAha · Persoonlijk project</p><h1>{page.title}</h1><p>{page.subtitle}</p></div>
    <nav className="byteaha-links" aria-label="ByteAha Poster pagina's">{pages.map((entry) => <a key={entry.path} href={entry.path} aria-current={entry === page ? 'page' : undefined}>{entry.path.endsWith('/privacy/') ? 'Privacyverklaring' : entry.path.endsWith('/terms/') ? 'Gebruiksvoorwaarden' : 'ByteAha Poster'}</a>)}</nav>
    <article className="manual-prose byteaha-content">{page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map((text) => <p key={text}>{text}</p>)}{section.items && <ul>{section.items.map((text) => <li key={text}>{text}</li>)}</ul>}</section>)}
      {page.links && <section><h2>Relevante links</h2><ul>{page.links.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul></section>}
      <p><a href="/#contact">Contact met Toby Pelfrene</a></p>
    </article>
  </div></main>;
}
