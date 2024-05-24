import { Body, Controller, Post } from '@nestjs/common';
import { ColorChatService } from './color-chat.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChatRequestDto, chatResultDto } from './color-chat.model';

@Controller('color-chat')
export class ColorChatController {
  constructor(private colorChatService: ColorChatService) {}

  @Post('/chat')
  async testChat(
    @Body() ChatRequestDto: ChatRequestDto,
  ): Promise<chatResultDto> {
    return await this.colorChatService.sendMessage(ChatRequestDto);
  }
}
