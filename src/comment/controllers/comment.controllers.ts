import { UserIsAuthorGuard } from './../guards/user-is-user.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-guards';
import { FeedService } from './../../feed/services/feed.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CommentService } from './../services/comment.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Comment } from '../models/comment.interface';
import { from, Observable } from 'rxjs';

@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    @Inject(forwardRef(() => FeedService))
    private feedService: FeedService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(
    @Param('id') postId: number,
    @Body() comment: Comment,
    @Request() req,
  ): Promise<Observable<Comment>> {
    const post = await this.feedService.findCommentPost(postId);
    const user = req.user;
    return this.commentService.createComment(user, post, comment);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Observable<Comment[]> {
    return this.commentService.findAllComments();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Comment> {
    return this.commentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Put(':id') // id yekon fl url
  update(
    @Body() comment: Comment,
    @Param('id') id: number,
  ): Observable<UpdateResult> {
    return this.commentService.updateComment(id, comment);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.commentService.deleteComment(id);
  }
}
