import { BoardsEntity } from 'src/boards/entities/board-entity';
import { BaseEntity } from 'typeorm';
export declare class UsersEntity extends BaseEntity {
    user_id: string;
    email: string;
    nickname: string;
    password: string;
    created_at: Date;
    deleted_at: Date | null;
    profile_img: string;
    boards: BoardsEntity[];
    like_postId: number;
    follow: number;
    comment_postId: number;
}
