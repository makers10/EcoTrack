import { Controller, Get, Param, Query } from '@nestjs/common';
import { GreenPrintService } from './greenprint.service';

@Controller('greenprint')
export class GreenPrintController {
  constructor(private readonly gpService: GreenPrintService) {}

  // Public eco portfolio:
  // GET /greenprint/:idOrHandle?by=handle  (use handle)
  // GET /greenprint/:idOrHandle            (default: by userId)
  @Get(':idOrHandle')
  async getGreenPrint(
    @Param('idOrHandle') idOrHandle: string,
    @Query('by') by?: 'handle' | 'id',
  ) {
    const useHandle = by === 'handle';
    return this.gpService.getPublicGreenPrint(idOrHandle, useHandle);
  }

  // Shareable “card” payload (for social share UI)
  @Get(':idOrHandle/share')
  async getShareCard(
    @Param('idOrHandle') idOrHandle: string,
    @Query('by') by?: 'handle' | 'id',
  ) {
    const useHandle = by === 'handle';
    return this.gpService.getShareableCard(idOrHandle, useHandle);
  }
}
