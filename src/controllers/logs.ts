import type { Context } from "hono"
import path from "path"
import { writeFile } from "fs/promises";

export default {
    uploadLogs: async (c: Context) => {
        const maxLength = 1000;
        const body = await c.req.json();
        const jsonFilePath = path.join(process.cwd(), 'logs', 'report_data.json');

        // 检查文件是否存在，如果不存在则创建文件
        let existingData = [];
        try {
            const fileContent = await Bun.file(jsonFilePath).text();
            existingData = JSON.parse(fileContent);
        } catch {
            await writeFile(jsonFilePath, JSON.stringify([], null, 2));
        }

        existingData.unshift(body);
        existingData.length = maxLength;
        await writeFile(jsonFilePath, JSON.stringify(existingData, null, 2));
        return c.text('ok');
    },
    getLogs: async (c: Context) => {
        const jsonFilePath = path.join(process.cwd(), 'logs', 'report_data.json');
        const fileContent = await Bun.file(jsonFilePath).text();
        return c.json(JSON.parse(fileContent))
    }
}