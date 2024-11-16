import jwt from "jsonwebtoken"

export const jwtSign = (userId: string) => {
    return jwt.sign({
        userId,
    }, Bun.env['JWT_SECRET'] as string, { 
        expiresIn:Bun.env['JWT_EXPIRES_IN']
    })
}

export const jwtVerify = (accessToken: string)=>{
    try {
        return jwt.verify(accessToken, Bun.env['JWT_SECRET'] as string)
    }catch{
        return null
    }
}