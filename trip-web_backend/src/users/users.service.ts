import { Injectable, Post, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { hashPW, comparePW } from 'src/utils/crypto';
import { userDto, loginDto, loginResultDto, jwtPayloadDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { randomKey } from 'src/utils/makeKey';

@Injectable()
export class UsersService {
    constructor(
        // typeorm 엔티티를 통한 repository 선언
        @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
        private jwtService: JwtService
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

    async login(data: loginDto): Promise<loginResultDto>{
        const {email, pw} = data;

        const emailValid = await this.usersDB.findOne({where: {email: email}});

        if(emailValid){
            const validPW: boolean = comparePW(pw, emailValid.password)
            if(validPW){
                const connectKey = randomKey();

                const payload: jwtPayloadDto = { 'loginkey' : connectKey };

                const token = this.jwtService.sign(payload);

                return {result: true, msg: '로그인 성공', token: token}
            } else{
                return {result: false, msg: '비밀번호가 일치하지 않습니다'};
            }
            
        } else{
            // return {result: false, msg: "아이디가 존재하지 않습니다."};
            throw new UnauthorizedException('login failed');
        }

    }
}
