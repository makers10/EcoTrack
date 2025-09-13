export declare class EcoAdviceService {
    private openai;
    constructor();
    getAdvice(question: string): Promise<string>;
}
