import Redis, { Redis as RedisClient, type RedisOptions } from 'ioredis';
import logger from './logger';

export class RedisService {
    private static instance: RedisService;
    private client: RedisClient;

    private constructor(options: RedisOptions) {
        this.client = new Redis(options);
        this.setupEventListeners();
    }

    public static getInstance(options: RedisOptions): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService(options);
        }
        return RedisService.instance;
    }

    private setupEventListeners(): void {
        this.client.on('error', (err) => logger.error('Redis error', err));
        this.client.on('connect', () => logger.info('Connected to Redis'));
        this.client.on('ready', () => logger.info('Redis is ready'));
        this.client.on('close', () => logger.warn('Redis connection closed'));
    }

    public async get<T>(key: string): Promise<T | null> {
        try {
            const value = await this.client.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            logger.error(`Error getting key ${key}`, error);
            return null;
        }
    }

    public async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
        try {
            const stringValue = JSON.stringify(value);
            if (ttl) {
                await this.client.set(key, stringValue, 'EX', ttl);
            } else {
                await this.client.set(key, stringValue);
            }
            return true;
        } catch (error) {
            logger.error(`Error setting key ${key}`, error);
            return false;
        }
    }

    public async del(...keys: string[]): Promise<number> {
        try {
            return await this.client.del(keys);
        } catch (error) {
            logger.error(`Error deleting keys ${keys.join(', ')}`, error);
            return 0;
        }
    }

    public async exists(...keys: string[]): Promise<number> {
        try {
            return await this.client.exists(keys);
        } catch (error) {
            logger.error(`Error checking existence of keys ${keys.join(', ')}`, error);
            return 0;
        }
    }

    public async incr(key: string): Promise<number> {
        try {
            return await this.client.incr(key);
        } catch (error) {
            logger.error(`Error incrementing key ${key}`, error);
            return 0;
        }
    }

    public async hget(key: string, field: string): Promise<string | null> {
        try {
            return await this.client.hget(key, field);
        } catch (error) {
            logger.error(`Error getting hash field ${field} from key ${key}`, error);
            return null;
        }
    }

    public async hset(key: string, field: string, value: string): Promise<number> {
        try {
            return await this.client.hset(key, field, value);
        } catch (error) {
            logger.error(`Error setting hash field ${field} for key ${key}`, error);
            return 0;
        }
    }

    public async expire(key: string, seconds: number): Promise<number> {
        try {
            return await this.client.expire(key, seconds);
        } catch (error) {
            logger.error(`Error setting expiration for key ${key}`, error);
            return 0;
        }
    }

    public async ttl(key: string): Promise<number> {
        try {
            return await this.client.ttl(key);
        } catch (error) {
            logger.error(`Error getting TTL for key ${key}`, error);
            return -1;
        }
    }

    public async keys(pattern: string): Promise<string[]> {
        try {
            return await this.client.keys(pattern);
        } catch (error) {
            logger.error(`Error getting keys with pattern ${pattern}`, error);
            return [];
        }
    }

    public async flushall(): Promise<'OK'> {
        try {
            return await this.client.flushall();
        } catch (error) {
            logger.error('Error flushing all keys', error);
            throw error;
        }
    }

    public getClient(): RedisClient {
        return this.client;
    }

    public async disconnect(): Promise<void> {
        await this.client.quit();
    }
}

// 使用示例
const redisService = RedisService.getInstance({
    host: Bun.env['REDIS_HOST'] || 'localhost',
    port: Number(Bun.env['REDIS_PORT']),
    password: Bun.env['REDIS_PASSWORD'],
});

export default redisService;