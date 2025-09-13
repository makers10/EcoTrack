import { Document, Types } from 'mongoose';
export declare class CarbonHistory {
    userId: Types.ObjectId;
    activity: string;
    carbonSavedKg: number;
    carbonFootprint: number;
    reducedCarbon: number;
    date: Date;
}
export type CarbonHistoryDocument = CarbonHistory & Document;
export declare const CarbonHistorySchema: import("mongoose").Schema<CarbonHistory, import("mongoose").Model<CarbonHistory, any, any, any, Document<unknown, any, CarbonHistory, any, {}> & CarbonHistory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CarbonHistory, Document<unknown, {}, import("mongoose").FlatRecord<CarbonHistory>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CarbonHistory> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
