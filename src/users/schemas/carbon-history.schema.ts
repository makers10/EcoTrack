import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CarbonHistory {
  @Prop({ type: Types.ObjectId, ref: 'Profile', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  activity: string;

  @Prop({ required: true })
  carbonSavedKg: number;

  @Prop({ required: true })
  carbonFootprint: number;

  @Prop({ required: true })
  reducedCarbon: number;

  @Prop({ default: Date.now })
  date: Date;
}

export type CarbonHistoryDocument = CarbonHistory & Document;
export const CarbonHistorySchema = SchemaFactory.createForClass(CarbonHistory);
