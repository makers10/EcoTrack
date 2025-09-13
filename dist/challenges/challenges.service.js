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
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const challenges_schema_1 = require("../challenges/challenges.schema");
let ChallengesService = class ChallengesService {
    constructor(challengeModel) {
        this.challengeModel = challengeModel;
    }
    async createChallenge(dto) {
        const newChallenge = new this.challengeModel(dto);
        return newChallenge.save();
    }
    async joinChallenge(challengeId, userId) {
        const challenge = await this.challengeModel.findById(challengeId);
        if (!challenge)
            throw new common_1.NotFoundException('Challenge not found');
        if (!challenge.participants.includes(new mongoose_2.Types.ObjectId(userId))) {
            challenge.participants.push(new mongoose_2.Types.ObjectId(userId));
            challenge.userProgress.push({
                userId: new mongoose_2.Types.ObjectId(userId),
                progress: 0,
                completed: false,
                streak: 0,
                lastUpdated: null,
            });
        }
        return challenge.save();
    }
    async updateProgress(challengeId, userId, amount) {
        const challenge = await this.challengeModel.findById(challengeId);
        if (!challenge)
            throw new common_1.NotFoundException('Challenge not found');
        const userEntry = challenge.userProgress.find((up) => up.userId.toString() === userId);
        if (!userEntry)
            throw new common_1.NotFoundException('User not in challenge');
        userEntry.progress += amount;
        if (userEntry.progress >= challenge.target) {
            userEntry.completed = true;
        }
        const today = new Date();
        if (userEntry.lastUpdated) {
            const lastDate = new Date(userEntry.lastUpdated);
            const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                userEntry.streak += 1;
            }
            else if (diffDays > 1) {
                userEntry.streak = 1;
            }
        }
        else {
            userEntry.streak = 1;
        }
        userEntry.lastUpdated = today;
        await challenge.save();
        return userEntry;
    }
    async getActiveChallenges() {
        return this.challengeModel.find();
    }
    async getUserChallenges(userId) {
        return this.challengeModel.find({
            'userProgress.userId': new mongoose_2.Types.ObjectId(userId),
        });
    }
};
exports.ChallengesService = ChallengesService;
exports.ChallengesService = ChallengesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(challenges_schema_1.Challenge.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChallengesService);
//# sourceMappingURL=challenges.service.js.map