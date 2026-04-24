import mongoose, { Schema, Document } from 'mongoose';

export interface IVenture extends Document {
  title: string;
  role: string;
  description: string;
}

export interface ITechItem extends Document {
  name: string;
  category: 'Web' | 'Mobile' | 'Backend' | 'Cloud';
}

export interface IContact extends Document {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
}

export interface IPortfolio extends Document {
  _id?: string;
  hero: {
    name: string;
    specialty: string;
    bio: string;
  };
  about: {
    title: string;
    bio: string;
    imageUrl: string;
    ventures: IVenture[];
  };
  techStack: ITechItem[];
  contact: IContact;
  createdAt: Date;
  updatedAt: Date;
}

const VentureSchema = new Schema<IVenture>({
  title: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
});

const TechItemSchema = new Schema<ITechItem>({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Web', 'Mobile', 'Backend', 'Cloud'],
    required: true,
  },
});

const ContactSchema = new Schema<IContact>({
  email: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
});

const PortfolioSchema = new Schema<IPortfolio>(
  {
    hero: {
      name: { type: String, default: 'Your Name' },
      specialty: { type: String, default: 'Your Specialty' },
      bio: { type: String, default: 'Your Bio' },
    },
    about: {
      title: { type: String, default: 'About Me' },
      bio: { type: String, default: 'Tell your story' },
      imageUrl: { type: String, default: '' },
      ventures: [VentureSchema],
    },
    techStack: [TechItemSchema],
    contact: ContactSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);
