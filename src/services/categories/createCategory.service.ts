import { Repository } from "typeorm"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"
import { tCategory, tCategoryRequest } from "../../interfaces/category.interfaces"
import { AppError } from "../../error"

export const createCategoryService = async (categoryData: tCategoryRequest, token: any): Promise<tCategory> => {

    if(!token.admin){
        throw new AppError('Insufficient permission', 401)
    }
    
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category = await categoryRepository.save(categoryData)

    return category
}