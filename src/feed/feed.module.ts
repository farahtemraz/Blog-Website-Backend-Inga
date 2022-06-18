import { AirtableService } from '../airtable/services/airtable.service';
// import { UserModule } from 'src/user/user.module';
import { AuthModule } from './../auth/auth.module';
import { FeedPostEntity } from './models/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedController } from './controllers/feed.controllers';
import { UserModule } from './../user/user.modules';

@Module({
  imports: [TypeOrmModule.forFeature([FeedPostEntity]), AuthModule, UserModule],
  providers: [FeedService, AirtableService],
  controllers: [FeedController],
  exports: [FeedService, AirtableService],
})
export class FeedModule {}
