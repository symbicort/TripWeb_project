import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { User } from './users.model';
import { hashPW, comparePW } from 'src/utils/crypto';
import { userDto, loginDto, loginResultDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        // typeorm 엔티티를 통한 repository 선언
        @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>,
        private jwtService: JwtService
    ){}

    async signUp(registerInfo: User):Promise<string>{
        const {user_id, email, nickname, created_at, profile_img} = registerInfo 

        const password = hashPW(registerInfo.password)

        const register = await this.usersDB.save({
            user_id,
            password,
            email,
            nickname,
            created_at,
            profile_img,
        });
            return register.user_id;
    }   

    async checkIDExist(userId: string): Promise<boolean>{
        const result = await this.usersDB.findOne({where: {user_id: userId}});

        if(result){
            return true;
        } else{
            return false;
        }
    }

    async login(data: loginDto): Promise<loginResultDto>{
        const {id, pw} = data;

        const idValid = await this.usersDB.findOne({where: {user_id: id}});

        if(idValid){
            const validPW: boolean = comparePW(pw, idValid.password)
            if(validPW){
                console.log(idValid.nickname);

                const userId = idValid.user_id

                const payload: object = { userId};
                const accessToken = this.jwtService.sign(payload);

                return {result: true, msg: accessToken}
            } else{
                return {result: false, msg: '비밀번호가 일치하지 않습니다'};
            }
            
        } else{
            // return {result: false, msg: "아이디가 존재하지 않습니다."};
            throw new UnauthorizedException('login failed');
        }

    }
}
