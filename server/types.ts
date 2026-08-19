export interface IProject {
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

export interface ISkill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Programming' | 'Tools';
  proficiency: number; // 0 to 100
  iconName?: string;
  order: number;
}

export interface IExperience {
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

export interface IEducation {
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

export interface IAchievement {
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

export interface IMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface IProfile {
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

export interface IUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt: string;
}
