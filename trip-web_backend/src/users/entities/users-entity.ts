import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class UsersEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({type: 'nvarchar', length: 20})
    password: string;

    @Column({type: 'nvarchar', length: 30})
    email: string;

    @Column({type: 'nvarchar', length: 20})
    nickname: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({type: 'nvarchar', length: 100, nullable: true})
    profile_img: string;
}