import { AuthService } from './../../auth/services/auth.service';
import { UserEntity } from '../model/user.entity';
import { User } from '../model/user.interface';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { Repository, UpdateResult, DeleteResult, Like } from 'typeorm';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  createUser(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.password = passwordHash;

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );

    // return from(this.userRepository.save(user));
  }
  findAllUsers(): Observable<User[]> {
    return from(this.userRepository.find());
  }
  updateUser(id: number, user: User): Observable<UpdateResult> {
    delete user.email;
    delete user.password;
    return from(this.userRepository.update(id, user));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneById(id: number): Observable<User> {
    return from(this.userRepository.findOneById(id));
  }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(this.userRepository.findOneBy({ email })).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw new BadRequestException('invalid credentials');
            }
          }),
        ),
      ),
    );
  }

  findbyMail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ where: { email } }));
  }
}
