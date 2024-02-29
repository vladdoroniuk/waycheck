import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

export const RedisProvider = {
  provide: 'REDIS',
  useFactory: async (configService: ConfigService) => {
    const redis = new Redis({
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    });

    redis.on('error', (e) => {
      throw new InternalServerErrorException(`Redis connection failed: ${e}`);
    });

    return redis;
  },
  inject: [ConfigService],
};
