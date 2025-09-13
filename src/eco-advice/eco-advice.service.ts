import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class EcoAdviceService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getAdvice(question: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are EcoAdvisor, an expert in sustainability, recycling, and eco-friendly living.' },
        { role: 'user', content: question },
      ],
    });

    return completion.choices[0].message.content || 'Sorry, no advice available.';
  }
}
