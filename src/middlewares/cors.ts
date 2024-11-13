// 假设这是在一个中间件文件中

import type { Context, Next } from "hono";

export async function corsMiddleware(c:Context, next:Next) {
    // 允许所有来源
    c.res.headers.set('Access-Control-Allow-Origin', '*');

    // 允许的请求方法
    c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // 允许的请求头
    c.res.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // 允许凭证
    c.res.headers.set('Access-Control-Allow-Credentials', 'true');

    // 预检请求的有效期，单位为秒
    c.res.headers.set('Access-Control-Max-Age', '3600');

    // 如果是 OPTIONS 预检请求，立即响应
    if (c.req.method === 'OPTIONS') {
        c.res.status(204);
        return;
    }

    // 继续处理请求
    return await next();
}