import type { Context } from "hono"

export default {
    login: async (c: Context) => {
        const { username } = await c.req.json()
        const data = {
            code: 200,
            msg: "登录成功",
            data: {
                username,
                token: "token"
            }
        }
        return c.json(data)
    }
}