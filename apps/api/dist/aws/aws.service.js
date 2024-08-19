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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
let AwsService = class AwsService {
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }
    async imageUploadToS3(file) {
        try {
            const cleanedFileName = file.originalname.replace(/[^\w.-]/g, '');
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.configService.get('AWS_S3_BUCKET'),
                Key: Date.now().toString() + '-' + cleanedFileName,
                Body: file.buffer,
                ACL: 'public-read',
                ContentType: file.mimetype,
            });
            console.log(command);
            const imgResult = await this.s3Client.send(command);
            console.log('이미지 업로드 확인', imgResult);
            const fileName = command.input.Key;
            const imageUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/${fileName}`;
            console.log('업로드 된 이미지 URL', imageUrl);
            return imageUrl;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteImg(imgUrl) {
        try {
            const params = {
                Bucket: this.configService.get('AWS_S3_BUCKET'),
                Delete: {
                    Objects: [
                        {
                            Key: imgUrl.substring(49),
                        },
                    ],
                },
            };
            await this.s3Client.send(new client_s3_1.DeleteObjectsCommand(params));
            return true;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsService);
//# sourceMappingURL=aws.service.js.map