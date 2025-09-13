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
exports.GreenPrintService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const greenprint_schema_1 = require("../GreenPrint/greenprint.schema");
let GreenPrintService = class GreenPrintService {
    constructor(greenPrintModel) {
        this.greenPrintModel = greenPrintModel;
    }
    async create(data) {
        const newDoc = new this.greenPrintModel(data);
        return newDoc.save();
    }
    async findAll() {
        return this.greenPrintModel.find().exec();
    }
    async findOne(id) {
        return this.greenPrintModel.findById(id).exec();
    }
    async update(id, data) {
        return this.greenPrintModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async remove(id) {
        return this.greenPrintModel.findByIdAndDelete(id).exec();
    }
    async syncUserGreenPrint(userId, entry) {
        let greenPrint = await this.greenPrintModel.findOne({ userId });
        if (!greenPrint) {
            greenPrint = new this.greenPrintModel({
                userId,
                totalCO2Saved: 0,
                highlights: [],
            });
        }
        greenPrint.totalCO2Saved += entry.amount;
        greenPrint.highlights.push(JSON.stringify({
            title: `Saved ${entry.amount}kg CO₂ by ${entry.activity}`,
            date: new Date(),
        }));
        await greenPrint.save();
        return greenPrint;
    }
    async ensureForUser(userId) {
        const id = typeof userId === 'string' ? new mongoose_2.Types.ObjectId(userId) : userId;
        let gp = await this.greenPrintModel.findOne({ userId: id });
        if (!gp) {
            gp = await this.greenPrintModel.create({ userId: id });
        }
        return gp;
    }
    async getPublicGreenPrint(idOrHandle, useHandle = false) {
        const query = useHandle
            ? { handle: idOrHandle, isPublic: true }
            : { userId: idOrHandle, isPublic: true };
        const gp = await this.greenPrintModel.findOne(query).lean();
        if (!gp)
            throw new common_1.NotFoundException('GreenPrint not found or private');
        return {
            userId: gp.userId,
            handle: gp.handle,
            totalCO2Saved: gp.totalCO2Saved,
            challengesCompleted: gp.challengesCompleted,
            badges: gp.badges,
            streakDays: gp.streakDays,
            theme: gp.theme,
            bio: gp.bio,
            avatarUrl: gp.avatarUrl,
            updatedAt: gp.updatedAt,
        };
    }
    async getShareableCard(idOrHandle, useHandle = false) {
        const gp = await this.getPublicGreenPrint(idOrHandle, useHandle);
        return {
            title: `${gp.handle ?? 'GreenPrint'} 🌱`,
            subtitle: `Total CO₂ Saved: ${gp.totalCO2Saved} kg`,
            badges: gp.badges.slice(0, 6),
            meta: {
                streakDays: gp.streakDays,
                challengesCompleted: gp.challengesCompleted,
            },
            theme: gp.theme,
        };
    }
    async addSavedCarbon(userId, savedKg) {
        const gp = await this.ensureForUser(userId);
        gp.totalCO2Saved = (gp.totalCO2Saved || 0) + (savedKg || 0);
        await gp.save();
        return gp;
    }
    async addBadge(userId, badge) {
        const gp = await this.ensureForUser(userId);
        if (!gp.badges.includes(badge)) {
            gp.badges.push(badge);
            await gp.save();
        }
        return gp;
    }
    async bumpStreak(userId, date = new Date()) {
        const gp = await this.ensureForUser(userId);
        const last = gp.lastStreakDate ? new Date(gp.lastStreakDate) : null;
        const today = new Date(date);
        today.setHours(0, 0, 0, 0);
        if (!last) {
            gp.streakDays = 1;
            gp.lastStreakDate = today;
        }
        else {
            const lastDay = new Date(last);
            lastDay.setHours(0, 0, 0, 0);
            const diff = (today.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24);
            if (diff === 1) {
                gp.streakDays += 1;
                gp.lastStreakDate = today;
            }
            else if (diff > 1) {
                gp.streakDays = 1;
                gp.lastStreakDate = today;
            }
        }
        await gp.save();
        return gp;
    }
    async setHandle(userId, handle) {
        await this.ensureForUser(userId);
        const existing = await this.greenPrintModel.findOne({
            handle: handle.toLowerCase().trim(),
        });
        if (existing && String(existing.userId) !== String(userId)) {
            throw new Error('Handle already taken');
        }
        return this.greenPrintModel.findOneAndUpdate({ userId }, { handle: handle.toLowerCase().trim() }, { new: true });
    }
    async setVisibility(userId, isPublic) {
        await this.ensureForUser(userId);
        return this.greenPrintModel.findOneAndUpdate({ userId }, { isPublic }, { new: true });
    }
    async setTheme(userId, theme) {
        await this.ensureForUser(userId);
        return this.greenPrintModel.findOneAndUpdate({ userId }, { theme }, { new: true });
    }
    async setBio(userId, bio) {
        await this.ensureForUser(userId);
        return this.greenPrintModel.findOneAndUpdate({ userId }, { bio }, { new: true });
    }
};
exports.GreenPrintService = GreenPrintService;
exports.GreenPrintService = GreenPrintService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(greenprint_schema_1.GreenPrint.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GreenPrintService);
//# sourceMappingURL=greenprint.service.js.map