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
  accessToken: string;
  refreshToken: string;
  returnNickname: string;
}

export class userInfoDto {
  kakaoID: number;
  nickname: string;
  isDefault: boolean;
  created_at: Date;
  profile_img: string;

  constructor(userInfo: {
    kakaoID: number;
    nickname: string;
    isDefault: boolean;
    created_at: Date;
    profile_img: string;
  }) {
    this.kakaoID = userInfo.kakaoID;
    this.nickname = userInfo.nickname;
    this.isDefault = userInfo.isDefault;
    this.created_at = userInfo.created_at;
    this.profile_img = userInfo.profile_img;
  }
}

export class cookieInfoDto {
  nickname: string;
  iat: number;
}
