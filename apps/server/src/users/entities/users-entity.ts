import { BoardsEntity } from 'src/boards/entities/board-entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @OneToMany(() => BoardsEntity, (board) => board.author)
  boards: BoardsEntity[];

  @Column({ nullable: true })
  refreshToken: string;
}
