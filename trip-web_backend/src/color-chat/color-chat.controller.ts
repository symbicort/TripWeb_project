import { Body, Controller, Post, Req } from '@nestjs/common';
import { ColorChatService } from './color-chat.service';
import { chatResultDto, chatTestDto } from './color-chat.model';

@Controller('color-chat')
export class ColorChatController {
  constructor(private colorChatService: ColorChatService) {}

  @Post('/chat')
  async testChat(@Body() data: chatTestDto): Promise<chatResultDto> {
    return await this.colorChatService.sendMessage(data.content);
  }
}
