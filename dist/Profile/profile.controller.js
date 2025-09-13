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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getPublicProfile(username) {
        return this.profileService.getPublicProfile(username);
    }
    async carbonTrend(userId, timeframe = 'daily') {
        return this.profileService.getCarbonTrend(userId, timeframe);
    }
    async topActivities(userId) {
        return this.profileService.getTopActivities(userId);
    }
    async personalBests(userId) {
        return this.profileService.getPersonalBests(userId);
    }
    async comparison(userId) {
        return this.profileService.getComparison(userId);
    }
    async addCarbonHistory(userId, body) {
        const { activity, carbonSavedKg } = body || {};
        if (!activity || typeof carbonSavedKg !== 'number') {
            throw new common_1.BadRequestException('activity (string) and carbonSavedKg (number) are required.');
        }
        return this.profileService.addCarbonHistory(userId, activity, carbonSavedKg);
    }
    async getUserHistory(userId) {
        return this.profileService.getUserHistory(userId);
    }
    async getLeaderboard(timeframe, period) {
        const raw = (timeframe ?? period ?? '').toString().trim().toLowerCase();
        let normalized = 'all-time';
        if (raw === 'daily' || raw === 'weekly' || raw === 'monthly' || raw === 'all-time') {
            normalized = raw;
        }
        else if (raw === 'all' || raw === 'alltime') {
            normalized = 'all-time';
        }
        return this.profileService.getLeaderboard(normalized);
    }
    async getAchievements(userId) {
        return this.profileService.getUserAchievements(userId);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)('public/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getPublicProfile", null);
__decorate([
    (0, common_1.Get)('analytics/trend/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('timeframe')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "carbonTrend", null);
__decorate([
    (0, common_1.Get)('analytics/top-activities/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "topActivities", null);
__decorate([
    (0, common_1.Get)('analytics/personal-bests/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "personalBests", null);
__decorate([
    (0, common_1.Get)('analytics/comparison/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "comparison", null);
__decorate([
    (0, common_1.Post)(':userId/history'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "addCarbonHistory", null);
__decorate([
    (0, common_1.Get)(':userId/history'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getUserHistory", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    __param(0, (0, common_1.Query)('timeframe')),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Get)(':userId/achievements'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAchievements", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map