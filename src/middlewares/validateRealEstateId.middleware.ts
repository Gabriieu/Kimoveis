import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateRealEstateIdMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const realEstateId: number = Number(req.params.id)

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findRealEstate: RealEstate | null = await realEstateRepository.findOneBy({
        id: realEstateId
    })

    if(!findRealEstate){
        throw new AppError('RealEstate not found', 404)
    }

    return next()
}