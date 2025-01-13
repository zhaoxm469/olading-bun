import type { Context, Next } from "hono";

export async function corsMiddleware(c: Context, next: Next) {
    // 设置允许的源，这里应该是请求的 Origin
    // c.header('Access-Control-Allow-Origin', 'https://112-qa.olading.com');
    // c.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    c.header('Access-Control-Allow-Origin', '*');


    // 允许的请求方法
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // 允许的请求头，添加 'priority'
    c.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, priority');

    // 允许凭证
    c.header('Access-Control-Allow-Credentials', 'true');

    // 预检请求的有效期，单位为秒
    c.header('Access-Control-Max-Age', '3600');

    // 如果是 OPTIONS 预检请求，立即响应
    if (c.req.method === 'OPTIONS') {
        c.status(204);
        return c.text('');
    }

    // 继续处理请求
    await next();
}