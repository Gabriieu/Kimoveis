import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateCategoryMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const categoryName: string = req.body.name

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const foundCategory: Category | null = await categoryRepository.findOneBy({
        name: categoryName
    })

    if(foundCategory){
        throw new AppError('Category already registered', 409)
    }

    return next()
}