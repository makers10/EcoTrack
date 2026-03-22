import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Activity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true, enum: [
    'recycling_plastic',
    'recycling_paper',
    'recycling_glass',
    'biking',
    'walking',
    'public_transport',
    'energy_saving',
    'water_saving',
    'sustainable_shopping'
  ]})
  type: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  carbonReduction: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ default: false })
  verified: boolean;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);