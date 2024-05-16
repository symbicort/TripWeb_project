import { VertexAI } from '@google-cloud/vertexai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ColorChatService {
  private readonly vertex_ai: VertexAI;
  private readonly model: string;
  private readonly generativeModel;
  private readonly chat;

  constructor() {
    this.vertex_ai = new VertexAI({
      project: 'warm-ring-416301',
      location: 'asia-northeast3',
    });
    this.model = 'gemini-1.5-pro-preview-0409';

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
  }
}
