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
exports.ChatRequestDto = exports.chatResultDto = exports.chatTestDto = void 0;
const class_validator_1 = require("class-validator");
const color_chat_enum_1 = require("./color-chat-enum");
class chatTestDto {
}
exports.chatTestDto = chatTestDto;
class chatResultDto {
}
exports.chatResultDto = chatResultDto;
class ChatRequestDto {
}
exports.ChatRequestDto = ChatRequestDto;
__decorate([
    (0, class_validator_1.IsEnum)(color_chat_enum_1.Color_Survey_Record_Season_Type_Enum),
    __metadata("design:type", String)
], ChatRequestDto.prototype, "season_type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ChatRequestDto.prototype, "personality_types", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(color_chat_enum_1.Color_Survey_Record_Travel_Type_Enum),
    __metadata("design:type", String)
], ChatRequestDto.prototype, "travel_type", void 0);
//# sourceMappingURL=color-chat.model.js.map