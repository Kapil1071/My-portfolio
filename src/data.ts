import { Project, TechSkill, Profile } from './types';

export const DEFAULT_PROFILE: Profile = {
  name: "KAPIL B. YADAV",
  hackerAlias: "Kapil1071",
  title: "B.Tech CSE (AI & ML) | Freelance Web Developer",
  status: "ONLINE // SECTOR_READY_0x77",
  subTitle: "Motivated second-year B.Tech student specialising in Artificial Intelligence & Machine Learning, with hands-on experience in full-stack web development and building real-world client products.",
  bio: "Motivated second-year B.Tech CSE (AI & ML) student at GLA University specialising in Artificial Intelligence & Machine Learning, with hands-on experience in full-stack web development and building real-world client products. Seeking an internship to contribute practical skills and continue building impactful solutions.",
  avatarUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=70",
  location: "Mathura, Uttar Pradesh",
  stats: {
    energyCode: 99,
    gitCommits: 540,
    coffeeIntake: 850,
    level: 42
  },
  socials: {
    github: "https://github.com/Kapil1071",
    twitter: "https://github.com/Kapil1071",
    linkedin: "https://linkedin.com",
    email: "kapilyadavma@gmail.com"
  }
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Lavender Salon – Luxury Salon Website",
    category: "Web Dev",
    tagline: "Premium luxury salon website with a sophisticated aesthetic and real-time booking API.",
    description: "Designed and deployed a premium luxury salon website with a sophisticated aesthetic and mobile-first responsive layout. Integrated an advanced booking and scheduling system enabling clients to reserve appointments, select stylists, and manage bookings in real time. Applied elegant animations, smooth transitions, and a refined colour palette to deliver a high-end brand experience.",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60",
    techStack: ["HTML", "CSS", "JavaScript", "Booking API"],
    liveUrl: "https://lavender-unisex-salon-45041301742.asia-southeast1.run.app",
    githubUrl: "https://github.com/Kapil1071",
    completedDate: "2025-12-10",
    mangaSoundFx: "SHWOOSH!"
  },
  {
    id: "proj-2",
    title: "Prime Reach AI",
    category: "AI / Web",
    tagline: "AI-powered client engagement and automated lead optimization system.",
    description: "Built client engagement channels utilizing automated outreach and scheduling workflows. Fully responsive custom front-end with dashboard panels for stats tracking, message logs, and webhook integration to capture active leads in real-time.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    techStack: ["React", "Node.js", "Express.js", "Tailwind CSS"],
    liveUrl: "https://primereach-ai-45041301742.asia-southeast1.run.app/",
    githubUrl: "https://github.com/Kapil1071",
    completedDate: "2026-02-15",
    mangaSoundFx: "PING!"
  },
  {
    id: "proj-3",
    title: "Smile Review System",
    category: "AI / ML",
    tagline: "Computer Vision system detecting smiles with OpenCV and prompting Google reviews.",
    description: "Built an AI-powered system that detects customer smiles via webcam and automatically prompts them to leave a Google review. Implemented facial landmark detection to classify genuine smiles with configurable confidence thresholds. Designed for seamless deployment at retail counters and hospitality desks.",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60",
    techStack: ["Python", "Computer Vision", "OpenCV", "Facial Landmarks"],
    liveUrl: "https://github.com/Kapil1071",
    githubUrl: "https://github.com/Kapil1071",
    completedDate: "2025-06-20",
    mangaSoundFx: "FLASH!"
  },
  {
    id: "proj-4",
    title: "Outreach System",
    category: "Web / ML",
    tagline: "Lead-outreach scraper pipeline with automated personalized cold message triggers.",
    description: "Developed an automated lead-outreach pipeline that scrapes business contacts and sends personalised cold messages at scale. Integrated scheduling, follow-up logic, and response tracking to maximise conversion rates. Used for real client acquisition in the freelance web development workflow.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    techStack: ["Python", "Automation", "Email APIs", "WhatsApp APIs"],
    liveUrl: "https://github.com/Kapil1071",
    githubUrl: "https://github.com/Kapil1071",
    completedDate: "2025-09-05",
    mangaSoundFx: "ZAPPING!"
  },
  {
    id: "proj-5",
    title: "Hospital Management System",
    category: "Web Dev",
    tagline: "Multi-role operations manager covering scheduling and interactive doctor/patient panels.",
    description: "Developed a multi-role web application for hospital operations covering patient registration, doctor scheduling, and admin dashboards. Implemented role-based access control for Admin, Doctor, and Patients to secure personal records dynamically.",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=60",
    techStack: ["HTML", "CSS", "JavaScript", "Access Control"],
    liveUrl: "https://github.com/Kapil1071",
    githubUrl: "https://github.com/Kapil1071",
    completedDate: "2025-11-12",
    mangaSoundFx: "HEAL!"
  },
  {
    id: "proj-6",
    title: "Digital Voting Machine",
    category: "Systems",
    tagline: "Hardware simulation circuit diagram with full digital logic schematics and K-maps.",
    description: "Designed and simulated a functional digital voting machine circuit for GLA University's 4th-semester project. Produced complete circuit documentation covering truth tables, K-maps, and logic gate schematics within Logisim.",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=60",
    techStack: ["Logisim", "Digital Logic Design", "Truth Tables", "K-Maps"],
    liveUrl: "https://github.com/Kapil1071",
    githubUrl: "https://github.com/Kapil1071",
    completedDate: "2026-04-18",
    mangaSoundFx: "KLANG!"
  }
];

