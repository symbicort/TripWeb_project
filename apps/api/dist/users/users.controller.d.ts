import { UsersService } from './users.service';
import { userDto, loginDto, editUserInfo } from './dto/user.dto';
import { Response, Request } from 'express';
import { AwsService } from 'src/aws/aws.service';
export declare class UsersController {
    private userService;
    private readonly awsService;
    constructor(userService: UsersService, awsService: AwsService);
    userRegister(data: userDto, res: Response): Promise<void>;
    checkDupId(req: Request): Promise<boolean>;
    checkDupNick(req: Request): Promise<boolean>;
    login(data: loginDto, res: Response): Promise<void>;
    logOut(req: Request, res: Response): Promise<void>;
    authuser(req: Request, res: Response): Promise<void>;
    getUserInfo(req: Request, res: Response): Promise<void>;
    editUserInfo(data: editUserInfo, req: Request, res: Response): Promise<void>;
    withDraw(req: Request, res: Response): Promise<void>;
    uploadImage(file: Express.Multer.File, req: Request, res: Response): Promise<void>;
}
