import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateIDMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userId: number = Number(req.params.id)

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const foundUser: User | null = await userRepository.findOneBy({
        id: userId
    })

    if(!foundUser || foundUser.deletedAt){
        throw new AppError('User not found', 404)
    }


    return next()
}