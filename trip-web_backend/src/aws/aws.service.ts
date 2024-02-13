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
    // AWS S3 클라이언트 초기화. 환경 설정 정보를 사용하여 AWS 리전, Access Key, Secret Key를 설정.
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'), // AWS Region
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'), // Access Key
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'), // Secret Key
      },
    });
  }

  async imageUploadToS3(file: Express.Multer.File): Promise<any> {
    const cleanedFileName = file.originalname.replace(/[^\w.-]/g, ''); // 특수 문자와 공백을 제거한 파일 이름 생성

    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'), // S3 버킷 이름
      Key: 'profile_img/' + Date.now().toString() + '-' + cleanedFileName, // 폴더 경로를 포함한 파일 이름
      Body: file.buffer, // 업로드할 파일
      ACL: 'public-read', // 파일 접근 권한
      ContentType: file.mimetype, // 파일 타입
    });

    console.log(command);

    // 생성된 명령을 S3 클라이언트에 전달하여 이미지 업로드를 수행합니다.
    const imgResult = await this.s3Client.send(command);

    console.log('이미지 업로드 확인', imgResult);

    // 업로드된 이미지의 URL을 반환합니다.
    const fileName = command.input.Key; // 업로드된 파일의 Key (경로를 포함한 파일 이름)
    const imageUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET}/${fileName}`;
    return imageUrl;
  }

  async deleteImg(imgUrl: string) {
    // const command = new DeleteObjectsCommand({
    //   Bucket: this.configService.get('AWS_S3_BUCKET'),
    //   Delete: {
    //     Objects: [{ Key: imgUrl.substring(imgUrl.lastIndexOf('/') + 1) }],
    //   },
    // });

    console.log(imgUrl);

    console.log('키', imgUrl.substring(49));

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
      const result = await this.s3Client.send(new DeleteObjectsCommand(params));

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
}
