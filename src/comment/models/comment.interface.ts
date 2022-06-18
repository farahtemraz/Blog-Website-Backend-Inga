import { User } from './../../user/model/user.interface';
import { FeedPost } from './../../feed/models/post.interface';
export interface Comment {
  id?: number;
  body?: string;
  user?: User;
  post?: FeedPost;
}
