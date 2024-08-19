"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConfig = void 0;
const users_entity_1 = require("../users/entities/users-entity");
const board_entity_1 = require("../boards/entities/board-entity");
const comment_entity_1 = require("../boards/entities/comment-entity");
exports.mysqlConfig = {
    type: 'mysql',
    host: process.env.RDS_MYSQL_HOST,
    port: Number(process.env.RDS_MYSQL_PORT),
    username: process.env.RDS_MYSQL_USERNAME,
    password: process.env.RDS_MYSQL_PW,
    database: process.env.RDS_MYSQL_NAME,
    entities: [users_entity_1.UsersEntity, board_entity_1.BoardsEntity, comment_entity_1.CommentEntity],
    synchronize: true,
};
//# sourceMappingURL=mysql.config.js.map