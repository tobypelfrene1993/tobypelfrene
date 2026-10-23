import { useEffect, useMemo, useState, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import manifest from './manifest.json';

type Manual = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  sourceUrl?: string;
  origin?: 'imported' | 'original';
  status: string;
  wordCount?: number;
  pdfs?: string[];
};

const manuals = (manifest as Manual[]).filter((manual) => manual.status === 'collected');
const localLinks = new Map(manuals.filter((manual) => manual.sourceUrl).map((manual) => [manual.sourceUrl!.replace(/\/$/, ''), `/manuals/${manual.slug}`]));
const files = import.meta.glob('./content/*.md', { query: '?raw', import: 'default' });
const headingId = (text: string, line: number) => `${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${line}`;
const textOf = (children: ReactNode): string => Array.isArray(children)
  ? children.map(textOf).join('')
  : typeof children === 'string' || typeof children === 'number' ? String(children) : '';

function CodeBlock({ children }: { children: ReactNode }) {
  const text = textOf((children as { props?: { children?: ReactNode } })?.props?.children ?? children).replace(/\n$/, '');
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <div className="manual-code"><button type="button" onClick={copy} aria-label="Copy command or code block">{copied ? 'Copied' : 'Copy'}</button><pre>{children}</pre></div>;
}

function Document({ content }: { content: string }) {
  return <div className="manual-prose"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h2: ({ children, node }) => <h2 id={headingId(textOf(children), node?.position?.start.line ?? 0)}>{children}</h2>,
    h3: ({ children, node }) => <h3 id={headingId(textOf(children), node?.position?.start.line ?? 0)}>{children}</h3>,
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
    a: ({ href, children }) => {
      const target = href ? localLinks.get(href.replace(/\/$/, '')) ?? href : undefined;
      return <a href={target} target={target?.startsWith('http') ? '_blank' : undefined} rel={target?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>;
    },
    img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />,
  }}>{content}</ReactMarkdown></div>;
}

export function ManualsOverview() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const categories = useMemo(() => [...new Set(manuals.map((manual) => manual.category))].sort(), []);
  const results = manuals.filter((manual) => {
    const q = query.trim().toLocaleLowerCase();
    const haystack = [manual.title, manual.category, manual.excerpt, ...manual.tags].join(' ').toLocaleLowerCase();
    return (!category || manual.category === category) && (!q || haystack.includes(q));
  });
  return <main className="manuals-page"><div className="container">
    <div className="manuals-intro"><p className="eyebrow">Manuals &amp; references</p><h1>Toby's IT Knowledge Base</h1><p>Practical notes on networking, security, Cisco configuration and Windows Server administration.</p></div>
    <div className="manual-controls"><label>Search manuals<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, topic or keyword" /></label><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All source categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div>
    <p className="manual-count" aria-live="polite">Showing {results.length} of {manuals.length} manuals</p>
    {results.length ? <div className="manual-grid">{results.map((manual) => <article className="manual-card" key={manual.slug}><span className="manual-category">{manual.category} · {manual.origin === 'original' ? 'Original by Toby' : 'Imported manual'}</span><h2><a href={`/manuals/${manual.slug}`}>{manual.title}</a></h2><p>{manual.excerpt}</p><div className="manual-card-foot"><span>{manual.wordCount?.toLocaleString()} words</span><a href={`/manuals/${manual.slug}`}>Read manual →</a></div></article>)}</div> : <p className="manual-empty">No manuals match those filters.</p>}
  </div></main>;
}

export function ManualPage({ slug }: { slug: string }) {
  const manual = manuals.find((entry) => entry.slug === slug);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setContent(null);
    setError(false);
    const load = files[`./content/${slug}.md`];
    if (!load) { setError(true); return; }
    load().then((value) => { if (active) setContent(String(value)); }).catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [slug]);
  if (!manual || error) return <main className="manuals-page"><div className="container"><h1>Manual not found</h1><a href="/manuals">Back to all manuals</a></div></main>;
  const headings = [...(content?.matchAll(/^(#{2,3})\s+(.+)$/gm) ?? [])].map((match) => ({
    title: match[2].replace(/^\$\s*/, ''), level: match[1].length,
    id: headingId(match[2], content!.slice(0, match.index).split('\n').length),
  }));
  return <main className="manuals-page manual-detail"><div className="container">
    <a className="manual-back" href="/manuals">← All manuals</a>
    <div className="manual-detail-head"><p className="eyebrow">{manual.category} · {manual.origin === 'original' ? 'Original manual' : 'Imported manual'}</p><h1>{manual.title}</h1>{manual.origin === 'original' && <p>Documentation by Toby Pelfrene</p>}</div>
    {content === null ? <p>Loading manual…</p> : <div className="manual-layout">
      <article><Document content={content} />{manual.pdfs?.map((pdf) => <p key={pdf} className="manual-pdf"><a href={pdf} target="_blank" rel="noopener noreferrer">View PDF</a> · <a href={pdf} download>Download PDF</a></p>)}</article>
      {headings.length > 0 && <nav className="manual-toc" aria-label="On this page"><strong>On this page</strong>{headings.map((heading) => <a className={heading.level === 3 ? 'toc-sub' : ''} key={heading.id} href={`#${heading.id}`}>{heading.title}</a>)}</nav>}
    </div>}
  </div></main>;
}
