import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.cookies['userinfo'];

    if (!token) {
      throw new UnauthorizedException('Not login');
    }

    const nickname = this.jwtService.verify(token);
    request.user = nickname;

    return true;
  }
}
