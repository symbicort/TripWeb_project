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

export class LoginDto {
  accessToken: string;
  refreshToken: string;
  nickname: string;
}
