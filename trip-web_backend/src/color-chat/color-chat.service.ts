import { GenerativeModelPreview, VertexAI } from '@google-cloud/vertexai';
import { Injectable } from '@nestjs/common';
import { ChatRequestDto, chatResultDto } from './color-chat.model';
import { request } from 'http';

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
    // 모델
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
  async sendMessage(chatRequestDto: ChatRequestDto) {
    try {
      console.log(chatRequestDto);

      const {
        user_name,
        age,
        season,
        personality_type1,
        personality_type2,
        personality_type3,
        Decision_type,
        travel_type,
        happy_moment,
        wakeup_morning,
        hobby,
      } = chatRequestDto;

      const request_message = `Through the question below, the color that best matches the user and the explanation accordingly are provided. Output Rules: The output shall be in accordance with what is included in the brackets below. The contents in brackets are never directly output, but are interpreted and outputted. The color ratio is output in the form of colors of ~ and ~. The color ratio is not related to the answer, and only the color is referred to and outputted. All metaphors are printed in the form of subheadings. The description of the color minimizes the mention of the answer. It is printed in Korean. Based on the questions and answers below, create a color that best matches the user, a Hex value, and a similar color Question 1: Tell me your name or nickname : ${user_name}, Question 2: Please tell me your age: ${age}, Question 3: When is your favorite season?: ${season}, Question 4: Choose 3 words that best describe your personality: ${personality_type1}, ${personality_type2}, ${personality_type3}, Question 5: What are your top priorities for making decisions?: ${Decision_type}, Question 6: What do you think is the most important thing when you go on a trip?: ${travel_type}, Question 7: When do you feel the happiest in your daily life?: ${happy_moment}, Question 8: What is the first thing you check when you turn on your smartphone in the morning?: ${wakeup_morning}, Question #9: What is your favorite hobby?: ${hobby} - Answers must be answered in the form between only [] below and no hex code all answer is only korean [{ "user_name": "{Username}", "mainColor": "{Hex value of best color}", "Summary1": "{Short parable of best color}", "Summary1_Content": "{Best color metaphor 1 interpretation (written with 150 or more characters and less than 250 characters)}", "Summary2": "{Short parable of the best colors2}", "Summary2_Content": "{Best color metaphor 2 interpretation (written with 150 or more characters and less than 250 characters)}", "Summary3": "{Short parable of the best colors 3}", "Summary3_Content": "{Best color metaphor 3 interpretation (written with 150 or more characters and less than 250 characters)}", "All_summary": "{Comprehensive interpretation of all questions}", "Q7_summary": "{Interpretation from question 7}", "Q8_summary": "{Interpretation from question 8}", "Q9_summary": "{Interpretation from question 9}", "dif_color": "{Hex color of color that mismatched color above}", "dif_color_sum": "{Short parable of best mismatched color}", "dif_color_content": "{Interpretation of mismatched color (written in 150 or more and less than 250 characters)}`;

      console.log('요청 메시지', request_message);

      const streamResult = await this.chat.sendMessageStream(request_message);
      console.log(
        '채팅 결과',
        (await streamResult.response).candidates[0].content.parts[0].text,
      );

      // eslint-disable-next-line prettier/prettier
      const result = (await streamResult.response).candidates[0].content.parts[0].text;

      const trimmedResult = result.trim();

      if (trimmedResult.startsWith('[') && trimmedResult.endsWith(']')) {
        try {
          const jsonArray: chatResultDto = JSON.parse(trimmedResult);
          console.log('json 부분:', jsonArray, typeof jsonArray);
          return jsonArray; // 필요에 따라 반환
        } catch (e) {
          console.error('JSON 파싱 오류:', e.message);
        }
      } else {
        console.error('입력 문자열이 "["로 시작하고 "]"로 끝나지 않습니다.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
