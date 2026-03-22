// How this Feature Works

// Admin creates challenges (daily/weekly/monthly).

// Users join challenges.

// Progress updates automatically whenever they log carbon history (we can hook this into your existing CarbonHistoryService).

// Streaks are tracked → if they log daily, streak goes up; if they miss a day, streak resets.

// Users can view their challenges and track completion.




import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ChallengesService } from '../challenges/challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  // Admin: create challenge
  @Post('create')
  async create(@Body() dto: any) {
    return this.challengesService.createChallenge(dto);
  }

  // User: join challenge
  @Post(':id/join/:userId')
  async join(@Param('id') challengeId: string, @Param('userId') userId: string) {
    return this.challengesService.joinChallenge(challengeId, userId);
  }

  // Update progress (e.g. when logging activity)
  @Post(':id/progress/:userId')
  async updateProgress(
    @Param('id') challengeId: string,
    @Param('userId') userId: string,
    @Body('amount') amount: number,
  ) {
    return this.challengesService.updateProgress(challengeId, userId, amount);
  }

  // Get all active challenges
  @Get()
  async getAll() {
    return this.challengesService.getActiveChallenges();
  }

  // Get user challenges
  @Get('user/:userId')
  async getUserChallenges(@Param('userId') userId: string) {
    return this.challengesService.getUserChallenges(userId);
  }
}
