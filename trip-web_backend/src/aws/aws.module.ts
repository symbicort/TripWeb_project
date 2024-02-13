import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws.service';

@Module({
  providers: [AwsService],
  exports: [AwsService],
  imports: [ConfigModule],
})
export class AwsModule {}
