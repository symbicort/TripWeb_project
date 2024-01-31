import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get('/check')
        checkIDExist(@Query('id') id: string):any{
            return this.userService.checkIDExist(id)
        }
    
}
