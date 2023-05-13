import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { RealEstate, Schedule, User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

export const validateScheduleMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const userId: number = res.locals.token.id
    const {hour, realEstateId} = req.body
    const date = new Date(req.body.date).toISOString().split("T")[0]

    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

    if(!weekday[new Date(date).getDay()]){
        throw new AppError('Invalid date, work days are monday to friday')
    }
    
    if(hour < "08:00" || hour > "18:00"){
        throw new AppError('Invalid hour, available times are 8AM to 18PM')
    }

    const checkUsersSchedules = await scheduleRepository.createQueryBuilder("schedule")
    .where("schedule.RealEstate = :re",{re: realEstateId})
    .andWhere("schedule.date = :date",{date: date})
    .andWhere("schedule.hour = :hour",{hour: hour})
    .getOne()

    console.log(`\n\n\n\n${checkUsersSchedules}`)
    if(checkUsersSchedules){
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }
    
    const chechAvailability = await scheduleRepository.createQueryBuilder("schedule")
    .where("schedule.userId = :user", {user: userId})
    .andWhere("schedule.date = :date",{date: date})
    .andWhere("schedule.hour = :hour",{hour: hour})
    .getOne()
    //console.log(`\n\n\n\n${date}`)
    if(chechAvailability){
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }


    return next()
}