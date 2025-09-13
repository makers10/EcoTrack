export declare class CarbonService {
    calculateReduction(activityType: string, value: number): number;
    getActivityTypes(): {
        id: string;
        name: string;
        unit: string;
    }[];
}
