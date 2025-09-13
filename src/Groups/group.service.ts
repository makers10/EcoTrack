// src/Groups/group.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from '../Groups/schemas/group.schema';
import { Profile } from '../Profile/profile.schema'; // to fetch CO2 savings per member

@Injectable()
export class GroupService {
  getGroupLeaderboard() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Group.name) private groupModel: Model<Group>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createGroup(name: string, description: string, createdBy: string, type: string) {
    return this.groupModel.create({ name, description, createdBy, type });
  }

  async addMember(groupId: string, userId: string) {
    return this.groupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } },
      { new: true },
    );
  }

  async joinGroup(groupId: string, userId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    if (!group.members.includes(new Types.ObjectId(userId))) {
      group.members.push(new Types.ObjectId(userId));
    }
    await group.save();
    return group;
  }

  async calculateGroupCO2(groupId: string) {
    const group = await this.groupModel.findById(groupId).populate('members');
    if (!group) throw new NotFoundException('Group not found');

    let totalCO2 = 0;
    for (const member of group.members) {
      const profile = await this.profileModel.findOne({ userId: member });
      if (profile) {
        totalCO2 += profile.totalCarbonSaved;
      }
    }

    group.totalCO2Saved = totalCO2;
    await group.save();

    return { groupId, totalCO2 };
  }

  async getLeaderboard() {
    return this.groupModel.find().sort({ totalCO2Saved: -1 }).limit(10);
  }

  async updateGroupCO2(userId: string, deltaCO2: number) {
    // Find all groups where this user is a member
    await this.groupModel.updateMany(
      { members: userId },
      { $inc: { totalCO2Saved: deltaCO2 } },
    );
  }
}
