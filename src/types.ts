export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Java' | 'C/C++' | 'Arduino' | 'Other';
  shortDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  problemStatement: string;
  solution: string;
  features: string[];
  challenges: string;
  results: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Programming' | 'Tools';
  proficiency: number;
  iconName?: string;
  order: number;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: 'Internship' | 'Projects' | 'Freelance' | 'College Activities' | 'Technical Experience';
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  college: string;
  university: string;
  startYear: string;
  endYear: string;
  cgpaOrPercentage: string;
  relevantCoursework: string[];
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  type: 'Certification' | 'Hackathon' | 'Workshop' | 'Technical Achievement' | 'Academic Achievement';
  date: string;
  imageUrl?: string;
  verificationUrl?: string;
  description: string;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Profile {
  name: string;
  tagline: string;
  roleTitle: string;
  rolesList: string[];
  aboutIntro: string;
  careerObjective: string;
  interests: string[];
  philosophy: string;
  avatarUrl: string;
  resumeUrl: string;
  resumeFileName: string;
  email: string;
  phone: string;
  location: string;
  availableForOpportunities: boolean;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter?: string;
    email: string;
  };
  stats: {
    projectsCompleted: number;
    technologiesLearned: number;
    certificationsEarned: number;
    yearsExperience: string;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  totalProjects: number;
  featuredProjects: number;
  totalSkills: number;
  totalExperience: number;
  totalEducation: number;
  totalAchievements: number;
  totalMessages: number;
  unreadMessages: number;
  categoryBreakdown: Record<string, number>;
  skillCategoryBreakdown: Record<string, number>;
  database: {
    connectedToMongo: boolean;
    mode: string;
    projectsCount: number;
    skillsCount: number;
    messagesCount: number;
  };
}
