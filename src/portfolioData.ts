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
  visible?: boolean;
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
      'A browser-based subnetting and VLSM tool for calculating IPv4 ranges, planning networks and practising CIDR. Built with React and TypeScript.',
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
      'A PowerShell controller for supported Dell systems that reads CPU temperature and manages fan settings with validation, logging, recovery and automated tests.',
    technologies: ['PowerShell', 'Core Temp', 'Dell Command | Configure', 'Windows Task Scheduler', 'JSON configuration', 'CSV logging', 'State management', 'Automated tests'],
    highlights: ['Temperature monitoring', 'Safe fan-control automation', 'Recovery and validation logic'],
    details: ['Uses read-only validation and dry-run testing before hardware-write paths are used.', 'Includes explicit safeguards, state recovery, logging and fail-closed validation for selected Dell hardware.'],
    status: 'Public repository',
    accent: 'teal',
    featured: true,
    featuredOrder: 2,
    github: 'https://github.com/tobypelfrene1993/dell-fan-controller',
  },
  {
    title: 'MC Service Evergem',
    description:
      'A live website for a local service business, built and deployed with a focus on clear content, responsive design, HTTPS hosting and privacy-friendly analytics.',
    technologies: ['Vite', 'Nginx', 'HTTPS', 'Analytics', 'Deployment'],
    highlights: ['Live business website', 'HTTPS hosting', 'Privacy-friendly analytics'],
    details: ['Uses HTML, CSS and JavaScript for the site.', 'The public repository includes Python and SQLite analytics code and Nginx deployment configuration.'],
    status: 'Live project',
    accent: 'green',
    featured: true,
    featuredOrder: 3,
    github: 'https://github.com/tobypelfrene1993/mcservice-evergem-v2',
    demo: 'https://mcservice-evergem.be',
  },
  {
    title: 'VPS Infrastructure',
    description: 'A personal Linux VPS used to host services and practise Nginx reverse proxies, SSH access, HTTPS deployment and monitoring.',
    technologies: ['Linux', 'Nginx', 'SSH', 'SSL/TLS', 'Monitoring', 'Reverse proxies', 'DNS', 'Deployment'],
    highlights: ['Service hosting', 'Reverse proxy management', 'Secure remote administration'],
    details: ['Used for practical Linux server management, hosting and deployment workflows.', 'Supports hands-on learning around Nginx, HTTPS, SSH access, monitoring and service operation.'],
    status: 'Personal infrastructure',
    accent: 'violet',
  },
  {
    title: 'Offline Heroes',
    description:
      'A fictional school project built with React and TypeScript: an interactive IT emergency plan with local storage, readiness scoring and a printable summary.',
    technologies: ['React', 'TypeScript', 'Vite', 'React Router', 'localStorage'],
    highlights: ['Ten-step Rescue Plan', 'Automatic Hero Score', 'Print-friendly summary'],
    details: ['Built as a responsive React and TypeScript school project for a fictional IT company concept aimed at Belgian SMEs.', 'Includes required-field validation, localStorage persistence, example data, reset flow, demo contact and application forms, and accessible navigation and form states.'],
    status: 'Public school project',
    accent: 'blue',
    github: 'https://github.com/tobypelfrene1993/offline-heroes',
    demo: 'http://offlineheroes.tobypelfrene.be/',
  },
  {
    title: 'IT1 Gaming Lab',
    description:
      'An in-progress physical Cisco networking lab documenting two IPv4 subnets, router and switch configuration, and duplicate-IP troubleshooting.',
    technologies: ['Cisco IOS', 'IPv4', 'Routing', 'Switching', 'Troubleshooting'],
    highlights: ['Physical Cisco equipment', 'IP addressing plan', 'Duplicate-IP troubleshooting'],
    details: ['Documents a Cisco 1841 router, Catalyst switches and two IPv4 networks.', 'The repository marks configuration and connectivity checks as still in progress.'],
    status: 'School lab in progress',
    accent: 'blue',
    github: 'https://github.com/tobypelfrene1993/it1-gaming-lab',
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
    visible: false,
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
    visible: false,
  },
];

export const visibleProjects = projects.filter((project) => project.visible !== false);

export const featuredProjects = visibleProjects
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
