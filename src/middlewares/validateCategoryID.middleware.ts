import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateCategoryIDMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const categoryId: number = Number(req.params.id)

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory: Category | null = await categoryRepository.findOneBy({
        id: categoryId
    })

    if(!findCategory){
        throw new AppError('Category not found', 404)
    }

    return next()
}