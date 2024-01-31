import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'nvarchar', length: 20})
    board_id: string;

    @Column({type: 'nvarchar', length: 20})
    writer: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable: true})
    comment_img: string;
}