import { UsersEntity } from 'src/users/entities/users-entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('boards')
export class BoardsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  post_id: number;

  @Column({ type: 'nvarchar', length: 30 })
  title: string;

  @Column({ type: 'nvarchar', length: 2000 })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: true })
  post_img: string;

  @Column()
  author: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  comment: number;
}
