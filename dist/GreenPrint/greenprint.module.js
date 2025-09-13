"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenPrintModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const greenprint_schema_1 = require("./greenprint.schema");
const greenprint_service_1 = require("./greenprint.service");
const greenprint_controller_1 = require("./greenprint.controller");
let GreenPrintModule = class GreenPrintModule {
};
exports.GreenPrintModule = GreenPrintModule;
exports.GreenPrintModule = GreenPrintModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: greenprint_schema_1.GreenPrint.name, schema: greenprint_schema_1.GreenPrintSchema },
            ]),
        ],
        controllers: [greenprint_controller_1.GreenPrintController],
        providers: [greenprint_service_1.GreenPrintService],
        exports: [greenprint_service_1.GreenPrintService],
    })
], GreenPrintModule);
//# sourceMappingURL=greenprint.module.js.map