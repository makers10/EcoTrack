import { Model, Types } from 'mongoose';
import { Challenge } from '../challenges/challenges.schema';
export declare class ChallengesService {
    private challengeModel;
    constructor(challengeModel: Model<Challenge>);
    createChallenge(dto: any): Promise<Challenge>;
    joinChallenge(challengeId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Challenge, {}, {}> & Challenge & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProgress(challengeId: string, userId: string, amount: number): Promise<{
        userId: Types.ObjectId;
        progress: number;
        completed: boolean;
        streak: number;
        lastUpdated: Date | null;
    }>;
    getActiveChallenges(): Promise<(import("mongoose").Document<unknown, {}, Challenge, {}, {}> & Challenge & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserChallenges(userId: string): Promise<(import("mongoose").Document<unknown, {}, Challenge, {}, {}> & Challenge & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
