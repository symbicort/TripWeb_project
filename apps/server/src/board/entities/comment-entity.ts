import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BoardsEntity } from './board-entity';
import { UsersEntity } from 'src/users/entities/users-entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BoardsEntity, (board) => board.comments, {
    cascade: true,
  })
  post: BoardsEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  parent: CommentEntity | null;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.comments)
  author: UsersEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date | null;

  @Column('simple-array')
  comment_img: string[];

  @Column()
  content: string;

  @Column({ default: 0 })
  like: number;
}
