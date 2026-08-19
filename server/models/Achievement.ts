import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievementDocument extends Document {
  title: string;
  organization: string;
  type: string;
  date: string;
  imageUrl?: string;
  verificationUrl?: string;
  description: string;
  order: number;
}

const AchievementSchema = new Schema<IAchievementDocument>({
  title: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    enum: ['Certification', 'Hackathon', 'Workshop', 'Technical Achievement', 'Academic Achievement'],
    default: 'Certification'
  },
  date: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  verificationUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

export const AchievementModel = mongoose.models.Achievement || mongoose.model<IAchievementDocument>('Achievement', AchievementSchema);
