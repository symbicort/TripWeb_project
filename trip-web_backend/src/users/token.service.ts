// token.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisClient } from './redis.provider';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClient,
  ) {}

  // 토큰 서비스
  async getUserIdFromToken(token: string): Promise<string> {
    const loginKey = this.jwtService.verify(token).loginkey;
    const userId = await this.redis.get(loginKey);
    console.log(userId);
    return userId;
  }
}
