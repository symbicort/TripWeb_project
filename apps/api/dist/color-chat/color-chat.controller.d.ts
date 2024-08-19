import { ColorChatService } from './color-chat.service';
import { ChatRequestDto } from './color-chat.model';
export declare class ColorChatController {
    private colorChatService;
    constructor(colorChatService: ColorChatService);
    testChat(ChatRequestDto: ChatRequestDto): Promise<string>;
}
