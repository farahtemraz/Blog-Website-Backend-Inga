import { FeedPost } from './../models/post.interface';
import { FeedService } from './../services/feed.service';
import { UserService } from './../../user/services/user.service';
import { User } from './../../user/model/user.interface';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private feedService: FeedService,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const feedPostId: number = Number(params.id);
    const user: User = request.user;

    return this.userService.findOneById(user.id).pipe(
      switchMap((user: User) =>
        this.feedService.findOne(feedPostId).pipe(
          map((feedPost: FeedPost) => {
            let hasPermission = false;

            if (user.id === feedPost.author.id) {
              hasPermission = true;
            }

            return user && hasPermission;
          }),
        ),
      ),
    );
  }
}
