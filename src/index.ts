import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import logs from './controllers/logs'
import code from './controllers/code'
import redis from './controllers/redis'
import { corsMiddleware } from './middlewares/cors'
import login from './controllers/login'
import { captchaMiddleware } from './middlewares/captcha'
const { verifyCaptcha,createCaptcha } = captchaMiddleware()

const app = new Hono()

app.use('/static/*',serveStatic({ root: './' }))

app.use(corsMiddleware)

// 阿拉钉log
app.post('/api/log', logs.uploadLogs)
app.get('/api/clogs', logs.getLogs)
app.get('/api/logs/delete/:type',logs.deleteLogs)
// 拉取代码
app.get('/api/code/pull', code.gitPull)

// 验证码
app.get('/api/captcha', createCaptcha)
app.post('/api/login', verifyCaptcha,login.login)

// redis 测试
app.get('/api/redis/test', redis.test)


export default { 
    port: Bun.env["APP_PROT"], 
    fetch: app.fetch, 
} 
