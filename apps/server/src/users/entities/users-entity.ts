import { BoardsEntity } from 'src/board/entities/board-entity';
import { CommentEntity } from 'src/board/entities/comment-entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'nvarchar', length: 10 })
  kakaoID: number;

  @Column({ type: 'nvarchar', length: 20 })
  nickname: string;

  @Column({ default: true, type: 'boolean' })
  isDefault: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date | null;

  @Column({ type: 'nvarchar' })
  profile_img: string;

  @OneToMany(() => BoardsEntity, (board) => board.author, {
    cascade: true,
  })
  posts: BoardsEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author, {
    cascade: true,
  })
  comments: CommentEntity[];

  @ManyToMany(() => BoardsEntity, { cascade: true })
  @JoinTable({
    name: 'user_liked_boards',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'board_id', referencedColumnName: 'id' },
  })
  likedBoards: BoardsEntity[];

  @Column({ nullable: true })
  refreshToken: string;
}
