import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
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
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private readonly redis: RedisService,
  ) {}

  async signIn(signIn: SignIn) {
    const { username, password } = signIn;

    const cachedUsernameExists = await this.redis.isMemberOfSet(
      `${REDIS_KEYS.users.prefix}:${REDIS_KEYS.users.keys.username}`,
      username,
    );

    if (!cachedUsernameExists) {
      throw new BadRequestException('Invalid username or password');
    }

    const userCredentials =
      await this.usersRepository.getUserPasswordHash(username);

    const passwordsMatch = await bcrypt.compare(
      password,
      userCredentials!.password,
    );

    if (!passwordsMatch) {
      throw new BadRequestException('Invalid username or password');
    }

    const accessToken = await this.authService.createAccessToken({
      userAccountId: userCredentials!.userAccountId,
      firstName: userCredentials!.userAccount.firstName,
      lastName: userCredentials!.userAccount.lastName,
      username,
    });

    return { accessToken };
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
  }
}
