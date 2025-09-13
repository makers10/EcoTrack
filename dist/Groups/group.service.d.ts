import { Model } from 'mongoose';
import { Group } from '../Groups/schemas/group.schema';
import { Profile } from '../Profile/profile.schema';
export declare class GroupService {
    private groupModel;
    private profileModel;
    getGroupLeaderboard(): void;
    constructor(groupModel: Model<Group>, profileModel: Model<Profile>);
    createGroup(name: string, description: string, createdBy: string, type: string): Promise<import("mongoose").Document<unknown, {}, Group, {}, {}> & Group & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addMember(groupId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Group, {}, {}> & Group & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    joinGroup(groupId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, Group, {}, {}> & Group & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    calculateGroupCO2(groupId: string): Promise<{
        groupId: string;
        totalCO2: number;
    }>;
    getLeaderboard(): Promise<(import("mongoose").Document<unknown, {}, Group, {}, {}> & Group & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateGroupCO2(userId: string, deltaCO2: number): Promise<void>;
}
