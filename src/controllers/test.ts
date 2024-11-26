import type { Context } from "hono"


export default {
    toDingH5(c: Context) {
        return c.redirect("https://ding.haloweilai.com/teacher/lessonRecord/confirmClass?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1IjoiZGIxYmQ5Y2I2ODBkNGViODgyNjE2YWQzZjI2OTgzNjMifQ.iC7SNBQ_bvA3Tb4ZnHPluX1b565ZV_nJfa7gpFizRm0")
    }
}