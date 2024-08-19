import { BaseEntity } from 'typeorm';
export declare class BoardsEntity extends BaseEntity {
    post_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    post_img: string;
    author: string;
    like: number;
    comment: number;
}
