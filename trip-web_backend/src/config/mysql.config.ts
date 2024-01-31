import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersEntity } from "src/users/entities/users-entity";

export const mysqlConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.RDS_MYSQL_HOST,
    port: Number(process.env.RDS_MYSQL_PORT),
    username: process.env.RDS_MYSQL_USERNAME,
    password: process.env.RDS_MYSQL_PW,
    database: process.env.tripWeb,
    entities: [UsersEntity],
    synchronize: true


}