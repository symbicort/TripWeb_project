import { ChatRequestDto } from './color-chat.model';
export declare class ColorChatService {
    private readonly vertex_ai;
    private readonly model;
    private readonly generativeModel;
    private readonly chat;
    private tryCount;
    constructor();
    sendMessage(chatRequestDto: ChatRequestDto): Promise<string>;
}
