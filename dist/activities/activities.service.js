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
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activities_schema_1 = require("./schemas/activities.schema");
const users_service_1 = require("../users/users.service");
const carbon_service_1 = require("../carbon/carbon.service");
let ActivitiesService = class ActivitiesService {
    constructor(activityModel, usersService, carbonService) {
        this.activityModel = activityModel;
        this.usersService = usersService;
        this.carbonService = carbonService;
    }
    async create(createActivityDto) {
        const carbonReduction = this.carbonService.calculateReduction(createActivityDto.type, createActivityDto.value);
        const activityData = {
            ...createActivityDto,
            carbonReduction,
        };
        const activity = new this.activityModel(activityData);
        const savedActivity = await activity.save();
        await this.usersService.addCarbonReduction(createActivityDto.userId, carbonReduction);
        return savedActivity;
    }
    async findByUser(userId) {
        return this.activityModel.find({ userId }).sort({ date: -1 }).exec();
    }
    async findOne(id) {
        return this.activityModel.findById(id).exec();
    }
    async update(id, updateActivityDto) {
        return this.activityModel
            .findByIdAndUpdate(id, updateActivityDto, { new: true })
            .exec();
    }
    async remove(id) {
        return this.activityModel.findByIdAndDelete(id).exec();
    }
    async getUserStats(userId) {
        const activities = await this.activityModel.find({ userId }).exec();
        const totalReduction = activities.reduce((sum, activity) => sum + activity.carbonReduction, 0);
        return {
            totalReduction,
            activityCount: activities.length
        };
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(activities_schema_1.Activity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        carbon_service_1.CarbonService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map