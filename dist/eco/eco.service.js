"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let EcoService = class EcoService {
    constructor() {
        this.openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
    }
    async advice(input) {
        const prompt = `
You are EcoTrack Coach. User activities (JSON): ${JSON.stringify(input?.activities ?? [])}
User goal: ${input?.goal ?? 'general sustainability'}
Give 3–5 concrete, actionable, low-effort tips and estimate weekly CO₂ reduction per tip (rough, in kg).
Return JSON:
{ "tips":[{"title":"","why":"","how":"","estimatedCO2kgPerWeek":0}] }
`;
        const resp = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.4,
            messages: [
                { role: 'system', content: 'You are a precise sustainability assistant.' },
                { role: 'user', content: prompt },
            ],
        });
        const text = resp.choices[0]?.message?.content || '{}';
        try {
            return JSON.parse(text);
        }
        catch {
            return { raw: text };
        }
    }
};
exports.EcoService = EcoService;
exports.EcoService = EcoService = __decorate([
    (0, common_1.Injectable)()
], EcoService);
//# sourceMappingURL=eco.service.js.map