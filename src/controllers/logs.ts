import type { Context } from "hono"
import logger from "../utils/logger"
import path from "path"
import { writeFile } from "fs/promises";

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
    async lgUpload(c: Context) {
        const fData = await c.req.formData()
        console.log(fData)
        const file = fData.get('file')
        if (file instanceof Blob) {
            const buffer = await file.arrayBuffer();
            const data = new Uint8Array(buffer);
            await writeFile(path.join(process.cwd(), 'uploads', Math.random() + file.name), data);
            return c.json({
                code: 200,
            })
        } else {
            return new Response("Invalid file", { status: 400 });
        }
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