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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenPrintSchema = exports.GreenPrint = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let GreenPrint = class GreenPrint {
};
exports.GreenPrint = GreenPrint;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, unique: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GreenPrint.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, sparse: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], GreenPrint.prototype, "handle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], GreenPrint.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], GreenPrint.prototype, "highlights", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], GreenPrint.prototype, "totalCO2Saved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], GreenPrint.prototype, "challengesCompleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], GreenPrint.prototype, "badges", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], GreenPrint.prototype, "streakDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], GreenPrint.prototype, "lastStreakDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], GreenPrint.prototype, "isPublic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'leaf' }),
    __metadata("design:type", String)
], GreenPrint.prototype, "theme", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 180, trim: true }),
    __metadata("design:type", String)
], GreenPrint.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], GreenPrint.prototype, "avatarUrl", void 0);
exports.GreenPrint = GreenPrint = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], GreenPrint);
exports.GreenPrintSchema = mongoose_1.SchemaFactory.createForClass(GreenPrint);
exports.GreenPrintSchema.index({ handle: 1, isPublic: 1 });
//# sourceMappingURL=greenprint.schema.js.map