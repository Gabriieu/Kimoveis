import { Repository } from "typeorm"
import { RealEstate } from "../../entities"
import { AppDataSource } from "../../data-source"

export const getRealEstateService = async () => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const list: RealEstate[] | null = await realEstateRepository.find({
        relations: {
            address: true
        }
    })

    return list
}