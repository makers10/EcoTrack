import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GreenPrintDocument = HydratedDocument<GreenPrint>;

@Schema({ timestamps: true })
export class GreenPrint {
  // Link to the owner (User)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true, index: true })
  userId: Types.ObjectId;

  // Public handle/slug for sharing (optional but handy)
  @Prop({ type: String, unique: true, sparse: true, trim: true, lowercase: true })
  handle?: string;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: [String], default: [] }) //  defines highlights array
  highlights: string[];

  // Portfolio stats
  @Prop({ type: Number, default: 0 }) totalCO2Saved: number;            // in kg
  @Prop({ type: Number, default: 0 }) challengesCompleted: number;
  @Prop({ type: [String], default: [] }) badges: string[];               // simple string badges
  @Prop({ type: Number, default: 0 }) streakDays: number;                // current streak
  @Prop({ type: Date, default: null }) lastStreakDate?: Date;            // last day streak was updated

  // Presentation / visibility
  @Prop({ type: Boolean, default: true }) isPublic: boolean;
  @Prop({ type: String, default: 'leaf' }) theme: string;                // e.g. 'leaf' | 'ocean' | 'sun'
  @Prop({ type: String, maxlength: 180, trim: true }) bio?: string;
  @Prop({ type: String, trim: true }) avatarUrl?: string;
}

export const GreenPrintSchema = SchemaFactory.createForClass(GreenPrint);

// Helpful compound index (optional)
GreenPrintSchema.index({ handle: 1, isPublic: 1 });
