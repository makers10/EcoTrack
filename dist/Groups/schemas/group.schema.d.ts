import { Document, Types } from 'mongoose';
export declare class Group extends Document {
    name: string;
    description: string;
    createdBy: Types.ObjectId;
    members: Types.ObjectId[];
    totalCO2Saved: number;
    type: string;
    totalCarbonSaved: number;
}
export declare const GroupSchema: import("mongoose").Schema<Group, import("mongoose").Model<Group, any, any, any, Document<unknown, any, Group, any, {}> & Group & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Group, Document<unknown, {}, import("mongoose").FlatRecord<Group>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Group> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
