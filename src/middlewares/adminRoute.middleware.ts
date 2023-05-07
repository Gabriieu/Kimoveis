import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const adminRouteMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const token = res.locals.token

    if(!token.admin){
        throw new AppError('Insufficient permission', 403)
    }

    return next()
}