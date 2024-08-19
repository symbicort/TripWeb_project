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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./entities/users-entity");
const crypto_1 = require("../utils/crypto");
const jwt_1 = require("@nestjs/jwt");
const makeKey_1 = require("../utils/makeKey");
const token_service_1 = require("./token.service");
const aws_service_1 = require("../aws/aws.service");
let UsersService = class UsersService {
    constructor(redis, usersDB, jwtService, tokenService, awsService) {
        this.redis = redis;
        this.usersDB = usersDB;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.awsService = awsService;
    }
    async signUp(registerInfo) {
        const { user_id, email, nickname, created_at, profile_img } = registerInfo;
        const password = (0, crypto_1.hashPW)(registerInfo.password);
        try {
            await this.usersDB.insert({
                user_id,
                email,
                nickname,
                password,
                created_at,
                profile_img,
            });
            return { result: true, nickname: nickname };
        }
        catch (err) {
            console.error(err);
            if (err instanceof typeorm_2.QueryFailedError) {
                const dupcol = err.message.split("'");
                return { result: false, dupcol: dupcol[1] };
            }
            throw err;
        }
    }
    async checkDupId(inputId) {
        try {
            const result = await this.usersDB.count({ where: { user_id: inputId } });
            console.log('유저 아이디 검증', result, inputId);
            if (result > 0) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async checkDupNickname(inputNickname) {
        try {
            const result = await this.usersDB.count({
                where: { nickname: inputNickname },
            });
            if (result > 0) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async login(data) {
        try {
            const { userId, pw } = data;
            const idValid = await this.usersDB.findOne({
                where: { user_id: userId },
            });
            if (!idValid) {
                return { result: false, msg: '가입된 아이디가 존재하지 않습니다.' };
            }
            const validPW = (0, crypto_1.comparePW)(pw, idValid.password);
            if (!validPW) {
                return { result: false, msg: '비밀번호가 일치하지 않습니다' };
            }
            const connectKey = (0, makeKey_1.randomKey)();
            const payload = { loginkey: connectKey };
            const loginToken = this.jwtService.sign(payload);
            await this.redis.set(connectKey, idValid.user_id, 'EX', 604800);
            return { result: true, msg: '로그인 성공', token: loginToken };
        }
        catch (err) {
            throw err;
        }
    }
    async logout(logintoken) {
        try {
            const loginKey = this.jwtService.verify(logintoken).loginkey;
            const logoutRes = await this.redis.del(loginKey);
            if (logoutRes) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async authUser(logintoken) {
        try {
            const userId = await this.tokenService.getUserIdFromToken(logintoken);
            if (!userId) {
                return { result: false };
            }
            const idValid = await this.usersDB.findOne({
                where: { user_id: userId },
            });
            if (!idValid) {
                return { result: false };
            }
            return { result: true, nickname: idValid.nickname };
        }
        catch (err) {
            throw err;
        }
    }
    async getUserInfo(logintoken) {
        try {
            const userId = await this.tokenService.getUserIdFromToken(logintoken);
            const idValid = await this.usersDB.findOne({
                where: { user_id: userId },
            });
            return idValid;
        }
        catch (err) {
            throw err;
        }
    }
    async updateUserInfo(loginToken, data) {
        const { userId, email, nickname, original_password } = data;
        console.log(data);
        try {
            const idValid = await this.usersDB.findOne({
                where: { user_id: userId },
            });
            if (!idValid) {
                return { result: false, msg: '이메일이 존재하지 않습니다.' };
            }
            const validPW = (0, crypto_1.comparePW)(original_password, idValid.password);
            if (!validPW) {
                return { result: false, msg: '비밀번호가 일치하지 않습니다' };
            }
            const nicknameValid = await this.usersDB.findOne({
                where: { nickname: nickname },
            });
            if (nicknameValid) {
                return {
                    result: false,
                    msg: '중복된 닉네임으로 변경이 불가능합니다.',
                };
            }
            if (data.new_password) {
                const password = (0, crypto_1.hashPW)(data.new_password);
                await this.usersDB.update({ user_id: userId }, { email: email, nickname: nickname, password: password });
            }
            else {
                await this.usersDB.update({ user_id: userId }, { email: email, nickname: nickname, password: idValid.password });
            }
            const loginKey = this.jwtService.verify(loginToken).loginkey;
            await this.redis.del(loginKey);
            return { result: true, msg: '정보가 성공적으로 변경되었습니다.' };
        }
        catch (err) {
            throw err;
        }
    }
    async withDraw(logintoken) {
        try {
            const loginKey = this.jwtService.verify(logintoken).loginkey;
            const userId = await this.redis.get(loginKey);
            const result = await this.usersDB.softDelete({ user_id: userId });
            if (result.affected) {
                await this.redis.del(loginKey);
                return { result: true, msg: '회원탈퇴가 완료되었습니다.' };
            }
        }
        catch (err) {
            throw err;
        }
    }
    async uploadImg(logintoken, imageUrl) {
        try {
            const userId = await this.tokenService.getUserIdFromToken(logintoken);
            const imgValid = await this.usersDB.findOne({
                where: { user_id: userId },
            });
            if (imgValid.profile_img) {
                console.log('이미지 삭제');
                await this.awsService.deleteImg(imgValid.profile_img);
            }
            const idValid = await this.usersDB.update({ user_id: userId }, { profile_img: imageUrl });
            console.log(idValid);
        }
        catch (err) {
            throw err;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_CLIENT')),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        jwt_1.JwtService,
        token_service_1.TokenService,
        aws_service_1.AwsService])
], UsersService);
//# sourceMappingURL=users.service.js.map