import { ChallengesService } from '../challenges/challenges.service';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    create(dto: any): Promise<import("./challenges.schema").Challenge>;
    join(challengeId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./challenges.schema").Challenge, {}, {}> & import("./challenges.schema").Challenge & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProgress(challengeId: string, userId: string, amount: number): Promise<{
        userId: import("mongoose").Types.ObjectId;
        progress: number;
        completed: boolean;
        streak: number;
        lastUpdated: Date | null;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./challenges.schema").Challenge, {}, {}> & import("./challenges.schema").Challenge & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserChallenges(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./challenges.schema").Challenge, {}, {}> & import("./challenges.schema").Challenge & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
