import { contact, featuredProjects, projects, skillGroups } from './portfolioData';

type TextLinkProps = {
  href: string;
  children: string;
  download?: boolean;
  external?: boolean;
  className?: string;
};

function TextLink({ href, children, download, external, className = '' }: TextLinkProps) {
  return (
    <a className={className} href={href} download={download} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  );
}

function Nav({ isHome = false }: { isHome?: boolean }) {
  const homePrefix = isHome ? '' : '/';

  return (
    <header className="site-header">
      <a className="brand-link" href={isHome ? '#top' : '/'} aria-label="Toby Pelfrene home">Toby Pelfrene</a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href={`${homePrefix}#about`}>About</a>
        <a href={`${homePrefix}#projects`}>Work</a>
        <a href={`${homePrefix}#skills`}>Skills</a>
        <a href={`${homePrefix}#contact`}>Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="top">
      <Nav isHome />
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="intro-line">Portfolio</p>
          <h1>Toby Pelfrene</h1>
          <p className="hero-title">Network & Systems Administration Student</p>
          <p className="hero-text">
            I am building practical experience with Windows, Linux, Hyper-V, networking, VPS hosting and automation through projects, labs and training. I am open to junior opportunities in Network Administration, Systems Administration and Server Administration.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <TextLink className="primary-action" href="#projects">View my work</TextLink>
            <TextLink className="secondary-action" href="#contact">Contact me</TextLink>
          </div>
          <div className="quiet-links" aria-label="Secondary links">
            <TextLink href={contact.linkedin} external>LinkedIn</TextLink>
            <TextLink href={contact.github} external>GitHub</TextLink>
            <TextLink href="/Toby-Pelfrene-CV.html" download>Download CV</TextLink>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <img
            className="hero-portrait"
            src="/toby-pelfrene-profile.jpg"
            alt="Toby Pelfrene"
            width="420"
            height="420"
          />
          <div className="hero-note">
            <p>Open to junior opportunities in network, systems and server administration.</p>
            <p>Interested in infrastructure, virtualization, storage, backup, data management and technical support.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ title, technologies }: { title: string; technologies: string[] }) {
  return (
    <div className="project-preview" aria-hidden="true">
      <div className="preview-window">
        <div className="preview-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-body">
          <p>{title}</p>
          <div className="preview-lines">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-stack">
            {technologies.slice(0, 3).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRows({ items }: { items: typeof projects }) {
  return (
    <div className="project-list">
      {items.map((project, index) => (
        <article className="project-row" data-reverse={index % 2 === 1 ? 'true' : 'false'} key={project.title}>
          <ProjectPreview title={project.title} technologies={project.technologies} />
          <div className="project-content">
            <div className="project-meta">
              {project.privateRepository ? <span>Private repository</span> : project.status.includes('Personal') ? <span>{project.status}</span> : null}
            </div>
            <h3>{project.title}</h3>
            <p className="project-copy">{project.description}</p>
            <ul className="project-tech-plain" aria-label={`${project.title} technologies`}>
              {project.technologies.slice(0, 5).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="project-links">
              {project.github && !project.privateRepository ? (
                <TextLink href={project.github} external>GitHub</TextLink>
              ) : null}
              {project.demo ? (
                <TextLink href={project.demo} external={project.demo.startsWith('http')}>Live demo</TextLink>
              ) : null}
              {project.privateRepository ? <span>Repository kept private</span> : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectsSection({
  items,
  kicker,
  heading,
  summary,
  showAllLink = false,
}: {
  items: typeof projects;
  kicker: string;
  heading: string;
  summary: string;
  showAllLink?: boolean;
}) {
  return (
    <section className="section work-section" id="projects">
      <div className="section-heading split-heading">
        <p className="section-kicker">{kicker}</p>
        <h2>{heading}</h2>
        <p>
          {summary}
        </p>
      </div>

      <ProjectRows items={items} />

      {showAllLink ? (
        <div className="hero-actions">
          <TextLink className="secondary-action" href="/projects">View all projects →</TextLink>
        </div>
      ) : null}
    </section>
  );
}

function FeaturedProjects() {
  return (
    <ProjectsSection
      items={featuredProjects}
      kicker="Featured Projects"
      heading="Practical projects, built while learning real infrastructure work."
      summary="A focused selection of projects around subnetting, automation, hosting, service management and operational tooling."
      showAllLink
    />
  );
}

function AllProjectsPage() {
  return (
    <main id="top">
      <Nav />
      <ProjectsSection
        items={projects}
        kicker="Projects"
        heading="All practical projects, labs and portfolio work."
        summary="A complete project overview covering subnetting, automation, hosting, service management and operational tooling."
      />
      <Footer />
    </main>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-grid">
        <div className="section-heading">
          <p className="section-kicker">About</p>
          <h2>I learn by building and fixing real systems.</h2>
        </div>
        <div className="about-copy">
          <p>
            My interest in IT started long before my formal training. Through my own projects, I have gained hands-on experience with networking, server administration, Windows and Microsoft 365, Linux, virtualization, VPS environments and small web applications.
          </p>
          <p>
            I also use Python and AI-assisted tools to automate recurring tasks, connect services and make technical workflows more efficient. I enjoy understanding how different parts of an IT environment work together and troubleshooting problems step by step.
          </p>
          <p>
            I am currently strengthening this broad practical foundation through formal training in Network & Systems Administration, with the goal of growing into a systems and network administration role.
          </p>
          <div className="about-facts">
            <div>
              <strong>Education</strong>
              <span>Network & Systems Administration Programme — In progress</span>
            </div>
            <div>
              <strong>Hands-on experience</strong>
              <span>Networking, server administration, Windows and Microsoft 365, Linux, virtualization, VPS environments, small web applications, Python scripting, infrastructure monitoring and AI-assisted automation.</span>
            </div>
            <div>
              <strong>Current development</strong>
              <span>Cisco networking, Windows Server, storage, backup and recovery, infrastructure security and Microsoft fundamentals.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <p className="section-kicker">Skills</p>
        <h2>Technical skills I apply in projects and labs.</h2>
      </div>
      <div className="skill-list">
        {skillGroups.map((group) => (
          <article className="skill-line" key={group.title}>
            <h3>{group.title.replace('Automation and Development', 'Automation')}</h3>
            <p>{group.items.slice(0, 6).join(', ')}.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const workPrinciples = [
  {
    title: 'Build, test and validate',
    text: 'I work with real configurations, test changes in small steps and verify the result before moving forward.',
  },
  {
    title: 'Document for repeatability',
    text: 'I document configurations, decisions and troubleshooting steps so the work remains clear, reproducible and maintainable.',
  },
  {
    title: 'Troubleshoot methodically',
    text: 'I isolate one variable at a time, use logs and test results as evidence, and avoid making assumptions without verification.',
  },
];

function HowIWork() {
  return (
    <section className="section work-method-section" id="how-i-work">
      <div className="section-heading">
        <p className="section-kicker">How I Work</p>
        <h2>How I approach technical problems.</h2>
      </div>
      <div className="principle-list">
        {workPrinciples.map((principle) => (
          <article className="principle" key={principle.title}>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-shell">
        <div>
          <p className="section-kicker">Contact</p>
          <h2>Open to junior IT roles across support, systems, networks and infrastructure.</h2>
          <p>
            I am open to junior opportunities in IT support, systems administration, network administration and server infrastructure. I have practical experience with Windows, Linux, Microsoft 365, virtualization, VPS hosting, networking, automation, backups, monitoring and technical troubleshooting.
          </p>
        </div>
        <div className="contact-links" aria-label="Contact links">
          <TextLink href={`mailto:${contact.email}`}>{contact.email}</TextLink>
          <TextLink href={contact.linkedin} external>LinkedIn</TextLink>
          <TextLink href={contact.github} external>GitHub</TextLink>
          <TextLink href="/Toby-Pelfrene-CV.html" download>Download CV</TextLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>Toby Pelfrene</p>
      <p>Network & Systems Administration Student</p>
    </footer>
  );
}

export default function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  if (currentPath === '/projects') {
    return <AllProjectsPage />;
  }

  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <About />
      <Skills />
      <HowIWork />
      <Contact />
      <Footer />
    </main>
  );
}
