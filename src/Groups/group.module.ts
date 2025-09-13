import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../Groups/schemas/group.schema';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Profile, ProfileSchema } from '../Profile/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
