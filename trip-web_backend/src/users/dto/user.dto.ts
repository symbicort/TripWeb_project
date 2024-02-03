import { Matches } from "class-validator";

export class userDto{
    email: string;
    nickname: string;
    @Matches(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
        message: '영어, 특수문자, 숫자만 입력이 가능합니다.'})
    password: string;
    created_at: Date;
    profile_img: undefined | string;
}

export class loginDto{
    email: string;
    pw: string;
}

export class loginResultDto{
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
