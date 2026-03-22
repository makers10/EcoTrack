import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Group extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  members: Types.ObjectId[];

  @Prop({ default: 0 })
  totalCO2Saved: number; // Aggregate from members

  @Prop({ type: String, enum: ['school', 'workplace', 'friends', 'community'], default: 'community' })
  type: string; // category of group

   @Prop({ default: 0 })
   totalCarbonSaved: number; // auto-updated whenever members update
}

export const GroupSchema = SchemaFactory.createForClass(Group);
