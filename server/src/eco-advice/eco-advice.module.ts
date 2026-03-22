import { Module } from '@nestjs/common';
import { EcoAdviceService } from './eco-advice.service';
import { EcoAdviceController } from './eco-advice.controller';

@Module({
  controllers: [EcoAdviceController],
  providers: [EcoAdviceService],
})
export class EcoAdviceModule {}
