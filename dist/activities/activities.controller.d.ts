import { ActivitiesService } from './activities.service';
export declare class ActivitiesController {
    private readonly activitiesService;
    constructor(activitiesService: ActivitiesService);
    create(createActivityDto: any, req: any): Promise<import("./schemas/activities.schema").Activity>;
    findAll(req: any): Promise<import("./schemas/activities.schema").Activity[]>;
    findOne(id: string): Promise<import("./schemas/activities.schema").Activity>;
    update(id: string, updateActivityDto: any): Promise<import("./schemas/activities.schema").Activity>;
    remove(id: string): Promise<import("./schemas/activities.schema").Activity>;
    getStats(req: any): Promise<{
        totalReduction: number;
        activityCount: number;
    }>;
}
