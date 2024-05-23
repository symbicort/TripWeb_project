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

export class chatRequestDto {
  name: string;
  age: number;
  season: Color_Survey_Record_Season_Type_Enum;
  personality_type1: Color_Survey_Record_Personality_Type_Enum;
  personality_type2: Color_Survey_Record_Personality_Type_Enum;
  personality_type3: Color_Survey_Record_Personality_Type_Enum;
  Decision_type: Color_Survey_Record_Decision_Criteria_Type_Enum;
  travel_type: Color_Survey_Record_Travel_Type_Enum;
  happy_moment: string;
  hobby: string;
  wakeup_morning: string;
}

export enum Color_Survey_Record_Personality_Type_Enum {
  ACTIVE = 'ACTIVE',
  BRAVE = 'BRAVE',
  CALM = 'CALM',
  CAUTIOUS = 'CAUTIOUS',
  CREATIVE = 'CREATIVE',
  DILIGENT = 'DILIGENT',
  HONEST = 'HONEST',
  METICULOUS = 'METICULOUS',
  OPTIMISTIC = 'OPTIMISTIC',
  PASSIONATE = 'PASSIONATE',
  QUIET = 'QUIET',
  SOCIABLE = 'SOCIABLE',
  STRONG = 'STRONG',
}

export enum Color_Survey_Record_Decision_Criteria_Type_Enum {
  EMOTION = 'EMOTION',
  EXPERIENCE = 'EXPERIENCE',
  INTUITION = 'INTUITION',
  LOGIC = 'LOGIC',
}

export enum Color_Survey_Record_Season_Type_Enum {
  FALL = 'FALL',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  WINTER = 'WINTER',
}

export enum Color_Survey_Record_Travel_Type_Enum {
  ATMOSPHERE_RELAXATION = 'ATMOSPHERE_RELAXATION',
  CLIMATE_HYGIENE = 'CLIMATE_HYGIENE',
  COMFORT = 'COMFORT',
  COST_BUDGET = 'COST_BUDGET',
  NEW_EXPERIENCES = 'NEW_EXPERIENCES',
}
