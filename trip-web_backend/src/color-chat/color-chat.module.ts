import { Module } from '@nestjs/common';
import { ColorChatController } from './color-chat.controller';
import { ColorChatService } from './color-chat.service';

@Module({
  controllers: [ColorChatController],
  providers: [ColorChatService]
})
export class ColorChatModule {}
