import { GreenPrintService } from './greenprint.service';
export declare class GreenPrintController {
    private readonly gpService;
    constructor(gpService: GreenPrintService);
    getGreenPrint(idOrHandle: string, by?: 'handle' | 'id'): Promise<{
        userId: import("mongoose").Types.ObjectId;
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
    getShareCard(idOrHandle: string, by?: 'handle' | 'id'): Promise<{
        title: string;
        subtitle: string;
        badges: string[];
        meta: {
            streakDays: number;
            challengesCompleted: number;
        };
        theme: string;
    }>;
}
