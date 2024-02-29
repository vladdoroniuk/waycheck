import { Test } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../src/auth/auth.service';
import { RedisService } from '../../src/redis/redis.service';
import { UsersRepository } from '../../src/users/users.repository';
import { UsersService } from '../../src/users/users.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { RedisProvider } from '../../src/redis/redis.provider';

describe('UsersService', () => {
  let usersService: UsersService;
  let authServiceMock: AuthService;
  let redisServiceMock: RedisService;
  let usersRepositoryMock: UsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtService,
        PrismaService,
        UsersService,
        AuthService,
        RedisProvider,
        ConfigService,
        RedisService,
        UsersRepository,
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    authServiceMock = moduleRef.get<AuthService>(AuthService);
    redisServiceMock = moduleRef.get<RedisService>(RedisService);
    usersRepositoryMock = moduleRef.get<UsersRepository>(UsersRepository);
  });

  describe('signIn', () => {
    it('should sign in successfully with correct credentials', async () => {
      const signInData = { username: 'username', password: 'password' };
      const userAccount = {
        password: 'password',
        userAccountId: 1,
        userAccount: {
          firstName: 'firstName',
          lastName: 'lastName',
        },
      };
      const accessToken = 'accessToken';

      jest.spyOn(redisServiceMock, 'isMemberOfSet').mockResolvedValue(true);
      jest
        .spyOn(usersRepositoryMock, 'getUserPasswordHash')
        .mockResolvedValue(userAccount);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest
        .spyOn(authServiceMock, 'createAccessToken')
        .mockResolvedValue(accessToken);

      const result = await usersService.signIn(signInData);

      expect(result).toEqual({ accessToken: 'accessToken' });
    });

    it("should throw BadRequestException if username doesn't exist", async () => {
      const signInCredentials = { username: 'username', password: 'password' };

      jest.spyOn(redisServiceMock, 'isMemberOfSet').mockResolvedValue(false);

      await expect(usersService.signIn(signInCredentials)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('signUp', () => {
    it('should sign up successfully', async () => {
      const signUpData = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        password: 'password',
      };

      jest
        .spyOn(usersRepositoryMock, 'createUserAccount')
        .mockResolvedValue(undefined);
      jest.spyOn(redisServiceMock, 'isMemberOfSet').mockResolvedValue(false);

      const result = await usersService.signUp(signUpData);

      expect(result).toBe(undefined);
    });

    it('should throw ConflictException for existing username', async () => {
      const signUpData = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        password: 'password',
      };
      jest.spyOn(redisServiceMock, 'isMemberOfSet').mockResolvedValue(true);

      await expect(usersService.signUp(signUpData)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
