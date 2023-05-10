import { Request, Response } from "express";
import { tAddressRequest, tRealEstate, tRealEstateRequest } from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/real_estate/createRealEstate.service";
import { RealEstate } from "../entities";
import { getRealEstateService } from "../services/real_estate/getRealEstate.service";
import { getRealEstateByCategorieService } from "../services/categories/getRealEstateByCategorie.service";

export const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const newRealEstateData: tRealEstateRequest = req.body
    const newAddressData: tAddressRequest = req.body.address

    const createRealEstate = await createRealEstateService(newRealEstateData, newAddressData)

    return res.status(201).json(createRealEstate)
}

export const listAllRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const list: RealEstate[] | null = await getRealEstateService()

    return res.json(list)
}
