import { User } from './../../user/model/user.interface';
import { Observable, from } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }
  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }
  comparePasswords(
    newPassword: string,
    passwordHash: string,
  ): Observable<any | boolean> {
    return from(bcrypt.compare(newPassword, passwordHash));
  }
}
