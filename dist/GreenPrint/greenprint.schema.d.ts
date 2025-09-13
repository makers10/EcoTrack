import { HydratedDocument, Types } from 'mongoose';
export type GreenPrintDocument = HydratedDocument<GreenPrint>;
export declare class GreenPrint {
    userId: Types.ObjectId;
    handle?: string;
    updatedAt?: Date;
    highlights: string[];
    totalCO2Saved: number;
    challengesCompleted: number;
    badges: string[];
    streakDays: number;
    lastStreakDate?: Date;
    isPublic: boolean;
    theme: string;
    bio?: string;
    avatarUrl?: string;
}
export declare const GreenPrintSchema: import("mongoose").Schema<GreenPrint, import("mongoose").Model<GreenPrint, any, any, any, import("mongoose").Document<unknown, any, GreenPrint, any, {}> & GreenPrint & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GreenPrint, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<GreenPrint>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<GreenPrint> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
