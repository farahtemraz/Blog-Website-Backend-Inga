import { AuthModule } from './../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { UserEntity } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

//gives metadata about the class with extra features
