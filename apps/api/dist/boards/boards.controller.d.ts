import { BoardsService } from './boards.service';
import { ConfigService } from '@nestjs/config';
import { BoardDto } from './dto/board.dto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { authUserDto } from 'src/users/dto/user.dto';
import { AwsService } from 'src/aws/aws.service';
export declare class BoardsController {
    private boardService;
    private readonly configService;
    private readonly usersService;
    private readonly awsService;
    constructor(boardService: BoardsService, configService: ConfigService, usersService: UsersService, awsService: AwsService);
    createBoard(files: Array<Express.Multer.File>, post: BoardDto, req: Request, res: Response): Promise<void>;
    getPost(id: number): Promise<boolean | BoardDto>;
    checkUser(req: Request): Promise<authUserDto>;
}
