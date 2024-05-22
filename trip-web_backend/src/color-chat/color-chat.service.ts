import { GenerativeModelPreview, VertexAI } from '@google-cloud/vertexai';
import { Injectable } from '@nestjs/common';
import { chatResultDto } from './color-chat.model';

@Injectable()
export class ColorChatService {
  private readonly vertex_ai: VertexAI;
  private readonly model: string;
  private readonly generativeModel: GenerativeModelPreview;
  private readonly chat: { sendMessageStream: (arg0: string) => any };
  private tryCount: number = 0;

  constructor() {
    this.vertex_ai = new VertexAI({
      project: 'warm-ring-416301',
      location: 'asia-northeast3',
    });
    this.model = 'gemini-1.5-pro-preview-0514';

    // Instantiate the models
    this.generativeModel = this.vertex_ai.preview.getGenerativeModel({
      model: this.model,
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 2,
        topP: 0.95,
      },
      safetySettings: [],
    });

    this.chat = this.generativeModel.startChat({});
  }

  // API 호출 코드 -- 주석 추가
  async sendMessage(content: string) {
    try {
      console.log(content);
      const streamResult = await this.chat.sendMessageStream(content);
      console.log(
        '채팅 결과',
        (await streamResult.response).candidates[0].content.parts[0].text,
      );
      process.stdout.write(
        'stream result: ' +
          JSON.stringify((await streamResult.response).candidates[0].content) +
          '\n',
      );

      // eslint-disable-next-line prettier/prettier
      const result: string = (await streamResult.response).candidates[0].content.parts[0].text;

      console.log(result);
      if (!result.startsWith('[') || !result.endsWith(']')) {
        throw new Error('입력 문자열이 "["로 시작하지 않습니다.');
      }
      const parseResult: chatResultDto = JSON.parse(result);

      console.log(typeof parseResult);

      console.log(parseResult.Q8_summary);

      return parseResult;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
