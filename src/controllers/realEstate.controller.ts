import { Request, Response } from "express";
import { tAddressRequest, tRealEstate, tRealEstateRequest } from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/real_estate/createRealEstate.service";

export const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {

    const newRealEstateData: tRealEstateRequest = req.body
    const newAddressData: tAddressRequest = req.body.address

    //console.log(`**\n\n\n ${newRealEstateData.categoryId}, ${newAddressData.street}\n\n\n**`)

    const createRealEstate = await createRealEstateService(newRealEstateData, newAddressData)

    return res.status(201).json(createRealEstate)
}