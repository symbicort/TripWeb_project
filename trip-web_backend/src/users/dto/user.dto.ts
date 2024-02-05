import { Matches } from "class-validator";
import { boolean } from "joi";

export class userDto{
    email: string;
    nickname: string;
    @Matches(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
        message: '영어, 특수문자, 숫자만 입력이 가능합니다.'})
    password: string;
    created_at: Date;
    profile_img?: string;
}

export class loginDto{
    email: string;
    pw: string;
}

export class ResultDto{
    result: boolean;
    msg: string;
    token? :string
}

export class loginKeyDto{
    connectKey: string;
    userInfo: String;
}
export interface jwtPayloadDto{
    [key: string]: string 
};

export interface userInfoDto{
    email: string;
    nickname: string;
    profile_img?: string;
}

export interface editUserInfo{
    email: string;
    nickname: string;
    original_password: string;
    new_password?: string;
}
