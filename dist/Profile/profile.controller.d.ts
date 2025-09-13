import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getPublicProfile(username: string): Promise<{
        username: string;
        totalCarbonSaved: number;
        badges: string[];
        shareUrl: string;
    }>;
    carbonTrend(userId: string, timeframe?: 'daily' | 'weekly'): Promise<any[]>;
    topActivities(userId: string): Promise<any[]>;
    personalBests(userId: string): Promise<{
        weeklyBest: any;
        monthlyBest: any;
    }>;
    comparison(userId: string): Promise<{
        userAvg: any;
        communityAvg: any;
    }>;
    addCarbonHistory(userId: string, body: {
        activity: string;
        carbonSavedKg: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/carbon-history.schema").CarbonHistoryDocument, {}, {}> & import("../users/schemas/carbon-history.schema").CarbonHistory & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserHistory(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../users/schemas/carbon-history.schema").CarbonHistoryDocument, {}, {}> & import("../users/schemas/carbon-history.schema").CarbonHistory & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getLeaderboard(timeframe?: string, period?: string): Promise<{
        timeframe: "daily" | "weekly" | "monthly" | "all-time";
        leaderboard: {
            rank: number;
            userId: any;
            name: string;
            email: string;
            totalCarbonSaved: any;
            percentage: string;
        }[];
    }>;
    getAchievements(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./achievement.schema").AchievementDocument, {}, {}> & import("./achievement.schema").Achievement & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
