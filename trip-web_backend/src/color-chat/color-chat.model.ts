import { IsEnum } from 'class-validator';
import {
  Color_Survey_Record_Decision_Criteria_Type_Enum,
  Color_Survey_Record_Personality_Type_Enum,
  Color_Survey_Record_Season_Type_Enum,
  Color_Survey_Record_Travel_Type_Enum,
} from './color-chat-enum';

export class chatTestDto {
  content: string;
}

export class chatResultDto {
  user_name: string;
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

export class ChatRequestDto {
  user_name: string;
  age: number;
  @IsEnum(Color_Survey_Record_Season_Type_Enum)
  season: Color_Survey_Record_Season_Type_Enum;
  @IsEnum(Color_Survey_Record_Personality_Type_Enum)
  personality_type1: Color_Survey_Record_Personality_Type_Enum;
  @IsEnum(Color_Survey_Record_Personality_Type_Enum)
  personality_type2: Color_Survey_Record_Personality_Type_Enum;
  @IsEnum(Color_Survey_Record_Personality_Type_Enum)
  personality_type3: Color_Survey_Record_Personality_Type_Enum;
  @IsEnum(Color_Survey_Record_Decision_Criteria_Type_Enum)
  Decision_type: Color_Survey_Record_Decision_Criteria_Type_Enum;
  @IsEnum(Color_Survey_Record_Travel_Type_Enum)
  travel_type: Color_Survey_Record_Travel_Type_Enum;
  happy_moment: string;
  wakeup_morning: string;
  hobby: string;
}
