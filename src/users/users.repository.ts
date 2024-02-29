import { Injectable } from '@nestjs/common';
import { UserAccount, UserSignInCredentials } from './interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserPasswordHash(username: string) {
    return this.prismaService.userSignInCredentials.findUnique({
      where: {
        username,
      },
      select: {
        password: true,
        userAccountId: true,
        userAccount: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async createUserAccount(
    userAccount: UserAccount,
    userSignInCredentials: UserSignInCredentials,
  ) {
    // atomic transaction
    await this.prismaService.userAccount.create({
      data: {
        ...userAccount,
        UserSignInCredentials: { create: userSignInCredentials },
      },
    });
  }

  createUserSignInCredentials(userSignInCredentials: UserSignInCredentials) {
    return userSignInCredentials;
  }
}
