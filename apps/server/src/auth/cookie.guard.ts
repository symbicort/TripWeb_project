import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.cookies['userinfo'];

    if (!token) {
      throw new UnauthorizedException('Not login');
    }

    try {
      const tokenInfo = await this.jwtService.verify(token);

      request.user = tokenInfo;

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
