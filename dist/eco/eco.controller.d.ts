import { EcoService } from './eco.service';
export declare class EcoController {
    private readonly eco;
    constructor(eco: EcoService);
    getAdvice(body: {
        activities?: any[];
        goal?: string;
    }): Promise<any>;
}
