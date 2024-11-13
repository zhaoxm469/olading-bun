import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import logs from './controllers/logs'
import code from './controllers/code'
import { corsMiddleware } from './middlewares/cors'

const app = new Hono()

app.use('/static/*',serveStatic({ root: './' }))

app.use(corsMiddleware)

app.post('/api/log', logs.uploadLogs)
app.get('/api/clogs', logs.getLogs)
app.get('/api/logs/delete/:type', logs.deleteLogs)
app.get('/api/code/pull', code.gitPull)

export default { 
  port: 8073, 
  fetch: app.fetch, 
} 
