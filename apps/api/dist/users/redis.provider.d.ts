import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
export type RedisClient = Redis;
export declare const redisProvider: Provider;
