import { Body, Controller, Get, Post, Put, Query, Req, Res, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto, loginDto, loginResultDto } from './dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}
    
    @Post('/register')
        async userRegister(@Body(ValidationPipe) data: userDto, @Res() res: Response):Promise<void>{
            const result = await this.userService.signUp(data);

            res.send(result)
        }
    @Post('/login')
        async login(@Body() data: loginDto, @Res() res:Response): Promise<void>{
            const result =  await this.userService.login(data)

            const token = result.token

            res.cookie('connectKey', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.send({result: result.result, msg: result.msg})
        }

}