export const DEFAULT_SKILLS: TechSkill[] = [
  // Languages
  {
    id: "sk-1",
    name: "PYTHON / SQL",
    category: "languages",
    level: 9,
    proficiencyLabel: "S-RANK",
    specialization: "Pandas, ML execution, sub-queries, dataset cleanups"
  },
  {
    id: "sk-2",
    name: "TYPESCRIPT / JAVASCRIPT",
    category: "languages",
    level: 10,
    proficiencyLabel: "S-RANK",
    specialization: "Meta-programming, async control flows, callback triggers"
  },
  {
    id: "sk-3",
    name: "HTML5 / CSS3",
    category: "languages",
    level: 9,
    proficiencyLabel: "S-RANK",
    specialization: "Screentones, custom layout mechanics, fluid margins"
  },
  // Web Dev
  {
    id: "sk-4",
    name: "REACT & VIRTUAL DOM",
    category: "frameworks",
    level: 9,
    proficiencyLabel: "S-RANK",
    specialization: "Hooks hydration, custom reactive grids, performance optimization"
  },
  {
    id: "sk-5",
    name: "NODE.JS / EXPRESS.JS",
    category: "frameworks",
    level: 8,
    proficiencyLabel: "A-RANK",
    specialization: "Streaming API sockets, route parsing, proxy servers"
  },
  {
    id: "sk-6",
    name: "TAILWIND CSS & LUXURY UX",
    category: "frameworks",
    level: 10,
    proficiencyLabel: "S-RANK",
    specialization: "Pixel-perfect grids, aesthetic custom responsive setups"
  },
  // Databases / Tools
  {
    id: "sk-7",
    name: "MONGODB / FIREBASE / MYSQL",
    category: "tools",
    level: 8,
    proficiencyLabel: "A-RANK",
    specialization: "Persistent schemas, real-time sync databases, secure queries"
  },
  {
    id: "sk-8",
    name: "GIT / GITHUB VS CODE",
    category: "tools",
    level: 9,
    proficiencyLabel: "S-RANK",
    specialization: "Interactive rebase, branch structures, automated deployment hooks"
  },
  {
    id: "sk-9",
    name: "AI & MACHINE LEARNING",
    category: "concepts",
    level: 8,
    proficiencyLabel: "A-RANK",
    specialization: "NumPy, Scikit-learn, Computer Vision OpenCV landmarks"
  }
];
