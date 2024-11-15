import type { Context } from "hono"
import svgCaptcha from "svg-captcha"


export default {
    getCaptcha: async (c: Context) => {
        const captcha = svgCaptcha.create({
            ignoreChars:"0o1i",
            noise:5,
        // color:true,
        });
    
        // c.header('Content-Type', 'image/svg+xml');

        console.log(captcha.text)
    
        return c.body(captcha.data,200,{
            'Content-Type': 'image/svg+xml',
        })
    }
}