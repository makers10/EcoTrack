import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 0 })
  totalCarbonSaved: number; // cumulative carbon savings

  @Prop({ required: true })
  userId: string; 

  @Prop()
  avatarUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Group' })
  groupId?: Types.ObjectId;

  @Prop({ default: [] })
  badges: string[];  // e.g. ["First100Kg", "TopRecycler"]

  @Prop({ default: true })
  isPublic: boolean; // allow public Eco Profile

  // Add carbonHistory array
  @Prop({
    type: [
      {
        date: { type: Date, default: Date.now },
        action: String,  // e.g., "Bike commute", "Solar energy used"
        carbonSaved: Number, // e.g., kg CO2 saved
      },
    ],
    default: [],
  })
  carbonHistory: {
    date: Date;
    action: string;
    carbonSaved: number;
  }[];


}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
export type ProfileDocument = Profile & Document;