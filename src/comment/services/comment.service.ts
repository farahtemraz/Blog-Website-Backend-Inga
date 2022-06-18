import { User } from './../../user/model/user.interface';
import { FeedPost } from './../../feed/models/post.interface';
import { Comment } from './../models/comment.interface';
import { CommentEntity } from './../models/comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentRepository: Repository<CommentEntity>,
  ) {}

  createComment(
    user: User,
    post: FeedPost,
    comment: Comment,
  ): Observable<Comment> {
    (comment.user = user), (comment.post = post);
    return from(this.CommentRepository.save(comment));
  }
  findAllComments(): Observable<Comment[]> {
    return from(this.CommentRepository.find({ relations: ['user', 'post'] }));
  }
  updateComment(id: number, comment: Comment): Observable<UpdateResult> {
    return from(this.CommentRepository.update(id, comment));
  }

  deleteComment(id: number): Observable<DeleteResult> {
    return from(this.CommentRepository.delete(id));
  }

  findOne(id: number): Observable<FeedPost> {
    return from(
      this.CommentRepository.findOne({
        where: { id },
        relations: ['user', 'post'],
      }),
    );
  }
}
