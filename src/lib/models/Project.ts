import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  _id?: string;
  name: string;
  description: string;
  tech: string[];
  image: string;
  demo?: string | null;
  github?: string | null;
  drive?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [200, 'Project name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    tech: {
      type: [String],
      required: [true, 'At least one technology is required'],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Tech array must contain at least one technology',
      },
    },
    image: {
      type: String,
      required: [true, 'Project image is required'],
      // Stored as Base64 or data URL
    },
    demo: {
      type: String,
      trim: true,
      sparse: true,
    },
    github: {
      type: String,
      trim: true,
      sparse: true,
    },
    drive: {
      type: String,
      trim: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
    collection: 'projects',
  }
);

// Create index for search across multiple fields
ProjectSchema.index({
  name: 'text',
  description: 'text',
  tech: 'text',
});

// Create index for sorting by creation date
ProjectSchema.index({ createdAt: -1 });

// Prevent model recompilation in development
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
