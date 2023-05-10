import { Request, Response } from "express";
import { tSchedule, tScheduleRequest } from "../interfaces/schedule.interfaces";
import { createScheduleService } from "../services/schedules/createSchedule.service";
import { Schedule } from "../entities";
import { getScheduleByRealEstateService } from "../services/schedules/getScheduleByRealEstate.service";

export const createScheduleController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = res.locals.token.id
    const data: tScheduleRequest = req.body
    
    const schedule: string = await createScheduleService(data, userId)

    return res.status(201).json({message: schedule})
}

export const getSchedulesController = async (req: Request, res: Response): Promise<Response> => {

    const realEstateId: number = Number(req.params.id)
    const schedules = await getScheduleByRealEstateService(realEstateId)

    return res.json(schedules)
}