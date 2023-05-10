import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Schedule } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateScheduleMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    let {date, hour, realEstateId} = req.body
    const userId: number = res.locals.token.id
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    date = new Date(new Date(date.setDate(date.getDate()+ 1)).toISOString().split('T')[0])
    
    const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

    if(!weekday[new Date(date).getDay()]){
        throw new AppError('Invalid date, work days are monday to friday')
    }
    
    if(hour < "08:00" || hour > "18:00"){
        throw new AppError('Invalid hour, available times are 8AM to 18PM')
    }

    const checkUsersSchedules = await scheduleRepository.createQueryBuilder("schedule")
    .where("schedule.date = :date AND schedule.hour = :hour", {date: date, hour: hour})
    .andWhere("schedule.userId = :userId", {userId: userId})
    .getOne()
    
    if(checkUsersSchedules){
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }
    
    const chechAvailability = await scheduleRepository.createQueryBuilder("schedule")
    .where("schedule.date = :date AND schedule.hour = :hour", {date: date, hour: hour})
    .andWhere("schedule.realEstateId = :estateId", {estateId: realEstateId})
    .getOne()
    
    if(chechAvailability){
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }


    return next()
}