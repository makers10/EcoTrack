import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class EcoService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async advice(input: { activities?: any[]; goal?: string }) {
    const prompt = `
You are EcoTrack Coach. User activities (JSON): ${JSON.stringify(input?.activities ?? [])}
User goal: ${input?.goal ?? 'general sustainability'}
Give 3–5 concrete, actionable, low-effort tips and estimate weekly CO₂ reduction per tip (rough, in kg).
Return JSON:
{ "tips":[{"title":"","why":"","how":"","estimatedCO2kgPerWeek":0}] }
`;

    // Using Chat Completions via Responses API-like interface (SDK v4):
    const resp = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        { role: 'system', content: 'You are a precise sustainability assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    const text = resp.choices[0]?.message?.content || '{}';
    // Try JSON parse; fallback to text
    try { return JSON.parse(text); } catch { return { raw: text }; }
  }
}
