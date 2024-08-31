import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CookieGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const cookieName = 'userinfo';
    const cookieValue = request.cookies[cookieName];

    console.log(cookieValue);

    if (!cookieValue) {
      throw new UnauthorizedException('Not login');
    }

    return true;
  }
}
