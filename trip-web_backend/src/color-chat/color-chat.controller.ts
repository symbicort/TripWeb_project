import { Body, Controller, Post, Req } from '@nestjs/common';
import { ColorChatService } from './color-chat.service';
import { chatTestDto } from './color-chat.model';

@Controller('color-chat')
export class ColorChatController {
  constructor(private colorChatService: ColorChatService) {}

  @Post('/chat')
  async testChat(@Body() data: chatTestDto) {
    console.log(data.content);
    // const result = await this.colorChatService.sendMessage(req.body.content);
    // console.log(result);
  }
}
