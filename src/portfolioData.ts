export const contact = {
  email: 'hello@tobypelfrene.be',
  linkedin: 'https://www.linkedin.com/in/toby-pelfrene-1a9365323/',
  github: 'https://github.com/tobypelfrene1993',
};

type SkillGroup = {
  title: string;
  accent: 'networking' | 'systems' | 'infrastructure' | 'automation';
  summary: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Networking',
    accent: 'networking',
    summary: 'TCP/IP, subnetting, VLANs, switching, routing and network troubleshooting.',
    items: ['TCP/IP', 'subnetting', 'VLANs', 'switching', 'routing and network troubleshooting'],
  },
  {
    title: 'Systems & Virtualization',
    accent: 'systems',
    summary: 'Windows, Windows Server, Active Directory, Linux, Hyper-V and Microsoft 365.',
    items: ['Windows', 'Windows Server', 'Active Directory', 'Linux', 'Hyper-V and Microsoft 365'],
  },
  {
    title: 'Infrastructure',
    accent: 'infrastructure',
    summary: 'VPS hosting, Nginx, SSH, DNS, SSL/TLS, backups and monitoring.',
    items: ['VPS hosting', 'Nginx', 'SSH', 'DNS', 'SSL/TLS', 'backups and monitoring'],
  },
  {
    title: 'Automation & Tooling',
    accent: 'automation',
    summary: 'PowerShell, Python, REST APIs, Git, scheduled tasks and AI-assisted automation.',
    items: ['PowerShell', 'Python', 'REST APIs', 'Git', 'scheduled tasks and AI-assisted automation'],
  },
];

type Project = {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  details: string[];
  status: string;
  accent: 'blue' | 'teal' | 'violet' | 'green' | 'warm';
  featured?: boolean;
  featuredOrder?: number;
  github?: string;
  demo?: string;
  privateRepository?: boolean;
};

type LearningGoal = {
  title: string;
  context: string;
  label: 'Long-term goal' | 'Future target';
};

export const projects: Project[] = [
  {
    title: 'Subnet Master',
    description:
      'A web-based subnetting and VLSM tool for practising CIDR calculations, IP planning and networking exercises. Built with React and TypeScript.',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
    highlights: ['CIDR calculations', 'VLSM planning', 'Networking exercises'],
    details: ['Applies networking concepts in a practical browser-based tool.', 'Helps make IP address planning and subnetting practice clearer for students.'],
    status: 'Public project',
    accent: 'blue',
    featured: true,
    featuredOrder: 1,
    github: 'https://github.com/tobypelfrene1993/subnet-master-web',
    demo: 'http://subnetmaster.tobypelfrene.be/',
  },
  {
    title: 'Dell Fan Controller',
    description:
      'A PowerShell project that monitors CPU temperature and safely manages fan-control behaviour on supported Dell systems. It includes validation, logging, recovery logic and automated tests.',
    technologies: ['PowerShell', 'Core Temp', 'Dell Command | Configure', 'Windows Task Scheduler', 'JSON configuration', 'CSV logging', 'State management', 'Automated tests'],
    highlights: ['Temperature monitoring', 'Safe fan-control automation', 'Recovery and validation logic'],
    details: ['Uses read-only validation and dry-run testing before hardware-write paths are used.', 'Includes explicit safeguards, state recovery, logging and fail-closed validation for selected Dell hardware.'],
    status: 'Public repository',
    accent: 'teal',
    featured: true,
    featuredOrder: 3,
    github: 'https://github.com/tobypelfrene1993/dell-fan-controller',
  },
  {
    title: 'VPS Infrastructure',
    description: 'A personal Linux server environment used to host services and practise Nginx, reverse proxies, SSH, SSL/TLS, deployment and monitoring.',
    technologies: ['Linux', 'Nginx', 'SSH', 'SSL/TLS', 'Monitoring', 'Reverse proxies', 'DNS', 'Deployment'],
    highlights: ['Service hosting', 'Reverse proxy management', 'Secure remote administration'],
    details: ['Used for practical Linux server management, hosting and deployment workflows.', 'Supports hands-on learning around Nginx, HTTPS, SSH access, monitoring and service operation.'],
    status: 'Personal infrastructure',
    accent: 'violet',
    featured: true,
    featuredOrder: 2,
  },
  {
    title: 'Infrastructure Automation Platform',
    description:
      'A private VPS-hosted platform combining backend services, API integrations, scheduled workflows and operational monitoring.',
    technologies: ['Node.js', 'Express', 'APIs', 'VPS', 'Scheduled workflows', 'React', 'TypeScript', 'Vite', 'SQLite', 'Nginx', 'Monitoring'],
    highlights: ['VPS deployment', 'Backend services', 'Operational automation'],
    details: ['Focused on deployment, routing, service reliability and operational workflows.', 'Keeps the project positioned as infrastructure and automation practice.'],
    status: 'Private repository',
    accent: 'green',
    privateRepository: true,
  },
  {
    title: 'Automation Systems',
    description:
      'A collection of smaller PowerShell and Python workflows for API integrations, scheduled tasks, monitoring and repetitive task automation.',
    technologies: ['Python', 'PowerShell', 'REST APIs', 'Telegram', 'Scheduled tasks', 'Monitoring scripts', 'GitHub', 'Logging'],
    highlights: ['Python scripts', 'API calls', 'Repetitive task automation'],
    details: ['Separate from the larger platform work, this card represents smaller focused scripts and integrations.', 'Focused on predictable execution, clear debugging, logging and maintainable workflows.'],
    status: 'Personal automation work',
    accent: 'warm',
  },
  {
    title: 'Offline Heroes',
    description:
      'A responsive React and TypeScript web application for a fictional IT emergency service. It includes an interactive ten-step Rescue Plan, automatic readiness scoring, local browser persistence, and a print-friendly summary. Developed as a fictional school project concept, not a commercial company.',
    technologies: ['React', 'TypeScript', 'Vite', 'React Router', 'localStorage'],
    highlights: ['Ten-step Rescue Plan', 'Automatic Hero Score', 'Print-friendly summary'],
    details: ['Built as a responsive React and TypeScript school project for a fictional IT company concept aimed at Belgian SMEs.', 'Includes required-field validation, localStorage persistence, example data, reset flow, demo contact and application forms, and accessible navigation and form states.'],
    status: 'Public school project',
    accent: 'blue',
    featured: true,
    featuredOrder: 4,
    github: 'https://github.com/tobypelfrene1993/offline-heroes',
    demo: 'https://offlineheroes.tobypelfrene.be',
  },
];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((first, second) => (first.featuredOrder ?? 0) - (second.featuredOrder ?? 0));

export const learningJourney: LearningGoal[] = [
  {
    title: 'Cisco CCNA',
    context: 'Networking, routing and switching',
    label: 'Long-term goal',
  },
  {
    title: 'Microsoft AZ-900',
    context: 'Cloud and Azure fundamentals',
    label: 'Long-term goal',
  },
  {
    title: 'Microsoft MS-900',
    context: 'Microsoft 365 fundamentals',
    label: 'Future target',
  },
  {
    title: 'Linux Essentials',
    context: 'Linux command line and administration basics',
    label: 'Future target',
  },
];
