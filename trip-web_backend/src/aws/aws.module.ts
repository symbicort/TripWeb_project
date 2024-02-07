import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws.service';

@Module({
  controllers: [AwsController],
  providers: [AwsService],
  exports: [AwsService],
  imports: [ConfigModule],
})
export class AwsModule {}
