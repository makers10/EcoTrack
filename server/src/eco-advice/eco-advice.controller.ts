import { Controller, Post, Body } from '@nestjs/common';
import { EcoAdviceService } from './eco-advice.service';

@Controller('eco')
export class EcoAdviceController {
  constructor(private readonly ecoAdviceService: EcoAdviceService) {}

  @Post('advice')
  async getEcoAdvice(@Body('question') question: string) {
    const answer = await this.ecoAdviceService.getAdvice(question);
    return { question, answer };
  }
}
