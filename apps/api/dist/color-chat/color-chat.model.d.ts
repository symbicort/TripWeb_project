import { Color_Survey_Record_Decision_Criteria_Type_Enum, Color_Survey_Record_Personality_Type_Enum, Color_Survey_Record_Season_Type_Enum, Color_Survey_Record_Travel_Type_Enum } from './color-chat-enum';
export declare class chatTestDto {
    content: string;
}
export declare class chatResultDto {
    nickname: string;
    mainColor: string;
    summary1: string;
    Summary1_Content: string;
    summary2: string;
    Summary2_Content: string;
    summary3: string;
    Summary3_Content: string;
    All_summary: string;
    Q7_summary: string;
    Q8_summary: string;
    Q9_summary: string;
    dif_color: string;
    dif_color_summary: string;
    dif_color_content: string;
}
export declare class ChatRequestDto {
    nickname: string;
    age: number;
    season_type: Color_Survey_Record_Season_Type_Enum;
    personality_types: Color_Survey_Record_Personality_Type_Enum[];
    decision_criteria_type: Color_Survey_Record_Decision_Criteria_Type_Enum;
    travel_type: Color_Survey_Record_Travel_Type_Enum;
    routine_best_happy: string;
    morning_phone_hobby_first_check: string;
    favorite_hobby: string;
}
