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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_schema_1 = require("../Groups/schemas/group.schema");
const profile_schema_1 = require("../Profile/profile.schema");
let GroupService = class GroupService {
    getGroupLeaderboard() {
        throw new Error('Method not implemented.');
    }
    constructor(groupModel, profileModel) {
        this.groupModel = groupModel;
        this.profileModel = profileModel;
    }
    async createGroup(name, description, createdBy, type) {
        return this.groupModel.create({ name, description, createdBy, type });
    }
    async addMember(groupId, userId) {
        return this.groupModel.findByIdAndUpdate(groupId, { $addToSet: { members: userId } }, { new: true });
    }
    async joinGroup(groupId, userId) {
        const group = await this.groupModel.findById(groupId);
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        if (!group.members.includes(new mongoose_2.Types.ObjectId(userId))) {
            group.members.push(new mongoose_2.Types.ObjectId(userId));
        }
        await group.save();
        return group;
    }
    async calculateGroupCO2(groupId) {
        const group = await this.groupModel.findById(groupId).populate('members');
        if (!group)
            throw new common_1.NotFoundException('Group not found');
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
    async updateGroupCO2(userId, deltaCO2) {
        await this.groupModel.updateMany({ members: userId }, { $inc: { totalCO2Saved: deltaCO2 } });
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __param(1, (0, mongoose_1.InjectModel)(profile_schema_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], GroupService);
//# sourceMappingURL=group.service.js.map