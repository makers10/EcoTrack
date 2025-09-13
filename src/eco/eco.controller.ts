import { Body, Controller, Post } from '@nestjs/common';
import { EcoService } from './eco.service';

@Controller('eco')
export class EcoController {
  constructor(private readonly eco: EcoService) {}

  @Post('advice')
  async getAdvice(@Body() body: { activities?: any[]; goal?: string }) {
    // optional validation here
    return this.eco.advice(body);
  }
}
