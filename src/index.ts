import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import logs from './controllers/logs'
import code from './controllers/code'
// import redis from './controllers/redis'
import { corsMiddleware } from './middlewares/cors'
import login from './controllers/login'
import { captchaMiddleware } from './middlewares/captcha'
import analytics from './controllers/analytics'
import test from './controllers/test'
const { verifyCaptcha, createCaptcha } = captchaMiddleware()

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.use(corsMiddleware)

// 阿拉钉log
app.post('/api/log', logs.uploadLogs)
app.get('/api/logs', logs.getLogs)
app.get('/api/logs/clear', logs.deleteLogs)
app.get('/api/logs/delete/:type', logs.deleteLogs)

app.post('/api/log/lingGong', logs.uploadLogs)
// app.get('/api/log/lingGong', logs.uploadLogs)

// 拉取代码
app.get('/api/code/pull', code.gitPull)

// 验证码
app.get('/api/captcha', createCaptcha)
app.post('/api/login', verifyCaptcha, login.login)

// redis 测试
// app.get('/api/redis/test', redis.test)
app.get('/api/1', test.toDingH5)

// https://ding.haloweilai.com/teacher/lessonRecord/confirmClass?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1IjoiZGIxYmQ5Y2I2ODBkNGViODgyNjE2YWQzZjI2OTgzNjMifQ.iC7SNBQ_bvA3Tb4ZnHPluX1b565ZV_nJfa7gpFizRm0

app.post('/api/analytics', analytics.collectData)

app.get('/api/analytics/pageviews', analytics.getPageViewStats)


export default {
    port: Bun.env["APP_PROT"],
    fetch: app.fetch,
} 
