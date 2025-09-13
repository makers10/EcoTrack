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
exports.ChallengeSchema = exports.Challenge = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Challenge = class Challenge extends mongoose_2.Document {
};
exports.Challenge = Challenge;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Challenge.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Challenge.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['daily', 'weekly', 'monthly'] }),
    __metadata("design:type", String)
], Challenge.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Challenge.prototype, "target", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'User' }], default: [] }),
    __metadata("design:type", Array)
], Challenge.prototype, "participants", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                userId: { type: mongoose_2.Types.ObjectId, ref: 'User' },
                progress: { type: Number, default: 0 },
                completed: { type: Boolean, default: false },
                streak: { type: Number, default: 0 },
                lastUpdated: { type: Date, default: null },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Challenge.prototype, "userProgress", void 0);
exports.Challenge = Challenge = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Challenge);
exports.ChallengeSchema = mongoose_1.SchemaFactory.createForClass(Challenge);
//# sourceMappingURL=challenges.schema.js.map