import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async createGroup(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('createdBy') createdBy: string,
    @Body('type') type: string,
  ) {
    return this.groupService.createGroup(name, description, createdBy, type);
  }

  @Post(':groupId/join/:userId')
  async joinGroup(@Param('groupId') groupId: string, @Param('userId') userId: string) {
    return this.groupService.joinGroup(groupId, userId);
  }

  @Get(':groupId/calculate')
  async calculateCO2(@Param('groupId') groupId: string) {
    return this.groupService.calculateGroupCO2(groupId);
  }

  @Get('leaderboard')
  async leaderboard() {
    return this.groupService.getLeaderboard();
  }
}
