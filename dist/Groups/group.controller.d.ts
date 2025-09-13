import { GroupService } from './group.service';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    createGroup(name: string, description: string, createdBy: string, type: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}, {}> & import("./schemas/group.schema").Group & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    joinGroup(groupId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}, {}> & import("./schemas/group.schema").Group & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    calculateCO2(groupId: string): Promise<{
        groupId: string;
        totalCO2: number;
    }>;
    leaderboard(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}, {}> & import("./schemas/group.schema").Group & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
