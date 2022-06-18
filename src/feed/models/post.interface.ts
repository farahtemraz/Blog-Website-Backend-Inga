import { Comment } from './../../comment/models/comment.interface';
import { User } from './../../user/model/user.interface';
export interface FeedPost {
  id?: number;
  title?: string;
  body?: string;
  slug?: string;
  createdAt?: Date;
  author?: User;
  comment?: Comment[];
}
