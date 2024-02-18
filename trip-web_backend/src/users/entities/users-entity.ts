import { BoardsEntity } from 'src/boards/entities/board-entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity('Users')
@Unique(['user_id'])
@Unique(['nickname'])
export class UsersEntity extends BaseEntity {
  @PrimaryColumn({ type: 'nvarchar', length: 30 })
  user_id: string;

  @Column({ type: 'nvarchar', length: 30 })
  email: string;

  @Column({ type: 'nvarchar', length: 20 })
  nickname: string;

  @Column({ type: 'nvarchar', length: 100 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date | null;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  profile_img: string;

  @OneToMany(() => BoardsEntity, (board) => board.writer)
  boards: BoardsEntity[];

  @Column({ nullable: true })
  like_postId: number;

  @Column({ nullable: true })
  follow: number;

  @Column({ nullable: true })
  comment_postId: number;
}
