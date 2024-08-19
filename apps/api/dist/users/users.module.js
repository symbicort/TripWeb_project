"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./entities/users-entity");
const jwt_1 = require("@nestjs/jwt");
const redis_provider_1 = require("./redis.provider");
const token_service_1 = require("./token.service");
const aws_module_1 = require("../aws/aws.module");
const board_entity_1 = require("../boards/entities/board-entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: String(process.env.JWT_SECRET_KEY),
            }),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.UsersEntity, board_entity_1.BoardsEntity]),
            aws_module_1.AwsModule,
        ],
        providers: [users_service_1.UsersService, redis_provider_1.redisProvider, token_service_1.TokenService],
        controllers: [users_controller_1.UsersController],
    })
], UserModule);
console.log('secret key check', process.env.JWT_SECRET_KEY);
//# sourceMappingURL=users.module.js.map