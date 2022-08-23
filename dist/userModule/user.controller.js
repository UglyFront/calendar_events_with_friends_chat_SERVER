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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const update_dto_1 = require("../dto/update.dto");
const user_servicves_1 = require("./user.servicves");
let UserController = class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }
    updateImg(body) {
        return this.userServices.updateImg(body);
    }
    updateStatus(body) {
        return this.userServices.updateStatus(body);
    }
    updateName(body) {
        return this.userServices.updateName(body);
    }
    updatePassword(body) {
        return this.userServices.updatePassword(body);
    }
    checkCode(body) {
        return this.userServices.checkCode(body);
    }
};
__decorate([
    (0, common_1.Put)("/img"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateImgDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateImg", null);
__decorate([
    (0, common_1.Put)("/status_text"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateStatusTextDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)("/name"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateNameDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateName", null);
__decorate([
    (0, common_1.Put)("/password"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdatePasswordDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)("/check_code"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.CheckCodeDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkCode", null);
UserController = __decorate([
    (0, common_1.Controller)("/user"),
    __metadata("design:paramtypes", [user_servicves_1.UserServices])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map