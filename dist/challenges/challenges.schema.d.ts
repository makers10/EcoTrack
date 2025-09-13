import { Document, Types } from 'mongoose';
export declare class Challenge extends Document {
    title: string;
    description: string;
    type: 'daily' | 'weekly' | 'monthly';
    target: number;
    participants: Types.ObjectId[];
    userProgress: {
        userId: Types.ObjectId;
        progress: number;
        completed: boolean;
        streak: number;
        lastUpdated: Date | null;
    }[];
}
export declare const ChallengeSchema: import("mongoose").Schema<Challenge, import("mongoose").Model<Challenge, any, any, any, Document<unknown, any, Challenge, any, {}> & Challenge & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Challenge, Document<unknown, {}, import("mongoose").FlatRecord<Challenge>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Challenge> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
