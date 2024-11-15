import type { Context } from 'hono';
import redisService from '../utils/redis';

async function exampleUsage() {
    // 设置值
    await redisService.set('user:1', { name: 'Alice', age: 30 }, 3600); // 1小时过期

    // 获取值
    const user = await redisService.get<{ name: string, age: number }>('user:1');

    // 检查键是否存在
    const exists = await redisService.exists('user:1');

    // 删除键
    await redisService.del('user:1');

    // 递增计数器
    const newCount = await redisService.incr('visits');

    // 设置哈希表
    await redisService.hset('user:2', 'name', 'Bob');
    await redisService.hset('user:2', 'age', '25');

    // 获取哈希表字段
    const name = await redisService.hget('user:2', 'name');

    // 设置过期时间
    await redisService.expire('user:2', 7200); // 2小时后过期

    // 获取剩余生存时间
    const ttl = await redisService.ttl('user:2');

    // 获取匹配模式的所有键
    const keys = await redisService.keys('user:*');

    // 使用原生客户端执行更复杂的操作
    const pipeline = redisService.getClient().pipeline();
    pipeline.set('key1', 'value1');
    pipeline.set('key2', 'value2');
    await pipeline.exec();
}

export default {
    test(c:Context){
        exampleUsage();
        return c.text('ok')
    }
}