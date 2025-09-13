import { Document, Types } from 'mongoose';
export declare class Achievement {
    user: Types.ObjectId;
    badgeName: string;
    description: string;
    milestone: number;
}
export type AchievementDocument = Achievement & Document;
export declare const AchievementSchema: import("mongoose").Schema<Achievement, import("mongoose").Model<Achievement, any, any, any, Document<unknown, any, Achievement, any, {}> & Achievement & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Achievement, Document<unknown, {}, import("mongoose").FlatRecord<Achievement>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Achievement> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
