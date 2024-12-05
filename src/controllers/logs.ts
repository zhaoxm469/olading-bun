import type { Context } from "hono"
import logger from "../utils/logger"
import path from "path"

const errorLogPath = path.join(__dirname, "../../logs/error.log");
const allLogPath = path.join(__dirname, "../../logs/all.log");

export default {
    uploadLogs: async (c: Context) => {
        const body = await c.req.json()
        if (body.error) {
            logger.error(body)
        } else {
            logger.info(body)
        }
        return c.text('ok')
    },
    getLogs: async (c: Context) => {
        const query = c.req.query()
        if (query['type'] === 'error') {
            const logs = Bun.file(errorLogPath)
            return c.text(await logs.text())
        }
        const logs = Bun.file(allLogPath)
        return c.text(await logs.text())
    },
    deleteLogs: async (c: Context) => {
        const type = c.req.param('type')
        if (type === 'error') {
            Bun.write(errorLogPath, 'delete success!')
            return c.text('ok')
        }
        Bun.write(allLogPath, 'delete success!')
        return c.text('ok')
    }
}