import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users-entity';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        // typeorm 엔티티를 통한 repository 선언
        @InjectRepository(UsersEntity) private usersDB: Repository<UsersEntity>
    ){}

    // async signUp(registerInfo: User){

    // }

    async checkIDExist(userId: string): Promise<boolean>{
        const result = await this.usersDB.findOne({where: {user_id: userId}});

        if(result){
            return true;
        } else{
            return false;
        }
    }
}
