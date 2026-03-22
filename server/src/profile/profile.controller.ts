import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ProfileService } from './profile.service';

// Optional: keep a central type for clarity
type Timeframe = 'daily' | 'weekly' | 'monthly' | 'all-time';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('public/:username')
  async getPublicProfile(@Param('username') username: string) {
    return this.profileService.getPublicProfile(username);
  }

  // step 3
 // 1. Trend endpoint
  @Get('analytics/trend/:userId')
  async carbonTrend(
    @Param('userId') userId: string,
    @Query('timeframe') timeframe: 'daily' | 'weekly' = 'daily',
  ) {
    return this.profileService.getCarbonTrend(userId, timeframe);
  }

  // 2. Top activities
  @Get('analytics/top-activities/:userId')
  async topActivities(@Param('userId') userId: string) {
    return this.profileService.getTopActivities(userId);
  }

  // 3. Personal bests
  @Get('analytics/personal-bests/:userId')
  async personalBests(@Param('userId') userId: string) {
    return this.profileService.getPersonalBests(userId);
  }

  // 4. Comparison vs community
  @Get('analytics/comparison/:userId')
  async comparison(@Param('userId') userId: string) {
    return this.profileService.getComparison(userId);
  }


  /**
   * Add carbon history for a user
   * - POST /profile/:userId/history
   * Body: { activity: string; carbonSavedKg: number }
   * Also auto-assigns achievements when thresholds are crossed.
   */
  @Post(':userId/history')
  async addCarbonHistory(
    @Param('userId') userId: string,
    @Body() body: { activity: string; carbonSavedKg: number },
  ) {
    const { activity, carbonSavedKg } = body || {};
    if (!activity || typeof carbonSavedKg !== 'number') {
      throw new BadRequestException('activity (string) and carbonSavedKg (number) are required.');
    }
    return this.profileService.addCarbonHistory(userId, activity, carbonSavedKg);
  }

  /**
   * Get carbon history for a user
   * - GET /profile/:userId/history
   */
  @Get(':userId/history')
  async getUserHistory(@Param('userId') userId: string) {
    return this.profileService.getUserHistory(userId);
  }

  /**
   * Leaderboard
   * - GET /profile/leaderboard
   * - Supports both:
   *   • ?timeframe=daily|weekly|monthly|all-time
   *   • (legacy) ?period=daily|weekly|monthly  ➜ maps to timeframe
   * - Defaults to "all-time" if neither is provided
   *
   * Examples:
   *   /profile/leaderboard                    -> all-time
   *   /profile/leaderboard?timeframe=weekly  -> weekly
   *   /profile/leaderboard?period=monthly    -> monthly (legacy param)
   */
  @Get('leaderboard')
  async getLeaderboard(
    @Query('timeframe') timeframe?: string,
    @Query('period') period?: string, // legacy support
  ) {
    // Prefer `timeframe`, fall back to legacy `period`
    const raw = (timeframe ?? period ?? '').toString().trim().toLowerCase();

    // Normalize to our accepted set
    let normalized: Timeframe = 'all-time';
    if (raw === 'daily' || raw === 'weekly' || raw === 'monthly' || raw === 'all-time') {
      normalized = raw as Timeframe;
    } else if (raw === 'all' || raw === 'alltime') {
      normalized = 'all-time';
    }

    return this.profileService.getLeaderboard(normalized);
  }

  /**
   * Fetch user achievements (badges earned)
   * - GET /profile/:userId/achievements
   */
  @Get(':userId/achievements')
  async getAchievements(@Param('userId') userId: string) {
    return this.profileService.getUserAchievements(userId);
  }
}
