import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Address } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateAddressMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    const zipCode = req.body.address.zipCode
    const number = req.body.address.number || null

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const findAddress: Address | null = await addressRepository.createQueryBuilder("address")
    .where("address.number = :number", {number: number})
    .andWhere("address.zipCode = :zipCode", {zipCode: zipCode})
    .getOne()

    if(findAddress){
        throw new AppError('Address already exists', 409)
    }

    return next()
}