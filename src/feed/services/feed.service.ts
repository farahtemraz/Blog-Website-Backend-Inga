import { AirtableService } from '../../airtable/services/airtable.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './../../user/services/user.service';
import { User } from './../../user/model/user.interface';
import { FeedPost } from './../models/post.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
const slugify = require('slugify');

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
    userService: UserService,
    private airtableService: AirtableService,
  ) {}

  createPost(feedPost: FeedPost, user: User): Observable<FeedPost> {
    this.airtableService.createRecord('feed_post', feedPost);
    feedPost.author = user;
    return this.generateSlug(feedPost.title).pipe(
      switchMap((slug: string) => {
        feedPost.slug = slug;
        return from(this.feedPostRepository.save(feedPost));
      }),
    );
  }
  findAllPosts(): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.find({ relations: ['author', 'comments'] }),
    );
  }

  findOne(id: number): Observable<FeedPost> {
    return from(
      this.feedPostRepository.findOne({ where: { id }, relations: ['author'] }),
    );
  }

  findByUserId(id: number): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.find({
        where: { author: { id } },
        relations: ['comments'],
      }),
    );
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
  }
  async findCommentPost(id: number): Promise<FeedPost> {
    const post = await this.feedPostRepository.findOneBy({ id });
    return post;
  }
}
