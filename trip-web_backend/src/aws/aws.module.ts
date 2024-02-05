import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AwsController],
  providers: [AwsService],
  exports: [AwsService],
  imports: [ConfigModule]
})
export class AwsModule {}
