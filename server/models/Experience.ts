import mongoose, { Schema, Document } from 'mongoose';

export interface IExperienceDocument extends Document {
  role: string;
  organization: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

const ExperienceSchema = new Schema<IExperienceDocument>({
  role: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    enum: ['Internship', 'Projects', 'Freelance', 'College Activities', 'Technical Experience'],
    default: 'Internship'
  },
  location: { type: String, default: '' },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  achievements: [{ type: String }],
  technologies: [{ type: String }],
  order: { type: Number, default: 0 }
});

export const ExperienceModel = mongoose.models.Experience || mongoose.model<IExperienceDocument>('Experience', ExperienceSchema);
