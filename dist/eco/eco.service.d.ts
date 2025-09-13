export declare class EcoService {
    private openai;
    advice(input: {
        activities?: any[];
        goal?: string;
    }): Promise<any>;
}
