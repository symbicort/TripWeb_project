"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsModule = void 0;
const common_1 = require("@nestjs/common");
const boards_controller_1 = require("./boards.controller");
const boards_service_1 = require("./boards.service");
const users_service_1 = require("../users/users.service");
const redis_provider_1 = require("../users/redis.provider");
const typeorm_1 = require("@nestjs/typeorm");
const aws_module_1 = require("../aws/aws.module");
const board_entity_1 = require("./entities/board-entity");
const users_entity_1 = require("../users/entities/users-entity");
const token_service_1 = require("../users/token.service");
const jwt_1 = require("@nestjs/jwt");
let BoardsModule = class BoardsModule {
};
exports.BoardsModule = BoardsModule;
exports.BoardsModule = BoardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [boards_controller_1.BoardsController],
        providers: [boards_service_1.BoardsService, users_service_1.UsersService, redis_provider_1.redisProvider, token_service_1.TokenService],
        imports: [
            jwt_1.JwtModule.register({
                secret: String(process.env.JWT_SECRET_KEY),
            }),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.UsersEntity, board_entity_1.BoardsEntity]),
            aws_module_1.AwsModule,
        ],
    })
], BoardsModule);
//# sourceMappingURL=boards.module.js.map