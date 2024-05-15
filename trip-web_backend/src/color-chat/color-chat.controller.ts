import { Body, Controller, Post, Req } from '@nestjs/common';
import { ColorChatService } from './color-chat.service';
import { chatTestDto } from './color-chat.model';

@Controller('color-chat')
export class ColorChatController {
  constructor(private colorChatService: ColorChatService) {}

  @Post('/chat')
  async testChat(@Body() data: chatTestDto) {
    const result = await this.colorChatService.sendMessage(data.content);
    // console.log('채팅 결과', result);
  }
}
