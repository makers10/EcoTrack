import { Document, Types } from 'mongoose';
export declare class Profile extends Document {
    name: string;
    email: string;
    totalCarbonSaved: number;
    userId: string;
    avatarUrl: string;
    groupId?: Types.ObjectId;
    badges: string[];
    isPublic: boolean;
    carbonHistory: {
        date: Date;
        action: string;
        carbonSaved: number;
    }[];
}
export declare const ProfileSchema: import("mongoose").Schema<Profile, import("mongoose").Model<Profile, any, any, any, Document<unknown, any, Profile, any, {}> & Profile & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Profile, Document<unknown, {}, import("mongoose").FlatRecord<Profile>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Profile> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export type ProfileDocument = Profile & Document;
