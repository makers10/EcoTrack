import { EcoAdviceService } from './eco-advice.service';
export declare class EcoAdviceController {
    private readonly ecoAdviceService;
    constructor(ecoAdviceService: EcoAdviceService);
    getEcoAdvice(question: string): Promise<{
        question: string;
        answer: string;
    }>;
}
