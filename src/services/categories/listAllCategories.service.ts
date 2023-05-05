import { Repository } from "typeorm"
import { Category } from "../../entities"
import { AppDataSource } from "../../data-source"
import { tCategory } from "../../interfaces/category.interfaces"

export const listAllCategoriesService = async (): Promise<tCategory[]> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const categories: Category[] = await categoryRepository.find()

    return categories
}