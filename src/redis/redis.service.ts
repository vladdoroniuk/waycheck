import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  public constructor(
    @Inject('REDIS')
    private readonly redis: Redis,
  ) {}

  async addToSet(key: string, value: string): Promise<void> {
    await this.redis.sadd(key, value);
  }

  async isMemberOfSet(key: string, value: string): Promise<boolean> {
    return (await this.redis.sismember(key, value)) === 1;
  }
}
