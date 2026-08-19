import mongoose, { Schema, Document } from 'mongoose';

export interface IEducationDocument extends Document {
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

const EducationSchema = new Schema<IEducationDocument>({
  degree: { type: String, required: true, trim: true },
  fieldOfStudy: { type: String, required: true, trim: true },
  college: { type: String, required: true, trim: true },
  university: { type: String, default: '' },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  cgpaOrPercentage: { type: String, required: true },
  relevantCoursework: [{ type: String }],
  order: { type: Number, default: 0 }
});

export const EducationModel = mongoose.models.Education || mongoose.model<IEducationDocument>('Education', EducationSchema);
