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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("./boards.service");
const config_1 = require("@nestjs/config");
const board_dto_1 = require("./dto/board.dto");
const users_service_1 = require("../users/users.service");
const aws_service_1 = require("../aws/aws.service");
const platform_express_1 = require("@nestjs/platform-express");
let BoardsController = class BoardsController {
    constructor(boardService, configService, usersService, awsService) {
        this.boardService = boardService;
        this.configService = configService;
        this.usersService = usersService;
        this.awsService = awsService;
    }
    async createBoard(files, post, req, res) {
        try {
            console.log('이미지 업로드 요청 get');
            let S3imgLink = '';
            console.log('게시글 업로드 요청', files, post);
            const loginUser = await this.checkUser(req);
            if (!loginUser.result) {
                res.status(401).send({ result: false, msg: '로그인 상태가 아닙니다.' });
                return;
            }
            for (let i = 0; i < files.length; i++) {
                const imgUpload = await this.awsService.imageUploadToS3(files[i]);
                S3imgLink += imgUpload + ',';
            }
            console.log('post_img 컬럼에 들어갈 값', S3imgLink);
            const createPost = await this.boardService.createBoard(req.body, S3imgLink, loginUser.nickname);
            res.send(createPost);
        }
        catch (err) {
            throw err;
        }
    }
    async getPost(id) {
        const postData = await this.boardService.getPost(id);
        return postData;
    }
    async checkUser(req) {
        const loginToken = req.cookies.userKey;
        if (!loginToken) {
            return { result: false };
        }
        const authLogin = await this.usersService.authUser(loginToken);
        if (!authLogin) {
            return { result: false };
        }
        return authLogin;
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Post)('/write'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        board_dto_1.BoardDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getPost", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService,
        config_1.ConfigService,
        users_service_1.UsersService,
        aws_service_1.AwsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map