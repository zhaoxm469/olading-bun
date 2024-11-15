import type { Context } from "hono"
import { $ } from "bun";

export default {
    gitPull: async (c: Context) => {
        try {
            const data = await $`git pull`; // He
            return c.text(data.text())
        }catch(err:any){
            return c.json(err)
        }
    }
}