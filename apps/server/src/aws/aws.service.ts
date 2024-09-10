import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Express } from 'express';

@Injectable()
export class AwsService {
  s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async imageUploadToS3(file: Express.Multer.File): Promise<string> {
    try {
      const cleanedFileName = file.originalname.replace(/[^\w.-]/g, '');

      const command = new PutObjectCommand({
        Bucket: this.configService.get('AWS_S3_BUCKET'),
        Key: cleanedFileName,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      });

      const imgResult = await this.s3Client.send(command);

      const fileName = command.input.Key;
      const imageUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/${fileName}`;

      return imageUrl;
    } catch (error) {
      throw error;
    }
  }

  async deleteImg(imgUrl: string) {
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
      await this.s3Client.send(new DeleteObjectsCommand(params));

      return true;
    } catch (err) {
      throw err;
    }
  }
}
