import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './schemas/activities.schema';
import { UsersService } from '../users/users.service';
import { CarbonService } from '../carbon/carbon.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
    private usersService: UsersService,
    private carbonService: CarbonService,
  ) {}

  async create(createActivityDto: any): Promise<Activity> {
    const carbonReduction = this.carbonService.calculateReduction(
      createActivityDto.type,
      createActivityDto.value,
    );

    const activityData = {
      ...createActivityDto,
      carbonReduction,
    };

    const activity = new this.activityModel(activityData);
    const savedActivity = await activity.save();

    // Update user's total carbon reduction and eco points
    await this.usersService.addCarbonReduction(createActivityDto.userId, carbonReduction);

    return savedActivity;
  }

  async findByUser(userId: string): Promise<Activity[]> {
    return this.activityModel.find({ userId }).sort({ date: -1 }).exec();
  }

  async findOne(id: string): Promise<Activity | null> {
    return this.activityModel.findById(id).exec();
  }

  async update(id: string, updateActivityDto: any): Promise<Activity | null> {
    return this.activityModel
      .findByIdAndUpdate(id, updateActivityDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Activity | null> {
    return this.activityModel.findByIdAndDelete(id).exec();
  }

  async getUserStats(userId: string): Promise<{totalReduction: number, activityCount: number}> {
    const activities = await this.activityModel.find({ userId }).exec();
    const totalReduction = activities.reduce((sum, activity) => sum + activity.carbonReduction, 0);
    
    return {
      totalReduction,
      activityCount: activities.length
    };
  }
}