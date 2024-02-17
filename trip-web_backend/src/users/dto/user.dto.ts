import { Matches } from 'class-validator';

export class userDto {
  user_id: string;
  email: string;
  nickname: string;
  @Matches(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
    message: '영어, 특수문자, 숫자만 입력이 가능합니다.',
  })
  password: string;
  created_at: Date;
  deleted_at: Date | null;
  profile_img?: string;
}

export class loginDto {
  userId: string;
  pw: string;
}

export class ResultDto {
  result: boolean;
  msg: string;
  token?: string;
}

export class authUserDto {
  result: boolean;
  nickname?: string;
}

export class loginKeyDto {
  connectKey: string;
  userInfo: string;
}
export interface jwtPayloadDto {
  [key: string]: string;
}

export interface userInfoDto {
  user_id: string;
  email: string;
  nickname: string;
  profile_img?: string;
}

export interface editUserInfo {
  userId: string;
  email: string;
  nickname: string;
  original_password: string;
  new_password?: string;
}
