import { UserEntity } from './../../user/model/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { timeStamp } from 'console';
import { FeedPostEntity } from 'src/feed/models/post.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => FeedPostEntity, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: FeedPostEntity;
}
