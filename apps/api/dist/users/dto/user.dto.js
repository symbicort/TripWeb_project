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
exports.loginKeyDto = exports.authUserDto = exports.ResultDto = exports.loginDto = exports.userDto = void 0;
const class_validator_1 = require("class-validator");
class userDto {
}
exports.userDto = userDto;
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
        message: '영어, 특수문자, 숫자만 입력이 가능합니다.',
    }),
    __metadata("design:type", String)
], userDto.prototype, "password", void 0);
class loginDto {
}
exports.loginDto = loginDto;
class ResultDto {
}
exports.ResultDto = ResultDto;
class authUserDto {
}
exports.authUserDto = authUserDto;
class loginKeyDto {
}
exports.loginKeyDto = loginKeyDto;
//# sourceMappingURL=user.dto.js.map