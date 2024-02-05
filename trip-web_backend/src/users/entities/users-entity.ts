import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('Users')
@Unique(['email'])
@Unique(['nickname'])
export class UsersEntity extends BaseEntity {
  @PrimaryColumn({ type: 'nvarchar', length: 30 })
  email: string;

  @Column({ type: 'nvarchar', length: 20 })
  nickname: string;

  @Column({ type: 'nvarchar', length: 100 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  profile_img: string;
}
