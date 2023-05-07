import { Repository } from "typeorm";
import { tAddressRequest, tRealEstateRequest } from "../../interfaces/realEstate.interfaces";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

export const createRealEstateService = async (realEstateData: tRealEstateRequest, addressData: tAddressRequest): Promise<RealEstate> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory: Category | null = await categoryRepository.findOneBy({
        id: realEstateData.categoryId
    })

    if(!findCategory){
        throw new AppError('Category id not found', 404)
    }
    
    const saveAddress: Address = await addressRepository.save(addressData)
    
    const newRealEstate: RealEstate = realEstateRepository.create({
       ...realEstateData,
       category: findCategory,
       address: saveAddress
    })

    const saveRealEstate: RealEstate = await realEstateRepository.save(newRealEstate)

    return saveRealEstate
}