import { ConflictException, Injectable } from '@nestjs/common';
import {
  SignIn,
  SignUp,
  UserAccount,
  UserSignInCredentials,
} from './interfaces';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { REDIS_KEYS, SALT_ROUNDS } from 'src/utils/consts';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly redis: RedisService,
  ) {}

  signIn(signIn: SignIn) {
    //const createdUserAccount = this.authRepository.createUserAccount();
  }

  async signUp(signUp: SignUp) {
    const { firstName, lastName, username, password } = signUp;

    // hash first to avoid a "Timing attack"
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const cachedUsernameExists = await this.redis.isMemberOfSet(
      `${REDIS_KEYS.users.prefix}:${REDIS_KEYS.users.keys.username}`,
      username,
    );

    if (cachedUsernameExists) {
      throw new ConflictException('Provided username already exists');
    }

    const userAccount: UserAccount = {
      firstName,
      lastName,
    };

    const userSignInCredentials: UserSignInCredentials = {
      username,
      password: hashedPassword,
    };

    await this.usersRepository.createUserAccount(
      userAccount,
      userSignInCredentials,
    );

    await this.redis.addToSet(
      `${REDIS_KEYS.users.prefix}:${REDIS_KEYS.users.keys.username}`,
      username,
    );

    // create jwt token
  }
}
