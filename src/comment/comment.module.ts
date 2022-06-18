import { UserModule } from './../user/user.modules';
import { FeedModule } from './../feed/feed.module';
import { CommentController } from './controllers/comment.controllers';
import { CommentService } from './services/comment.service';
import { CommentEntity } from './models/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    forwardRef(() => FeedModule),
    forwardRef(() => UserModule),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}

//gives metadata about the class with extra features
