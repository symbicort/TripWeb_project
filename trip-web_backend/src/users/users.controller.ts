import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/check')
        async checkIDExist(@Body('id') id: string):Promise<boolean>{
            return await this.userService.checkIDExist(id)
        }
    
    @Post('/register')
        async userRegister(@Body() data: userDto):Promise<string>{
            return await this.userService.signUp(data);
        }

}
