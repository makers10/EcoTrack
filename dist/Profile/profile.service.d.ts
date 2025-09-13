import { Model } from 'mongoose';
import { ProfileDocument } from './profile.schema';
import { CarbonHistory, CarbonHistoryDocument } from '../users/schemas/carbon-history.schema';
import { Achievement, AchievementDocument } from './achievement.schema';
import { GreenPrintService } from 'src/GreenPrint/greenprint.service';
import { GroupService } from 'src/groups/group.service';
import { UserDocument } from '../users/schemas/user.schema';
export declare class ProfileService {
    private profileModel;
    private readonly greenPrintService;
    private readonly groupService;
    private carbonHistoryModel;
    private achievementModel;
    private userModel;
    constructor(profileModel: Model<ProfileDocument>, greenPrintService: GreenPrintService, groupService: GroupService, carbonHistoryModel: Model<CarbonHistoryDocument>, achievementModel: Model<AchievementDocument>, userModel: Model<UserDocument>);
    saveCarbonHistory(userId: string, footprint: number, reduced: number): Promise<import("mongoose").Document<unknown, {}, CarbonHistoryDocument, {}, {}> & CarbonHistory & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addCarbonHistory(userId: string, activity: string, carbonSavedKg: number): Promise<import("mongoose").Document<unknown, {}, CarbonHistoryDocument, {}, {}> & CarbonHistory & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserAchievements(userId: string): Promise<(import("mongoose").Document<unknown, {}, AchievementDocument, {}, {}> & Achievement & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserHistory(userId: string): Promise<(import("mongoose").Document<unknown, {}, CarbonHistoryDocument, {}, {}> & CarbonHistory & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getLeaderboard(timeframe?: 'daily' | 'weekly' | 'monthly' | 'all-time'): Promise<{
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
    getGroupLeaderboard(): Promise<void>;
    getCarbonTrend(userId: string, timeframe: 'daily' | 'weekly'): Promise<any[]>;
    getTopActivities(userId: string): Promise<any[]>;
    getPersonalBests(userId: string): Promise<{
        weeklyBest: any;
        monthlyBest: any;
    }>;
    getComparison(userId: string): Promise<{
        userAvg: any;
        communityAvg: any;
    }>;
    getPublicProfile(username: string): Promise<{
        username: string;
        totalCarbonSaved: number;
        badges: string[];
        shareUrl: string;
    }>;
}
