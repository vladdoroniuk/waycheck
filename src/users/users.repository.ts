import { Injectable } from '@nestjs/common';
import { UserAccount, UserSignInCredentials } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserSignInCredentials(
    userSignInCredentials: Partial<UserSignInCredentials>,
  ) {
    return this.prismaService.userSignInCredentials.findUnique({
      where: {
        username: userSignInCredentials.username,
      },
      select: { id: true },
    });
  }

  async createUserAccount(
    userAccount: UserAccount,
    userSignInCredentials: UserSignInCredentials,
  ): Promise<number> {
    // atomic transaction
    const createdAccount = await this.prismaService.userAccount.create({
      data: {
        ...userAccount,
        UserSignInCredentials: { create: userSignInCredentials },
      },
    });

    return createdAccount.id;
  }

  createUserSignInCredentials(userSignInCredentials: UserSignInCredentials) {
    return userSignInCredentials;
  }
}
