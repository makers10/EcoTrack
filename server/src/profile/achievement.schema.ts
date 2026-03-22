import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Achievement {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Reference to User who earned the badge

  @Prop({ required: true })
  badgeName: string; // e.g., "Eco Beginner", "Eco Warrior"

  @Prop({ required: true })
  description: string; // What this badge means

  @Prop({ required: true })
  milestone: number; // milestone in kg CO₂ (10, 50, 100, etc.)
}

export type AchievementDocument = Achievement & Document;
export const AchievementSchema = SchemaFactory.createForClass(Achievement);
