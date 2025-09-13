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
exports.EcoAdviceController = void 0;
const common_1 = require("@nestjs/common");
const eco_advice_service_1 = require("./eco-advice.service");
let EcoAdviceController = class EcoAdviceController {
    constructor(ecoAdviceService) {
        this.ecoAdviceService = ecoAdviceService;
    }
    async getEcoAdvice(question) {
        const answer = await this.ecoAdviceService.getAdvice(question);
        return { question, answer };
    }
};
exports.EcoAdviceController = EcoAdviceController;
__decorate([
    (0, common_1.Post)('advice'),
    __param(0, (0, common_1.Body)('question')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EcoAdviceController.prototype, "getEcoAdvice", null);
exports.EcoAdviceController = EcoAdviceController = __decorate([
    (0, common_1.Controller)('eco'),
    __metadata("design:paramtypes", [eco_advice_service_1.EcoAdviceService])
], EcoAdviceController);
//# sourceMappingURL=eco-advice.controller.js.map