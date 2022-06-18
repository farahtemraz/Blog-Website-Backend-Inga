import { UserIsAuthorGuard } from './../guards/user-is-user.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-guards';
import { UpdateResult, DeleteResult } from 'typeorm';
import { FeedService } from './../services/feed.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FeedPost } from '../models/post.interface';
import { from, Observable } from 'rxjs';

@Controller('feed') // /feed
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    const user = req.user;
    return this.feedService.createPost(feedPost, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('userId') userId: number): Observable<FeedPost[]> {
    return this.feedService.findAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<FeedPost> {
    return this.feedService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userPosts/:id')
  async findAllByUserId(
    @Param('id') userId: number,
  ): Promise<Observable<FeedPost[]>> {
    return this.feedService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Put(':id') // in url
  update(
    @Body() feedPost: FeedPost,
    @Param('id') id: number,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
