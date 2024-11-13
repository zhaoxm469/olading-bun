import type { Context, Next } from "hono";

export async function corsMiddleware(c: Context, next: Next) {
    // 设置 CORS 头部
    c.header('Access-Control-Allow-Origin', '*');
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // c.header('Access-Control-Allow-Credentials', 'true');
    // c.header('Access-Control-Max-Age', '3600');

    // 处理 OPTIONS 请求
    // if (c.req.method === 'OPTIONS') {
    //     // 设置状态码为 204
    //     c.status(204);
    //     return c.text('');
    // }

    // 继续处理其他请求ss-Control-Allow-Headers
    await next();
}