"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const profile_schema_1 = require("./profile.schema");
const carbon_history_schema_1 = require("../users/schemas/carbon-history.schema");
const achievement_schema_1 = require("./achievement.schema");
const greenprint_service_1 = require("../GreenPrint/greenprint.service");
const group_service_1 = require("../groups/group.service");
const user_schema_1 = require("../users/schemas/user.schema");
let ProfileService = class ProfileService {
    constructor(profileModel, greenPrintService, groupService, carbonHistoryModel, achievementModel, userModel) {
        this.profileModel = profileModel;
        this.greenPrintService = greenPrintService;
        this.groupService = groupService;
        this.carbonHistoryModel = carbonHistoryModel;
        this.achievementModel = achievementModel;
        this.userModel = userModel;
    }
    async saveCarbonHistory(userId, footprint, reduced) {
        return this.carbonHistoryModel.create({
            userId,
            carbonFootprint: footprint,
            reducedCarbon: reduced,
        });
    }
    async addCarbonHistory(userId, activity, carbonSavedKg) {
        const newHistory = new this.carbonHistoryModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            activity,
            carbonSaved: carbonSavedKg,
            date: new Date(),
        });
        await newHistory.save();
        const profile = await this.profileModel.findOne({ userId });
        if (!profile)
            throw new Error('Profile not found');
        if (!profile.carbonHistory)
            profile.carbonHistory = [];
        profile.carbonHistory.push({
            date: new Date(),
            action: activity,
            carbonSaved: carbonSavedKg,
        });
        if (profile.groupId) {
            await this.groupService.updateGroupCO2(profile.groupId.toString(), carbonSavedKg);
        }
        profile.totalCarbonSaved = (profile.totalCarbonSaved || 0) + carbonSavedKg;
        await profile.save();
        const total = await this.carbonHistoryModel.aggregate([
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
            { $group: { _id: null, totalSaved: { $sum: '$carbonSaved' } } },
        ]);
        const totalSaved = total[0]?.totalSaved || 0;
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
        await this.greenPrintService.syncUserGreenPrint(userId, {
            activity,
            amount: carbonSavedKg,
        });
        return newHistory;
    }
    async getUserAchievements(userId) {
        return this.achievementModel.find({ userId }).sort({ milestone: 1 }).exec();
    }
    async getUserHistory(userId) {
        return this.carbonHistoryModel.find({ userId }).sort({ date: -1 }).exec();
    }
    async getLeaderboard(timeframe) {
        const now = new Date();
        let startDate;
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
                startDate = new Date(0);
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
        const overallTotal = leaderboard.reduce((sum, user) => sum + user.totalCarbonSaved, 0);
        const results = await Promise.all(leaderboard.map(async (entry, index) => {
            const user = await this.profileModel
                .findById(entry._id)
                .select('name email');
            const percentage = overallTotal > 0
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
        }));
        return {
            timeframe: timeframe || 'all-time',
            leaderboard: results,
        };
    }
    async getGroupLeaderboard() {
        return this.groupService.getGroupLeaderboard();
    }
    async getCarbonTrend(userId, timeframe) {
        const groupBy = timeframe === 'weekly'
            ? { $week: '$date' }
            : { $dateToString: { format: '%Y-%m-%d', date: '$date' } };
        return this.carbonHistoryModel.aggregate([
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: groupBy,
                    totalSaved: { $sum: '$carbonSaved' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
    }
    async getTopActivities(userId) {
        return this.carbonHistoryModel.aggregate([
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
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
    async getPersonalBests(userId) {
        const weekly = await this.carbonHistoryModel.aggregate([
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
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
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
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
    async getComparison(userId) {
        const userAvg = await this.carbonHistoryModel.aggregate([
            { $match: { userId: new mongoose_2.Types.ObjectId(userId) } },
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
    async getPublicProfile(username) {
        const user = await this.userModel.findOne({ username }).select('username');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const profile = await this.profileModel
            .findOne({ userId: user._id, isPublic: true })
            .select('totalCarbonSaved badges');
        if (!profile)
            throw new common_1.NotFoundException('Profile is private');
        return {
            username: user.username,
            totalCarbonSaved: profile.totalCarbonSaved,
            badges: profile.badges,
            shareUrl: `https://ecotrack.app/profile/${user.username}`,
        };
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_schema_1.Profile.name)),
    __param(3, (0, mongoose_1.InjectModel)(carbon_history_schema_1.CarbonHistory.name)),
    __param(4, (0, mongoose_1.InjectModel)(achievement_schema_1.Achievement.name)),
    __param(5, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        greenprint_service_1.GreenPrintService,
        group_service_1.GroupService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProfileService);
//# sourceMappingURL=profile.service.js.map