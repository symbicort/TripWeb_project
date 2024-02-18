export class BoardDto {
  post_id: number;
  title: string;
  content: string;
  writer: string;
  updated_at: Date;
  post_img: string;
  author: string;
  like: number;
  comment: number;
}

export class createBoardDto {
  title: string;
  content: string;
  writer: string;
  post_img: object;
  author: string;
}
