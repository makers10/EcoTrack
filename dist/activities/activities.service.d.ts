import { Model } from 'mongoose';
import { Activity } from './schemas/activities.schema';
import { UsersService } from '../users/users.service';
import { CarbonService } from '../carbon/carbon.service';
export declare class ActivitiesService {
    private activityModel;
    private usersService;
    private carbonService;
    constructor(activityModel: Model<Activity>, usersService: UsersService, carbonService: CarbonService);
    create(createActivityDto: any): Promise<Activity>;
    findByUser(userId: string): Promise<Activity[]>;
    findOne(id: string): Promise<Activity | null>;
    update(id: string, updateActivityDto: any): Promise<Activity | null>;
    remove(id: string): Promise<Activity | null>;
    getUserStats(userId: string): Promise<{
        totalReduction: number;
        activityCount: number;
    }>;
}
