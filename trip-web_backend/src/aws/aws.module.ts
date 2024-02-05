import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AwsController],
  providers: [],
  exports: [],
  imports: [ConfigModule],
})
export class AwsModule {}
