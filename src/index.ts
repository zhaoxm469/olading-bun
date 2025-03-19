import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import logs from './controllers/logs'
import code from './controllers/code'
// import redis from './controllers/redis'
import { corsMiddleware } from './middlewares/cors'
// import login from './controllers/login'
// import { captchaMiddleware } from './middlewares/captcha'
import analytics from './controllers/analytics'
// import test from './controllers/test'
// const { verifyCaptcha, createCaptcha } = captchaMiddleware()

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.use(corsMiddleware)

const zhiniuApiVersion = 'v1.0'
// 智牛API log
app.get(`/api/${zhiniuApiVersion}/request/report/logs`, logs.getLogs)
app.post(`/api/${zhiniuApiVersion}/request/report`, logs.uploadLogs)

// 拉取代码
app.get('/api/code/pull', code.gitPull)

// 验证码
// app.get('/api/captcha', createCaptcha)
// app.post('/api/login', verifyCaptcha, login.login)

// redis 测试
// app.get('/api/redis/test', redis.test)

app.post('/api/analytics', analytics.collectData)

app.get('/api/analytics/pageviews', analytics.getPageViewStats)


export default {
    port: Bun.env["APP_PROT"],
    fetch: app.fetch,
} 
