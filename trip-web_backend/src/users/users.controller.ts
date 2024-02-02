import { Body, Controller, Get, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto, loginDto, loginResultDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post('/check')
        async checkIDExist(@Body('id') id: string):Promise<boolean>{
            return await this.userService.checkIDExist(id)
        }
    ㄴ
    @Post('/register')
        async userRegister(@Body(ValidationPipe) data: userDto):Promise<string>{
            return await this.userService.signUp(data);
        }
    @Post('/login')
        async login(@Body() data: loginDto): Promise<loginResultDto>{
            return await this.userService.login(data)
        }

}
