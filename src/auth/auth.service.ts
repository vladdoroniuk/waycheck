import { Injectable } from '@nestjs/common';
import { AccessTokenPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createAccessToken(accessTokenPayload: AccessTokenPayload) {
    return this.jwtService.signAsync(accessTokenPayload);
  }
}
