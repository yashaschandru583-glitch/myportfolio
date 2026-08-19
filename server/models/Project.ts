import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectDocument extends Document {
  title: string;
  category: string;
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
  createdAt: Date;
}

const ProjectSchema = new Schema<IProjectDocument>({
  title: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Web', 'Java', 'C/C++', 'Arduino', 'Other'],
    default: 'Web'
  },
  shortDescription: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [{ type: String, trim: true }],
  githubUrl: { type: String, default: '' },
  liveDemoUrl: { type: String, default: '' },
  problemStatement: { type: String, default: '' },
  solution: { type: String, default: '' },
  features: [{ type: String }],
  challenges: { type: String, default: '' },
  results: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const ProjectModel = mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);
