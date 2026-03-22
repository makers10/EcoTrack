import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/gaurds/jwt-auth.guard';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() createActivityDto: any, @Request() req) {
    // Add the userId from the authenticated user
    createActivityDto.userId = req.user.userId;
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.activitiesService.findByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: any) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }

  @Get('stats/summary')
  getStats(@Request() req) {
    return this.activitiesService.getUserStats(req.user.userId);
  }
}