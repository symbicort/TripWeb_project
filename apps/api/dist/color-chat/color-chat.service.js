"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorChatService = void 0;
const vertexai_1 = require("@google-cloud/vertexai");
const common_1 = require("@nestjs/common");
let ColorChatService = class ColorChatService {
    constructor() {
        this.tryCount = 0;
        this.vertex_ai = new vertexai_1.VertexAI({
            project: 'shaped-radius-425312-c5',
            location: 'asia-northeast3',
        });
        this.model = 'gemini-1.5-pro-001';
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
    async sendMessage(chatRequestDto) {
        try {
            const { nickname, age, season_type, personality_types, decision_criteria_type, travel_type, routine_best_happy, morning_phone_hobby_first_check, favorite_hobby, } = chatRequestDto;
            console.log(personality_types);
            const request_message = `Through the question below, the color that best matches the user and the explanation accordingly are provided. Output Rules: The output shall be in accordance with what is included in the brackets below. The contents in brackets are never directly output, but are interpreted and outputted. The color ratio is output in the form of colors of ~ and ~. The color ratio is not related to the answer, and only the color is referred to and outputted. All metaphors are printed in the form of subheadings. The description of the color minimizes the mention of the answer. It is printed in Korean. Based on the questions and answers below, create a color that best matches the user, a Hex value, and a similar color Question 1: Tell me your name or nickname : ${nickname}, Question 2: Please tell me your age: ${age}, Question 3: When is your favorite season?: ${season_type}, Question 4: Choose 3 words that best describe your personality: ${personality_types[0]}, ${personality_types[1]}, ${personality_types[2]}, Question 5: What are your top priorities for making decisions?: ${decision_criteria_type}, Question 6: What do you think is the most important thing when you go on a trip?: ${travel_type}, Question 7: When do you feel the happiest in your daily life?: ${routine_best_happy}, Question 8: What is the first thing you check when you turn on your smartphone in the morning?: ${morning_phone_hobby_first_check}, Question 9: What is your favorite hobby?: ${favorite_hobby} - Answers must be answered in the form between only [] below and no hex code all answer is only korean and Just answer what's inside and don't include [] in the answer. And if you're not going to keep the above, don't answer And make sure to keep the number of characters written in the output below[<h2>{Username Don't put anything after the name}</h2><br> <h2>{Hex value of best color} </h2><br><h2>{Short parable of best color}</h2><p>{Best color metaphor 1 interpretation (written with 150 or more characters and less than 250 characters)}<p> <h2>{Short parable of the best colors2}</h2><br><p>{Best color metaphor 2 interpretation (written with 150 or more characters and less than 250 characters)}<p><h2>{Short parable of the best colors 3}</h2><br><p>{Best color metaphor 3 interpretation (written with 150 or more characters and less than 250 characters)}<p><p>{Comprehensive interpretation of all questions}<p><p>{Interpretation from question 7}<p><p>{Interpretation from question 8}<p><p>{Interpretation from question 9}<p><h2>{Hex color that goes well with the color that doesn't go well with the above}</h2><br><p>{Interpretation of mismatched color (written over 250 characters)}<p>]`;
            console.log('요청 메시지', request_message);
            const streamResult = await this.chat.sendMessageStream(request_message);
            console.log('채팅 결과', (await streamResult.response).candidates[0].content.parts[0].text);
            const result = (await streamResult.response).candidates[0].content.parts[0].text;
            return result;
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }
};
exports.ColorChatService = ColorChatService;
exports.ColorChatService = ColorChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ColorChatService);
//# sourceMappingURL=color-chat.service.js.map