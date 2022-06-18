import { CommentEntity } from './../../comment/models/comment.entity';
import { UserEntity } from './../../user/model/user.entity';
// import { User } from './../../user/model/user.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { timeStamp } from 'console';

@Entity('feed_post')
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  body: string;

  @Column()
  slug: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (author) => author.feedPosts, {
    onDelete: 'CASCADE',
  })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comments) => comments.post, {
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];
}
