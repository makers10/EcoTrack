import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile.schema';
import { CarbonHistory, CarbonHistorySchema, } from '../users/schemas/carbon-history.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Achievement,AchievementSchema } from './achievement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: CarbonHistory.name, schema: CarbonHistorySchema },
      { name: Achievement.name, schema: AchievementSchema },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
