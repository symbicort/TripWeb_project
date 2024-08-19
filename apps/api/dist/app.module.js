"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const boards_module_1 = require("./boards/boards.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("./boards/entities/board-entity");
const users_entity_1 = require("./users/entities/users-entity");
const comment_entity_1 = require("./boards/entities/comment-entity");
const auth_module_1 = require("./auth/auth.module");
const aws_module_1 = require("./aws/aws.module");
const color_chat_module_1 = require("./color-chat/color-chat.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.RDS_MYSQL_HOST,
                port: Number(process.env.RDS_MYSQL_PORT),
                username: process.env.RDS_MYSQL_USERNAME,
                password: process.env.RDS_MYSQL_PW,
                database: process.env.RDS_MYSQL_NAME,
                entities: [users_entity_1.UsersEntity, board_entity_1.BoardsEntity, comment_entity_1.CommentEntity],
                synchronize: true,
            }),
            users_module_1.UserModule,
            boards_module_1.BoardsModule,
            auth_module_1.AuthModule,
            aws_module_1.AwsModule,
            color_chat_module_1.ColorChatModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../..', 'client', 'dist'),
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
console.log(__dirname);
//# sourceMappingURL=app.module.js.map