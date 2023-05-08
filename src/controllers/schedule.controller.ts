import { Request, Response } from "express";
import { tSchedule, tScheduleRequest } from "../interfaces/schedule.interfaces";
import { createScheduleService } from "../services/schedules/createSchedule.service";

export const createScheduleController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = res.locals.token.id
    const data: tScheduleRequest = req.body

    const schedule: tSchedule = await createScheduleService(data, userId)

    return res.status(201).json(schedule)
}