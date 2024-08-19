import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { userDto, loginDto, ResultDto, userInfoDto, editUserInfo, authUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisClient } from './redis.provider';
import { TokenService } from './token.service';
import { AwsService } from 'src/aws/aws.service';
export declare class UsersService {
    private readonly redis;
    private usersDB;
    private readonly jwtService;
    private readonly tokenService;
    private readonly awsService;
    constructor(redis: RedisClient, usersDB: Repository<UsersEntity>, jwtService: JwtService, tokenService: TokenService, awsService: AwsService);
    signUp(registerInfo: userDto): Promise<any>;
    checkDupId(inputId: string): Promise<boolean>;
    checkDupNickname(inputNickname: string): Promise<boolean>;
    login(data: loginDto): Promise<ResultDto>;
    logout(logintoken: string): Promise<boolean>;
    authUser(logintoken: string): Promise<authUserDto>;
    getUserInfo(logintoken: string): Promise<userInfoDto>;
    updateUserInfo(loginToken: string, data: editUserInfo): Promise<ResultDto>;
    withDraw(logintoken: string): Promise<ResultDto>;
    uploadImg(logintoken: string, imageUrl: string): Promise<void>;
}
