import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Challenge extends Document {
  @Prop({ required: true })
  title: string; // e.g. "Bike to work 3 times this week"

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['daily', 'weekly', 'monthly'] })
  type: 'daily' | 'weekly' | 'monthly';

  @Prop({ required: true })
  target: number; // e.g. 3 (times) or 5 (kg CO2 saved)

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  participants: Types.ObjectId[];

  @Prop({
    type: [
      {
        userId: { type: Types.ObjectId, ref: 'User' },
        progress: { type: Number, default: 0 }, // how much done
        completed: { type: Boolean, default: false },
        streak: { type: Number, default: 0 }, // consecutive days/weeks
        lastUpdated: { type: Date, default: null },
      },
    ],
    default: [],
  })
  userProgress: {
    userId: Types.ObjectId;
    progress: number;
    completed: boolean;
    streak: number;
    lastUpdated: Date | null;
  }[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
