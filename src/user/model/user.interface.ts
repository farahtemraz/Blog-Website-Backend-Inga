import { Comment } from './../../comment/models/comment.interface';
import { FeedPost } from './../../feed/models/post.interface';
export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  feedPosts?: FeedPost[];
  comments?: Comment[];
}
