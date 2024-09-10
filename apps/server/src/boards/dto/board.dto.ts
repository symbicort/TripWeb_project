export class BoardDto {
  post_id: number;
  title: string;
  content: string;
  created_at: Date;
  post_img: string[];
  author: string;
  like: number;
  comment: number;
}

export class createBoardDto {
  title: string;
  content: string;
  post_img: string | undefined;
  author: string;
}

export class patchPostDto {
  title: string;
  content: string;
  post_img: string[];
}

export class getAllPostDto {
  id: number;
  title: string;
  content: string;
  post_img: string[];
  like: number;
  author: string;
}
