import svgCaptcha from "svg-captcha"
import type { Context, Next } from "hono";
import redisService from "../utils/redis";

export interface CaptchaOptions {
    /** 验证码过期时间（秒） */
    expirationTime?: number;
    /** 验证码长度 */
    size?: number;
    /** 干扰线数量 */
    noise?: number;
    /** 忽略的字符 */
    ignoreChars?: string;
}

export const captchaMiddleware = (options: CaptchaOptions = {}) => {
    const { expirationTime = 300, size = 4, noise = 5, ignoreChars = '0o1i' } = options;

    return {
        createCaptcha: async (c: Context) => {
            const captcha = svgCaptcha.create({
                ignoreChars,
                noise,
                size
            });

            const captchaId = crypto.randomUUID()
            redisService.set(captchaId, captcha.text.toLocaleLowerCase(), expirationTime)

            return c.json({
                captchaId,
                captcha: captcha.data
            })
        },
        verifyCaptcha: async (c: Context, next: Next) => {
            const { captchaId, captchaCode } = await c.req.json();
            const captchaValue = await redisService.get(captchaId);
            if (!captchaValue) {
                return c.json({
                    code: 400,
                    msg: "验证码已过期，请重新获取"
                });
            }
            if (captchaCode.toLocaleLowerCase() !== captchaValue) {
                return c.json({
                    code: 400,
                    msg: "验证码错误，请重新输入"
                });
            }
            redisService.del(captchaId)
            next()
        }
    }
}