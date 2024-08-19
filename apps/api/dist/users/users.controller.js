"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_dto_1 = require("./dto/user.dto");
const aws_service_1 = require("../aws/aws.service");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(userService, awsService) {
        this.userService = userService;
        this.awsService = awsService;
    }
    async userRegister(data, res) {
        try {
            const result = await this.userService.signUp(data);
            res.status(201).send(result);
        }
        catch (err) {
            res.status(500).send(`during register error: ${err}`);
        }
    }
    async checkDupId(req) {
        try {
            console.log('controller start', req.query);
            const inputId = req.query.userId;
            console.log('INPUT ID CHK', inputId);
            if (!inputId) {
                return false;
            }
            const result = await this.userService.checkDupId(inputId);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async checkDupNick(req) {
        try {
            const inputNickname = req.query.nickname;
            if (!inputNickname) {
                return false;
            }
            const result = await this.userService.checkDupNickname(inputNickname);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async login(data, res) {
        try {
            const result = await this.userService.login(data);
            console.log(result);
            const token = result.token;
            res.cookie('userKey', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.send({ result: result.result, msg: result.msg });
        }
        catch (err) {
            throw err;
        }
    }
    async logOut(req, res) {
        try {
            const logintoken = await req.cookies.userKey;
            console.log(logintoken);
            console.log(req.cookies);
            if (!logintoken) {
                console.log('로그인 토큰 if');
                res.status(401).send({ result: false, msg: '로그인 상태가 아닙니다' });
                return;
            }
            const result = await this.userService.logout(logintoken);
            if (result) {
                res.clearCookie('userKey');
                res.send({ result: true });
            }
            else {
                res.send({ result: false, msg: 'redis 내 키가 존재하지 않음' });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async authuser(req, res) {
        try {
            const logintoken = req.cookies.userKey;
            if (!logintoken) {
                res.send({ result: false, msg: '로그인 상태가 아닙니다' });
                return;
            }
            const result = await this.userService.authUser(logintoken);
            res.send({ result: true, msg: result });
        }
        catch (err) {
            throw err;
        }
    }
    async getUserInfo(req, res) {
        try {
            const logintoken = req.cookies.userKey;
            if (logintoken) {
                const result = await this.userService.getUserInfo(logintoken);
                res.send({
                    result: true,
                    userId: result.user_id,
                    email: result.email,
                    nickname: result.nickname,
                    profile_img: result.profile_img,
                });
            }
            else {
                res.send({ result: false, msg: '로그인 상태가 아닙니다' });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async editUserInfo(data, req, res) {
        try {
            const logintoken = req.cookies.userKey;
            if (logintoken) {
                const result = await this.userService.updateUserInfo(logintoken, data);
                res.clearCookie('userKey');
                res.send(result);
            }
            else {
                res.send({ result: false, msg: '로그인 상태가 아닙니다' });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async withDraw(req, res) {
        try {
            const logintoken = req.cookies.userKey;
            if (logintoken) {
                const result = await this.userService.withDraw(logintoken);
                if (result) {
                    res.clearCookie('userKey');
                    res.send({ result: true });
                }
                else {
                    res.send({ result: false, msg: 'redis 내 키가 존재하지 않음' });
                }
            }
            else {
                res.send({ result: false, msg: '로그인 상태가 아닙니다' });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async uploadImage(file, req, res) {
        try {
            const logintoken = req.cookies.userKey;
            if (!logintoken) {
                res.send({ result: false, msg: '로그인 상태가 아닙니다' });
                return;
            }
            const imageUrl = await this.awsService.imageUploadToS3(file);
            await this.userService.uploadImg(logintoken, imageUrl);
            res.send({ result: true });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Get)('/checkDupId'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkDupId", null);
__decorate([
    (0, common_1.Get)('/checkDupNick'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkDupNick", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.loginDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logOut", null);
__decorate([
    (0, common_1.Get)('/authuser'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authuser", null);
__decorate([
    (0, common_1.Post)('/info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Patch)('/info'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editUserInfo", null);
__decorate([
    (0, common_1.Delete)('/withDraw'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "withDraw", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadImage", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        aws_service_1.AwsService])
], UsersController);
//# sourceMappingURL=users.controller.js.map