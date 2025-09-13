"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonService = void 0;
const common_1 = require("@nestjs/common");
let CarbonService = class CarbonService {
    calculateReduction(activityType, value) {
        const conversionFactors = {
            recycling_plastic: 1.5,
            recycling_paper: 0.8,
            recycling_glass: 0.3,
            biking: 0.25,
            walking: 0.25,
            public_transport: 0.1,
            energy_saving: 0.5,
            water_saving: 0.0003,
            sustainable_shopping: 2
        };
        return value * (conversionFactors[activityType] || 0);
    }
    getActivityTypes() {
        return [
            { id: 'recycling_plastic', name: 'Plastic Recycling', unit: 'kg' },
            { id: 'recycling_paper', name: 'Paper Recycling', unit: 'kg' },
            { id: 'recycling_glass', name: 'Glass Recycling', unit: 'kg' },
            { id: 'biking', name: 'Biking', unit: 'km' },
            { id: 'walking', name: 'Walking', unit: 'km' },
            { id: 'public_transport', name: 'Public Transport', unit: 'km' },
            { id: 'energy_saving', name: 'Energy Saving', unit: 'kWh' },
            { id: 'water_saving', name: 'Water Saving', unit: 'liters' },
            { id: 'sustainable_shopping', name: 'Sustainable Shopping', unit: 'items' },
        ];
    }
};
exports.CarbonService = CarbonService;
exports.CarbonService = CarbonService = __decorate([
    (0, common_1.Injectable)()
], CarbonService);
//# sourceMappingURL=carbon.service.js.map