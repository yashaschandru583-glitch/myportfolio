import mongoose, { Schema, Document } from 'mongoose';

export interface ISkillDocument extends Document {
  name: string;
  category: string;
  proficiency: number;
  iconName: string;
  order: number;
}

const SkillSchema = new Schema<ISkillDocument>({
  name: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Frontend', 'Backend', 'Database', 'Programming', 'Tools']
  },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  iconName: { type: String, default: 'Code' },
  order: { type: Number, default: 0 }
});

export const SkillModel = mongoose.models.Skill || mongoose.model<ISkillDocument>('Skill', SkillSchema);
