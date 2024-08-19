export declare class userDto {
    user_id: string;
    email: string;
    nickname: string;
    password: string;
    created_at: Date;
    deleted_at: Date | null;
    profile_img?: string;
}
export declare class loginDto {
    userId: string;
    pw: string;
}
export declare class ResultDto {
    result: boolean;
    msg: string;
    token?: string;
}
export declare class authUserDto {
    result: boolean;
    nickname?: string;
}
export declare class loginKeyDto {
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
