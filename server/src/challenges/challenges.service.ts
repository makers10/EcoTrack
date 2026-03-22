import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Challenge } from '../challenges/challenges.schema';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenge.name) private challengeModel: Model<Challenge>,
  ) {}

  // Create a new challenge (admin can create)
  async createChallenge(dto: any): Promise<Challenge> {
    const newChallenge = new this.challengeModel(dto);
    return newChallenge.save();
  }

  // User joins a challenge
  async joinChallenge(challengeId: string, userId: string) {
    const challenge = await this.challengeModel.findById(challengeId);
    if (!challenge) throw new NotFoundException('Challenge not found');

    if (!challenge.participants.includes(new Types.ObjectId(userId))) {
      challenge.participants.push(new Types.ObjectId(userId));
      challenge.userProgress.push({
        userId: new Types.ObjectId(userId),
        progress: 0,
        completed: false,
        streak: 0,
        lastUpdated: null,
      });
    }

    return challenge.save();
  }

  // Update progress (when user logs carbon savings or activity)
  async updateProgress(challengeId: string, userId: string, amount: number) {
    const challenge = await this.challengeModel.findById(challengeId);
    if (!challenge) throw new NotFoundException('Challenge not found');

    const userEntry = challenge.userProgress.find(
      (up) => up.userId.toString() === userId,
    );
    if (!userEntry) throw new NotFoundException('User not in challenge');

    // Update progress
    userEntry.progress += amount;

    // Check if challenge completed
    if (userEntry.progress >= challenge.target) {
      userEntry.completed = true;
    }

    // Handle streak
    const today = new Date();
    if (userEntry.lastUpdated) {
      const lastDate = new Date(userEntry.lastUpdated);
      const diffDays = Math.floor(
        (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        userEntry.streak += 1; // consecutive
      } else if (diffDays > 1) {
        userEntry.streak = 1; // reset
      }
    } else {
      userEntry.streak = 1; // first log
    }

    userEntry.lastUpdated = today;

    await challenge.save();
    return userEntry;
  }

  // Get all active challenges
  async getActiveChallenges() {
    return this.challengeModel.find();
  }

  // Get a user’s progress in challenges
  async getUserChallenges(userId: string) {
    return this.challengeModel.find({
      'userProgress.userId': new Types.ObjectId(userId),
    });
  }
}
