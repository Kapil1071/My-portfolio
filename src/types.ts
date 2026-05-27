export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  completedDate: string;
  mangaSoundFx: string; // e.g., "SHWOOSH", "KLANG", "BOOM"
}

export interface TechSkill {
  id: string;
  name: string;
  category: 'languages' | 'frameworks' | 'tools' | 'concepts';
  level: number; // 1 to 10
  proficiencyLabel: string; // e.g., "S-RANK", "A-RANK", "GENIN", "JONIN"
  specialization: string; // e.g., "Overclocked Web Core", "Concurrent Execution"
}

export interface Profile {
  name: string;
  title: string;
  status: string; // e.g., "ONLINE / SYSTEM READY"
  subTitle: string;
  bio: string;
  avatarUrl: string;
  location: string;
  hackerAlias: string;
  stats: {
    energyCode: number;
    gitCommits: number;
    coffeeIntake: number;
    level: number;
  };
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

export interface SoundEffectEvent {
  text: string;
  x: number;
  y: number;
  id: string;
}
