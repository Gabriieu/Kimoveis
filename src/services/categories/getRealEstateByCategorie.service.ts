import { Repository } from "typeorm";
import { Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getRealEstateByCategorieService = async (categorie: number): Promise<object> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category | null = await categoryRepository.findOneBy({id: categorie})

    const findRealEstates: RealEstate[] | null = await realEstateRepository.createQueryBuilder("estate")
    .where("estate.category = :category", {category: category?.id})
    .getMany()

     const result = {
        id: category?.id,
        name: category?.name,
        realEstate: findRealEstates
    } 
    return result
}