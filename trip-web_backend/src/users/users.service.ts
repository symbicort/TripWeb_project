import { Injectable, Post, Res, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { hashPW, comparePW } from 'src/utils/crypto';
import { userDto, loginDto, ResultDto, jwtPayloadDto, userInfoDto, editUserInfo } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { randomKey } from 'src/utils/makeKey';
import { RedisClient } from './redis.provider';
import { TokenService } from './token.service';

@Injectable()
export class UsersService {
    constructor(@Inject('REDIS_CLIENT')
    private readonly redis: RedisClient,
        @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
        private readonly jwtService: JwtService, private readonly tokenService: TokenService
    ){}

    async signUp(registerInfo: userDto):Promise<any>{
        const {email, nickname, created_at, profile_img} = registerInfo 

        const password = hashPW(registerInfo.password)

        try{
            const register = await this.usersDB.insert({
                email,
                nickname,
                password,
                created_at,
                profile_img,
            });

            return {result: true, nickname: nickname}
        }catch(err){
            if(err instanceof QueryFailedError){
                const dupcol = err.message.split("'")
                return {result: false, dupcol: dupcol[1]}
            }
            throw new err;
        }
    }   

    async login(data: loginDto): Promise<ResultDto>{
        try{
            const {email, pw} = data;

            const emailValid = await this.usersDB.findOne({where: {email: email}});

            if(emailValid){
                const validPW: boolean = comparePW(pw, emailValid.password)
                if(validPW){
                    const connectKey = randomKey();

                    const payload: jwtPayloadDto = { 'loginkey' : connectKey };

                    const loginToken = this.jwtService.sign(payload);

                    await this.redis.set(connectKey, emailValid.email, 'EX',604800)

                    return {result: true, msg: '로그인 성공', token: loginToken}
                } else{
                    return {result: false, msg: '비밀번호가 일치하지 않습니다'};
                }
            } else{
                return {result: false, msg: "가입된 이메일이 존재하지 않습니다."};
                // throw new UnauthorizedException('login failed');
        }}catch(err){
            console.error(err)
        }}

    async logout(logintoken: string): Promise<boolean>{
        try{
            const loginKey = this.jwtService.verify(logintoken).loginkey

            const logoutRes = await this.redis.del(loginKey)

            if(logoutRes){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.error(`during logout err.... ${err}`)
        }
    } 

    async authUser(logintoken: string): Promise<string>{
        try{
            const loginEmail = await this.tokenService.getEmailFromToken(logintoken);

            const emailValid = await this.usersDB.findOne({where: {email: loginEmail}});

            return emailValid.nickname
        }catch(err){
            console.error(`during logout err.... ${err}`)
        }
    } 

    async getUserInfo(logintoken: string): Promise<userInfoDto>{
        try{
            const loginEmail = await this.tokenService.getEmailFromToken(logintoken);

            const emailValid = await this.usersDB.findOne({where: {email: loginEmail}});

            return emailValid
        }catch(err){
            console.error(`during get user info err.... ${err}`)
        }
    } 

    async updateUserInfo(logintoken: string, data: editUserInfo): Promise<ResultDto>{
        const {email, nickname, original_password} = data;

        try{
            const emailValid = await this.usersDB.findOne({where: {email: email}});

            if(emailValid){
                const validPW: boolean = comparePW(original_password, emailValid.password)

                if(validPW){
                    const nicknameValid = await this.usersDB.findOne({where: {nickname: nickname}})

                    console.log('nicknamevalid', nicknameValid)

                    if(!nicknameValid){
                        if(data.new_password){
                            const password = hashPW(data.new_password);

                            const userUpdate = await this.usersDB.update({email: email}, {nickname: nickname, password: password}, )

                            console.log('new passwr',userUpdate)
                        } else{
                            const userUpdate = await this.usersDB.update({email: email}, {nickname: nickname, password: emailValid.password})

                            console.log('origin passwd', userUpdate)
                        }
                        const loginKey = this.jwtService.verify(logintoken).loginkey

                        const logoutRes = await this.redis.del(loginKey)

                        return {result: true, msg: '정보가 성공적으로 변경되었습니다.'}

                    } else{
                        return {result: false, msg: '중복된 닉네임으로 변경이 불가능합니다.'};
                    }
                } else{
                    return {result: false, msg: '비밀번호가 일치하지 않습니다'};
                }
            } else{
                return {result: false, msg: "이메일이 존재하지 않습니다."};
                // throw new UnauthorizedException('login failed');
        }
        } catch(err){
            console.error(err);
        }
    }

    async withDraw(logintoken: string): Promise<ResultDto>{
        try{
            const loginKey = this.jwtService.verify(logintoken).loginkey

            const userEmail = await this.redis.get(loginKey)

            const result = await this.usersDB.delete({email: userEmail})

            if(result.affected){
                const delKeyRedis = await this.redis.del(loginKey)

                return {result: true, msg: '회원탈퇴가 완료되었습니다.'}
            }

        }catch(err){
            console.error(`during withdraw err.... ${err}`)
        }
    } 
}
