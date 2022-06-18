import { CommentEntity } from './../../comment/models/comment.entity';
import { FeedPostEntity } from './../../feed/models/post.entity';
// import { FeedPost } from './../../feed/models/post.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { timeStamp } from 'console';

@Entity('user') //name of table in db
export class UserEntity {
  @PrimaryGeneratedColumn() //primary key
  id: number;

  @Column()
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => FeedPostEntity, (feedPosts) => feedPosts.author, {
    onDelete: 'CASCADE',
  })
  feedPosts: FeedPostEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.user, {
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];
}
