import { UsersEntity } from 'src/users/entities/users-entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from './comment-entity';

@Entity('boards')
export class BoardsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  post_id: number;

  @Column({ type: 'nvarchar', length: 30 })
  title: string;

  @Column({ type: 'nvarchar', length: 2000 })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @Column('simple-array')
  post_img: string[];

  @ManyToOne(() => UsersEntity, (users) => users.boards)
  author: UsersEntity;

  @Column({ default: 0 })
  like: number;

  @OneToMany(() => CommentEntity, (comment) => comment.board, {
    cascade: true,
  })
  comments: CommentEntity[];
}
