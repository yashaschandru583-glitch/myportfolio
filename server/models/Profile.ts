import mongoose, { Schema, Document } from 'mongoose';

export interface IProfileDocument extends Document {
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

const ProfileSchema = new Schema<IProfileDocument>({
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  roleTitle: { type: String, default: 'Full-Stack Developer' },
  rolesList: [{ type: String }],
  aboutIntro: { type: String, default: '' },
  careerObjective: { type: String, default: '' },
  interests: [{ type: String }],
  philosophy: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  resumeFileName: { type: String, default: 'Developer_Resume.pdf' },
  email: { type: String, default: 'alex.dev@example.com' },
  phone: { type: String, default: '+1 (555) 234-5678' },
  location: { type: String, default: 'San Francisco, CA (Open to Remote)' },
  availableForOpportunities: { type: Boolean, default: true },
  socials: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    twitter: { type: String, default: 'https://x.com' },
    email: { type: String, default: 'mailto:alex.dev@example.com' }
  },
  stats: {
    projectsCompleted: { type: Number, default: 14 },
    technologiesLearned: { type: Number, default: 18 },
    certificationsEarned: { type: Number, default: 6 },
    yearsExperience: { type: String, default: '3+' }
  }
});

export const ProfileModel = mongoose.models.Profile || mongoose.model<IProfileDocument>('Profile', ProfileSchema);
