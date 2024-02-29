import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/auth/auth.service';
import { AccessTokenPayload } from '../../src/auth/interfaces';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createAccessToken', () => {
    it('should return an access token', async () => {
      const accessTokenPayload: AccessTokenPayload = {
        userAccountId: 1,
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
      };

      const token = 'token';
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await service.createAccessToken(accessTokenPayload);

      expect(result).toEqual(token);
    });
  });
});
