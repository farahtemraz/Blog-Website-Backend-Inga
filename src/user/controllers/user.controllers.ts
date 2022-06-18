import { AppModule } from './../../app.module';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { catchError, map, tap } from 'rxjs/operators';

import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { User } from './../model/user.interface';
import { from, Observable, of } from 'rxjs';

@Controller('user') // /user
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // @Post()
  // async create(
  //   @Body('firstName') firstName: string,
  //   @Body('lastName') lastName: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ): Promise<Observable<User>> {
  //   const hashpassword = await bcrypt.hash(password, 12);
  //   return this.userService.createUser({
  //     firstName,
  //     lastName,
  //     email,
  //     password: hashpassword,
  //   });
  // }

  @Post()
  create(@Body() user: User): Observable<User | Object> {
    return this.userService.createUser(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUsers();
  }
  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return from(this.userService.findOneById(params.id));
  }

  @Put(':id') // id yekon fl url
  update(
    @Body() user: User,
    @Param('id') id: number,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  @Post('login')
  login(@Body() user: User): Observable<Object> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  // @Post('login')
  // async login(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ) {
  //   const user = await this.userService.findOne(email);

  //   if (!user) {
  //     throw new BadRequestException('invalid credentials');
  //   }

  //   if (!(await bcrypt.compare(password, user.password))) {
  //     throw new BadRequestException('invalid credentials');
  //   }

  //   const jwt = await this.jwtService.signAsync({ id: user.id });

  //   return jwt;
  // }
}
