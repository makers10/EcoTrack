// profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';  // added NotFoundException
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from './profile.schema';
import { CarbonHistory, CarbonHistoryDocument } from '../users/schemas/carbon-history.schema';
import { Achievement, AchievementDocument } from './achievement.schema';
import { GreenPrintService } from 'src/GreenPrint/greenprint.service';
import { GroupService } from 'src/groups/group.service';
import { User, UserDocument } from '../users/schemas/user.schema'; // NEW: to fetch username



@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private readonly greenPrintService: GreenPrintService,
    private readonly groupService: GroupService,
    @InjectModel(CarbonHistory.name)
    private carbonHistoryModel: Model<CarbonHistoryDocument>,
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,   // ⬅️ NEW: inject User model for username lookup
  ) {}

  // =====================================
  // Save raw CarbonHistory (for internal use)
  // =====================================
  async saveCarbonHistory(userId: string, footprint: number, reduced: number) {
    return this.carbonHistoryModel.create({
      userId,
      carbonFootprint: footprint,
      reducedCarbon: reduced,
    });
  }

  // =====================================
  // Main: Add Carbon History + Badges + GreenPrint + Group Sync
  // =====================================
  async addCarbonHistory(userId: string, activity: string, carbonSavedKg: number) {
    const newHistory = new this.carbonHistoryModel({
      userId: new Types.ObjectId(userId),
      activity,
      carbonSaved: carbonSavedKg,
      date: new Date(),
    });
    await newHistory.save();

    const profile = await this.profileModel.findOne({ userId });
    if (!profile) throw new Error('Profile not found');

    if (!profile.carbonHistory) profile.carbonHistory = [];

    profile.carbonHistory.push({
      date: new Date(),
      action: activity,
      carbonSaved: carbonSavedKg,
    });

    // ✅ Update group stats if user belongs to a group
    if (profile.groupId) {
      await this.groupService.updateGroupCO2(profile.groupId.toString(), carbonSavedKg);
    }

    profile.totalCarbonSaved = (profile.totalCarbonSaved || 0) + carbonSavedKg;
    await profile.save();

    // 3. Calculate total saved for badge logic
    const total = await this.carbonHistoryModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $group: { _id: null, totalSaved: { $sum: '$carbonSaved' } } },
    ]);
    const totalSaved = total[0]?.totalSaved || 0;

    // 4. Assign achievements if milestones crossed
    const milestones = [
      { value: 10, badge: 'Eco Beginner', desc: 'Saved 10kg of CO₂ emissions!' },
      { value: 50, badge: 'Eco Warrior', desc: 'Saved 50kg of CO₂ emissions!' },
      { value: 100, badge: 'Planet Guardian', desc: 'Saved 100kg of CO₂ emissions!' },
    ];

    for (const m of milestones) {
      if (totalSaved >= m.value) {
        const already = await this.achievementModel.findOne({
          userId,
          milestone: m.value,
        });
        if (!already) {
          await this.achievementModel.create({
            userId,
            badgeName: m.badge,
            description: m.desc,
            milestone: m.value,
            earnedAt: new Date(),
          });
        }
      }
    }

    // 5. Sync with GreenPrint
    await this.greenPrintService.syncUserGreenPrint(userId, {
      activity,
      amount: carbonSavedKg,
    });

    return newHistory;
  }

  // =====================================
  // Fetch User Achievements
  // =====================================
  async getUserAchievements(userId: string) {
    return this.achievementModel.find({ userId }).sort({ milestone: 1 }).exec();
  }

  // =====================================
  // Get User Carbon History
  // =====================================
  async getUserHistory(userId: string) {
    return this.carbonHistoryModel.find({ userId }).sort({ date: -1 }).exec();
  }

  // =====================================
  // Leaderboard (Users)
  // =====================================
  async getLeaderboard(timeframe?: 'daily' | 'weekly' | 'monthly' | 'all-time') {
    const now = new Date();
    let startDate: Date;

    switch (timeframe) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        const firstDayOfWeek = now.getDate() - now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        startDate = new Date(0); // all-time
    }

    const leaderboard = await this.carbonHistoryModel.aggregate([
      { $match: { date: { $gte: startDate } } },
      {
        $group: {
          _id: '$userId',
          totalCarbonSaved: { $sum: '$carbonSaved' },
        },
      },
      { $sort: { totalCarbonSaved: -1 } },
    ]);

    const overallTotal = leaderboard.reduce(
      (sum, user) => sum + user.totalCarbonSaved,
      0,
    );

    const results = await Promise.all(
      leaderboard.map(async (entry, index) => {
        const user = await this.profileModel
          .findById(entry._id)
          .select('name email');

        const percentage =
          overallTotal > 0
            ? ((entry.totalCarbonSaved / overallTotal) * 100).toFixed(2)
            : '0.00';

        return {
          rank: index + 1,
          userId: entry._id,
          name: user?.name || 'Unknown',
          email: user?.email || '',
          totalCarbonSaved: entry.totalCarbonSaved,
          percentage: `${percentage}%`,
        };
      }),
    );

    return {
      timeframe: timeframe || 'all-time',
      leaderboard: results,
    };
  }

  // =====================================
  // ✅ NEW: Group Leaderboard
  // =====================================
  async getGroupLeaderboard() {
    return this.groupService.getGroupLeaderboard();
  }

  // =====================================
  // Analytics Features
  // =====================================
  async getCarbonTrend(userId: string, timeframe: 'daily' | 'weekly') {
    const groupBy =
      timeframe === 'weekly'
        ? { $week: '$date' }
        : { $dateToString: { format: '%Y-%m-%d', date: '$date' } };

    return this.carbonHistoryModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: groupBy,
          totalSaved: { $sum: '$carbonSaved' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async getTopActivities(userId: string) {
    return this.carbonHistoryModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$activity',
          totalSaved: { $sum: '$carbonSaved' },
        },
      },
      { $sort: { totalSaved: -1 } },
      { $limit: 5 },
    ]);
  }

  async getPersonalBests(userId: string) {
    const weekly = await this.carbonHistoryModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $week: '$date' },
          weeklySaved: { $sum: '$carbonSaved' },
        },
      },
      { $sort: { weeklySaved: -1 } },
      { $limit: 1 },
    ]);

    const monthly = await this.carbonHistoryModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $month: '$date' },
          monthlySaved: { $sum: '$carbonSaved' },
        },
      },
      { $sort: { monthlySaved: -1 } },
      { $limit: 1 },
    ]);

    return { weeklyBest: weekly[0] || null, monthlyBest: monthly[0] || null };
  }

  async getComparison(userId: string) {
    const userAvg = await this.carbonHistoryModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $group: { _id: null, avg: { $avg: '$carbonSaved' } } },
    ]);

    const communityAvg = await this.carbonHistoryModel.aggregate([
      { $group: { _id: null, avg: { $avg: '$carbonSaved' } } },
    ]);

    return {
      userAvg: userAvg[0]?.avg || 0,
      communityAvg: communityAvg[0]?.avg || 0,
    };
  }

  // =====================================
  // ✅ NEW: Public Eco Profile for Sharing
  // =====================================
  async getPublicProfile(username: string) {
    // find user by username
    const user = await this.userModel.findOne({ username }).select('username');
    if (!user) throw new NotFoundException('User not found');

    // get public profile
    const profile = await this.profileModel
      .findOne({ userId: user._id, isPublic: true })
      .select('totalCarbonSaved badges');

    if (!profile) throw new NotFoundException('Profile is private');

    return {
      username: user.username,
      totalCarbonSaved: profile.totalCarbonSaved,
      badges: profile.badges,
      shareUrl: `https://ecotrack.app/profile/${user.username}`,
    };
  }

  // =====================================
  // 🔥 NEW: Smart Recommendations & Goals
  // =====================================
  async getGoalProgress(userId: string) {
    const user = await this.userModel.findById(userId);
    const profile = await this.profileModel.findOne({ userId });
    if (!user || !profile) throw new NotFoundException('Profile data missing');

    const totalSaved = profile.totalCarbonSaved || 0;
    const goal = user.carbonSavingGoal || 100;
    const percentage = Math.min((totalSaved / goal) * 100, 100);

    return {
      goal,
      current: totalSaved,
      percentage,
      remaining: Math.max(goal - totalSaved, 0),
      period: user.goalPeriod || 'monthly',
    };
  }

  async setPersonalGoal(userId: string, goal: number, period: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { carbonSavingGoal: goal, goalPeriod: period },
      { new: true }
    );
  }

  async getRecommendations(userId: string) {
    const topActivities = await this.getTopActivities(userId);
    const history = await this.getUserHistory(userId);

    const recs = [];
    
    if (history.length < 3) {
      recs.push({ title: "Plant your first seed", desc: "Start logging your commute carbon to see your first impact.", impact: 'Medium' });
    }

    const hasComposted = history.some(h => h.activity.toLowerCase().includes('compost'));
    if (!hasComposted) {
      recs.push({ title: "Start Composting", desc: "Reduce landfill waste by 30%.", impact: 'High' });
    }

    const bikingImpact = topActivities.find(a => a._id.toLowerCase().includes('bike'))?.totalSaved || 0;
    if (bikingImpact > 5) {
      recs.push({ title: "E-Bike Transition", desc: "You love cycling! Try an E-bike for longer commutes to save 2x CO₂.", impact: 'High' });
    }

    return recs.slice(0, 3);
  }
}
