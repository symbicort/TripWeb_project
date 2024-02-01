import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { User } from './users.model';
import { hashPW } from 'src/utils/crypto';
import { userDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        // typeorm 엔티티를 통한 repository 선언
        @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>
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

        console.log('회원가입 정보 리턴2', register)

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
}
