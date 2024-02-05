import { Body, Controller, Get, Patch, Post, Put, Query, Req, Res, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto, loginDto, ResultDto, userInfoDto, editUserInfo } from './dto/user.dto';
import { Response, Request } from 'express';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}
    
    @Post('/register')
        async userRegister(@Body(ValidationPipe) data: userDto, @Res() res: Response):Promise<void>{
            try{
                const result = await this.userService.signUp(data);

                res.status(201).send(result)
            }catch(err){
                res.status(500).send(`during register error: ${err}`);
            } 
        }
    @Post('/login')
        async login(@Body() data: loginDto, @Res() res:Response): Promise<void>{
            try{
                const result =  await this.userService.login(data)

                console.log(result)

                const token = result.token

                res.cookie('userKey', token, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })

                res.send({result: result.result, msg: result.msg})
            }catch(err){
                res.status(500).send(`during login error: ${err}`);
            } 
        }
    @Get('/logout')
        async logOut(@Req() req:Request, @Res() res:Response): Promise<void> {
            try{
                const logintoken = req.cookies.userKey;

                if(logintoken){
                    const result = await this.userService.logout(logintoken)

                    if(result){
                        res.clearCookie('userKey')
                        
                        res.send({result: true})
                    }else{
                        res.send({result: false, msg: 'redis 내 키가 존재하지 않음'})
                    }
                }else{
                    res.send({result: false, msg: '로그인 상태가 아닙니다'})
                }
            }catch(err){
                console.error(err)
            }
        }

    @Get('/authuser')
    async authuser(@Req() req:Request, @Res() res:Response): Promise<void> {
        try{
            const logintoken = req.cookies.userKey;

            if(logintoken){
                const result = await this.userService.authUser(logintoken)

                res.send({result: true, msg: result})
            }else{
                res.send({result: false, msg: '로그인 상태가 아닙니다'})
            }
        }catch(err){
            console.error(err)
        }
    }

    @Get('/user_info')
    async getUserInfo(@Req() req:Request, @Res() res:Response): Promise<void> {
        try{
            const logintoken = req.cookies.userKey;

            if(logintoken){
                const result = await this.userService.getUserInfo(logintoken)

                res.send({result: true, email: result.email, nickname: result.nickname, profile_img: result.profile_img})
            } else{
                res.send({result: false, msg: '로그인 상태가 아닙니다'})
            }
        }catch(err){
            console.error(err)
        }
    }

    @Patch('/user_info')
    async editUserInfo(@Body() data: editUserInfo, @Req() req:Request, @Res() res:Response): Promise<void>{
        try{
            const logintoken = req.cookies.userKey;

            if(logintoken){
                const result = await this.userService.updateUserInfo(logintoken, data)

                res.clearCookie('userKey')

                res.send(result)
            } else{
                res.send({result: false, msg: '로그인 상태가 아닙니다'})
            }
        }catch(err){
            console.error(err)
        } 
    }

    
}
