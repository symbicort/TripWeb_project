export interface User {
  user_id: string;
  password: string;
  email: string;
  nickname: string;
  created_at: Date;
  profile_img: undefined | string;
}
