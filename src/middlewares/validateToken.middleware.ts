import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import 'dotenv/config'
import  jwt  from "jsonwebtoken";

export const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let token: string | undefined = req.headers.authorization?.split(' ')[1]

    if(!token){
        throw new AppError('Token is missing', 401)
    }

    jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
        if(error) throw new AppError(error.message, 401)

        res.locals.token = decoded
    })
   

    return next()
}