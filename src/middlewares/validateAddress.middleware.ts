import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Address } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateAddressMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const {zipCode, number} = req.body.address

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const findAddress: Address | null = await addressRepository.findOne({
        where: {
            zipCode: zipCode,
            number: number
        }
    })

    if(findAddress){
        throw new AppError('Address already exists', 409)
    }

    return next()
}