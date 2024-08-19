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
exports.BoardsEntity = void 0;
const typeorm_1 = require("typeorm");
let BoardsEntity = class BoardsEntity extends typeorm_1.BaseEntity {
};
exports.BoardsEntity = BoardsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], BoardsEntity.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 30 }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 2000 }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BoardsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BoardsEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], BoardsEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BoardsEntity.prototype, "post_img", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BoardsEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BoardsEntity.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], BoardsEntity.prototype, "comment", void 0);
exports.BoardsEntity = BoardsEntity = __decorate([
    (0, typeorm_1.Entity)('boards')
], BoardsEntity);
//# sourceMappingURL=board-entity.js.map