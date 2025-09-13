import { Model, Types } from 'mongoose';
import { GreenPrint, GreenPrintDocument } from '../GreenPrint/greenprint.schema';
export declare class GreenPrintService {
    private readonly greenPrintModel;
    constructor(greenPrintModel: Model<GreenPrintDocument>);
    create(data: Partial<GreenPrint>): Promise<GreenPrint>;
    findAll(): Promise<GreenPrint[]>;
    findOne(id: string): Promise<GreenPrint | null>;
    update(id: string, data: Partial<GreenPrint>): Promise<GreenPrint | null>;
    remove(id: string): Promise<GreenPrint | null>;
    syncUserGreenPrint(userId: string, entry: {
        activity: string;
        amount: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    private ensureForUser;
    getPublicGreenPrint(idOrHandle: string, useHandle?: boolean): Promise<{
        userId: Types.ObjectId;
        handle: string;
        totalCO2Saved: number;
        challengesCompleted: number;
        badges: string[];
        streakDays: number;
        theme: string;
        bio: string;
        avatarUrl: string;
        updatedAt: Date;
    }>;
    getShareableCard(idOrHandle: string, useHandle?: boolean): Promise<{
        title: string;
        subtitle: string;
        badges: string[];
        meta: {
            streakDays: number;
            challengesCompleted: number;
        };
        theme: string;
    }>;
    addSavedCarbon(userId: string, savedKg: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    addBadge(userId: string, badge: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    bumpStreak(userId: string, date?: Date): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    setHandle(userId: string, handle: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    setVisibility(userId: string, isPublic: boolean): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    setTheme(userId: string, theme: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    setBio(userId: string, bio: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, GreenPrint, {}, {}> & GreenPrint & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
}
