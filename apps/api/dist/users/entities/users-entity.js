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
exports.UsersEntity = void 0;
const board_entity_1 = require("../../boards/entities/board-entity");
const typeorm_1 = require("typeorm");
let UsersEntity = class UsersEntity extends typeorm_1.BaseEntity {
};
exports.UsersEntity = UsersEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'nvarchar', length: 30 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 30 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 20 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 100 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "profile_img", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_entity_1.BoardsEntity, (board) => board.author),
    __metadata("design:type", Array)
], UsersEntity.prototype, "boards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "like_postId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "follow", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "comment_postId", void 0);
exports.UsersEntity = UsersEntity = __decorate([
    (0, typeorm_1.Entity)('Users'),
    (0, typeorm_1.Unique)(['user_id']),
    (0, typeorm_1.Unique)(['nickname'])
], UsersEntity);
//# sourceMappingURL=users-entity.js.map