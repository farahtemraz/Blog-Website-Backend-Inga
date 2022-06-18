import { CommentService } from './../services/comment.service';
import { Comment } from './../models/comment.interface';
import { UserService } from './../../user/services/user.service';
import { User } from './../../user/model/user.interface';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private commentService: CommentService,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const commentId: number = Number(params.id);
    const user: User = request.user;

    return this.userService.findOneById(user.id).pipe(
      switchMap((user: User) =>
        this.commentService.findOne(commentId).pipe(
          map((comment: Comment) => {
            let hasPermission = false;

            if (user.id === comment.user.id) {
              hasPermission = true;
            }

            return user && hasPermission;
          }),
        ),
      ),
    );
  }
}
