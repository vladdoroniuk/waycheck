import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RedisModule } from 'src/redis/redis.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, RedisModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
