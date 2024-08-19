import { JwtService } from '@nestjs/jwt';
import { RedisClient } from './redis.provider';
export declare class TokenService {
    private readonly jwtService;
    private readonly redis;
    constructor(jwtService: JwtService, redis: RedisClient);
    getUserIdFromToken(token: string): Promise<string>;
}
