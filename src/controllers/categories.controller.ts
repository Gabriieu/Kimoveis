import { Request, Response } from "express";
import { tCategory, tCategoryRequest } from "../interfaces/category.interfaces";
import { createCategoryService } from "../services/categories/createCategory.service";
import { listAllCategoriesService } from "../services/categories/listAllCategories.service";
import { RealEstate } from "../entities";
import { getRealEstateByCategorieService } from "../services/categories/getRealEstateByCategorie.service";

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {

    const data: tCategoryRequest = req.body
    const token: string = res.locals.token
    const category: tCategory = await createCategoryService(data, token)

    return res.status(201).json(category)
}

export const listAllCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const categories: tCategory[] = await listAllCategoriesService()

    return res.json(categories)
}

export const listRealEstateByCategoryController = async (req: Request, res: Response): Promise<Response> => {

    const categoryId: number = Number(req.params.id)

    const realEstates = await getRealEstateByCategorieService(categoryId)

    return res.json(realEstates)
}