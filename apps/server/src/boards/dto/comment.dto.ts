export class createcommentDto {
  post_id: number;
  content: string;
  image: string[];
  parentsId: number | null;
}

export class patchCommentDto {
  comment_img: string[];
  content: string;
}
