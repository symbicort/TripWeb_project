import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
export declare class AwsService {
    private configService;
    s3Client: S3Client;
    constructor(configService: ConfigService);
    imageUploadToS3(file: Express.Multer.File): Promise<string>;
    deleteImg(imgUrl: string): Promise<boolean>;
}
