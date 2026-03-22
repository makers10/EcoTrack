import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  ecoPoints: number;

  @Prop({ default: 0 })
  totalCarbonReduction: number;

  @Prop({ type: [String], default: [] })
  preferences: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  lastLogin: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);