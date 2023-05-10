import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { tScheduleRequest } from "../../interfaces/schedule.interfaces";
import { AppError } from "../../error";

export const createScheduleService = async (payload: tScheduleRequest, userId: number): Promise<string> => {

    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    payload.date = new Date(new Date(payload.date.setDate(payload.date.getDate()+ 1)).toISOString().split('T')[0])
    
    
    const findRealEstate: RealEstate | null = await realEstateRepository.findOneBy({
        id: payload.realEstateId
    })

    if(!findRealEstate){
        throw new AppError('RealEstate not found', 404)
    }

    const findUser: User | null = await userRepository.findOneBy({
        id: userId
    })

    const scheduleData: Schedule = scheduleRepository.create({
        ...payload, 
        user: findUser!,
        RealEstate: findRealEstate
    })
    
    await scheduleRepository.save(scheduleData) 

    return 'Schedule created'
}