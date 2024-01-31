import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('boards')
export class BoardsEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    post_id: number;

    @Column({type: 'nvarchar', length: 30})
    title: string;

    @Column({type: 'nvarchar', length: 2000})
    content: string;

    @Column({type: 'nvarchar', length: 20})
    writer: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({nullable: true})
    post_img: string;
}