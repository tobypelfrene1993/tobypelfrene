import { contact, featuredProjects, projects, skillGroups, visibleProjects } from './portfolioData';
import { ManualPage, ManualsOverview } from './manuals/Manuals';

type Project = (typeof projects)[number];

function Icon({ kind }: { kind: 'arrow' | 'external' | 'download' }) {
  const path = {
    arrow: <path d="M3 10h13m-5-5 5 5-5 5" />,
    external: <path d="M6 14 14 6M7 6h7v7" />,
    download: <path d="M10 2v10m-4-4 4 4 4-4M3 14v3h14v-3" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{path[kind]}</svg>;
}

function Header({ isHome, currentPage }: { isHome: boolean; currentPage?: 'projects' | 'manuals' }) {
  const prefix = isHome ? '' : '/';
  return <header className="site-header" id="top"><div className="container header-inner">
    <a className="brand-link" href={isHome ? '#top' : '/'} aria-label="Toby Pelfrene, home">Toby Pelfrene<span>.</span></a>
    <nav className="site-nav" aria-label="Primary navigation">
      <a href={isHome ? '#projects' : '/projects'} aria-current={currentPage === 'projects' ? 'page' : undefined}>Projects</a>
      <a href="/manuals" aria-current={currentPage === 'manuals' ? 'page' : undefined}>Manuals</a>
      <a href={`${prefix}#skills`}>Skills</a><a href={`${prefix}#about`}>About</a><a href={`${prefix}#contact`}>Contact</a>
    </nav>
    <a className="button button-dark nav-cv" href="/Toby-Pelfrene-CV.pdf" download><Icon kind="download" />Download CV</a>
  </div></header>;
}

function Hero() {
  return <section className="hero-section" aria-labelledby="hero-title"><div className="container hero-layout">
    <div className="hero-copy">
      <p className="eyebrow">NETWORKS · SYSTEMS · INFRASTRUCTURE</p>
      <h1 id="hero-title">Hey, I'm Toby.</h1>
      <p className="hero-subtitle">I build, manage and troubleshoot IT systems.</p>
      <p className="hero-description">Technology has always been a big part of my life. Through personal projects and hands-on labs, I work with networks, Windows Server, Linux environments, virtualization and automation. I enjoy solving technical challenges, understanding how systems work and finding ways to improve them.</p>
      <p className="hero-position">Open to junior opportunities in network administration, systems administration, server management and IT infrastructure.</p>
      <div className="hero-actions">
        <a className="button button-dark" href="#projects">View my projects <Icon kind="arrow" /></a>
        <a className="button button-outline" href="/Toby-Pelfrene-CV.pdf" download><Icon kind="download" />Download CV</a>
      </div>
    </div>
    <div className="hero-photo-wrap"><img className="hero-photo" src="/toby-pelfrene-profile.jpg" alt="Portrait of Toby Pelfrene" width="400" height="400" fetchPriority="high" /></div>
  </div></section>;
}

// These are deliberately typographic fallbacks, not screenshots of the projects.
const projectVisuals: Record<string, { label: string; mark: string }> = {
  'Subnet Master': { label: 'NETWORK PLANNING', mark: '192.168 / 24' },
  'Dell Fan Controller': { label: 'SYSTEM AUTOMATION', mark: 'PS >_' },
  'MC Service Evergem': { label: 'WEB & HOSTING', mark: 'MC SERVICE' },
  'VPS Infrastructure': { label: 'SERVER OPERATIONS', mark: 'VPS / SSH' },
  'Offline Heroes': { label: 'SCHOOL PROJECT', mark: 'RESCUE PLAN' },
  'IT1 Gaming Lab': { label: 'CISCO LAB', mark: 'LAN / ROUTING' },
};

function ProjectCard({ project }: { project: Project }) {
  const visual = projectVisuals[project.title];
  return <article className="project-card">
    {project.image ? (
      <div className="project-visual project-visual-image"><img src={project.image} alt={project.imageAlt ?? `Screenshot of ${project.title}`} width={project.imageWidth ?? 1200} height={project.imageHeight ?? 675} loading="lazy" decoding="async" style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined} /></div>
    ) : (
      <div className={`project-visual visual-${project.accent}`} aria-hidden="true"><span className="visual-label">{visual?.label ?? 'PROJECT'}</span><span className="visual-mark">{visual?.mark ?? project.title}</span></div>
    )}
    <div className="project-card-body">
      <div className="project-title-line"><h3>{project.title}</h3><span className="project-status">{project.status}</span></div>
      <p>{project.description}</p>
      <ul className="project-tech" aria-label={`${project.title} technologies`}>{project.technologies.slice(0, 3).map((tech) => <li key={tech}>{tech}</li>)}</ul>
      <div className="project-links">
        {project.github && !project.privateRepository && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">for {project.title}</span><Icon kind="external" /></a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <span className="sr-only">of {project.title}</span><Icon kind="external" /></a>}
        {!project.github && !project.demo && <span>{project.linkNote ?? 'No public link available'}</span>}
      </div>
    </div>
  </article>;
}

function FeaturedWork() {
  return <section className="section featured-section" id="projects" aria-labelledby="featured-title"><div className="container">
    <div className="section-topline"><div><p className="eyebrow">Featured projects</p><h2 id="featured-title">Selected work.</h2></div><a className="text-link all-projects-link" href="/projects">View all projects <Icon kind="arrow" /></a></div>
    <div className="project-grid featured-grid">{featuredProjects.map((project) => <ProjectCard project={project} key={project.title} />)}</div>
  </div></section>;
}

const skillIcons = ['◎', '▤', '◇', '⚙'];
const skillDisplay = skillGroups.map((group, index) => ({
  title: group.title,
  icon: skillIcons[index],
  copy: group.items.join(' · '),
}));

function Skills() {
  return <section className="section skills-section" id="skills" aria-labelledby="skills-title"><div className="container">
    <p className="eyebrow">Technical skills</p><h2 id="skills-title">Core expertise.</h2>
    <div className="skills-grid">{skillDisplay.map((skill) => <article className="skill-item" key={skill.title}><span className="skill-icon" aria-hidden="true">{skill.icon}</span><h3>{skill.title}</h3><p>{skill.copy}</p></article>)}</div>
  </div></section>;
}

const principles = [
  { title: 'Build & test', text: 'Learn by doing and verify changes on real systems.' },
  { title: 'Troubleshoot methodically', text: 'Find the root cause and solve problems step by step.' },
  { title: 'Document & improve', text: 'Keep clear notes and use what I learn to improve.' },
];

function About() {
  return <section className="section about-section" id="about" aria-labelledby="about-title"><div className="container about-grid">
    <div className="about-copy"><p className="eyebrow">About me</p><h2 id="about-title">Curious about technology.</h2><p>I’ve always had a strong interest in technology and enjoy understanding how systems work. I like building, configuring and troubleshooting IT environments, from networks and Windows Server to Linux, virtualization and automation.</p><p>Network &amp; Systems Administration — IT1.be (2026 – Present). Full-time technical training covering networking, Windows and Linux administration, virtualization, Microsoft 365, cloud infrastructure, cybersecurity, automation and IT support.</p></div>
    <div className="principles" aria-label="How I work">{principles.map((principle, index) => <div className="principle" key={principle.title}><span className="principle-mark" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h3>{principle.title}</h3><p>{principle.text}</p></div></div>)}</div>
  </div></section>;
}

function Contact() {
  return <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-panel">
    <div className="contact-copy"><p className="eyebrow">Get in touch</p><h2 id="contact-title">Let’s connect.</h2><p>Open to junior opportunities in network administration, systems administration, server management and IT infrastructure.</p></div>
    <div className="contact-links"><a className="email-link" href={`mailto:${contact.email}`}><span>Email</span><strong>{contact.email}</strong></a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Icon kind="external" /></a><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub <Icon kind="external" /></a><a className="button button-dark" href="/Toby-Pelfrene-CV.pdf" download><Icon kind="download" />Download CV</a></div>
  </div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><span className="footer-brand">Toby Pelfrene<span>.</span></span><nav aria-label="Footer navigation"><a href="/projects">Projects</a><a href="/manuals">Manuals</a><a href="/#skills">Skills</a><a href="/#about">About</a><a href="/#contact">Contact</a></nav></div></footer>;
}

function ProjectsPage() {
  return <><Header isHome={false} currentPage="projects" /><main><section className="section projects-page" aria-labelledby="projects-title"><div className="container"><div className="projects-intro"><p className="eyebrow">Projects &amp; labs</p><h1 id="projects-title">Practical work, built to learn.</h1><p>A selection of tools, websites and infrastructure projects where I put networking, systems and automation skills into practice.</p></div><div className="project-grid all-projects-grid">{visibleProjects.map((project) => <ProjectCard project={project} key={project.title} />)}</div></div></section></main><Footer /></>;
}

export default function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  if (currentPath === '/projects') return <ProjectsPage />;
  if (currentPath === '/manuals') return <><Header isHome={false} currentPage="manuals" /><ManualsOverview /><Footer /></>;
  if (currentPath.startsWith('/manuals/')) return <><Header isHome={false} currentPage="manuals" /><ManualPage slug={currentPath.slice('/manuals/'.length)} /><Footer /></>;
  return <><Header isHome /><main><Hero /><FeaturedWork /><Skills /><About /><Contact /></main><Footer /></>;
}
