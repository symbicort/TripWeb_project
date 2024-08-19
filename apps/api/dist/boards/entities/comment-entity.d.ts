import { BaseEntity } from 'typeorm';
export declare class CommentEntity extends BaseEntity {
    id: string;
    board_id: string;
    writer: string;
    created_at: Date;
    comment_img: string;
}
