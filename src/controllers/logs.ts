import type { Context } from "hono"
import logger from "../utils/logger"
import path from "path"

export default {
  uploadLogs: async (c: Context) => {
    const body = await c.req.json()
    if (body.error) {
        logger.error(body)
    }else{
        logger.info(body)
    }
    return c.text('ok')
  },
  getLogs: async (c: Context) => {
    const query = c.req.query()
    if (query.type === 'error') {
        const logs = Bun.file(path.join(__dirname, "../../logs/error.log"))
        return c.text(await logs.text())
    }
    const logs = Bun.file(path.join(__dirname, "../../logs/all.log"))
    return c.text(await logs.text())
  }
}