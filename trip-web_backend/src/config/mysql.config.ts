import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersEntity } from "src/users/entities/users-entity";
import { BoardsEntity } from "src/boards/entities/board-entity";
import { CommentEntity } from "src/boards/entities/comment-entity";

export const mysqlConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.RDS_MYSQL_HOST,
    port: Number(process.env.RDS_MYSQL_PORT),
    username: process.env.RDS_MYSQL_USERNAME,
    password: process.env.RDS_MYSQL_PW,
    database: process.env.RDS_MYSQL_NAME,
    entities: [UsersEntity, BoardsEntity, CommentEntity],
    synchronize: true
}