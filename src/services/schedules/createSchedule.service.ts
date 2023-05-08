import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Schedule, User } from "../../entities";
import { tSchedule, tScheduleRequest } from "../../interfaces/schedule.interfaces";
import { scheduleSchema } from "../../schemas/schedule.schema";

export const createScheduleService = async (payload: tScheduleRequest, userId: number): Promise<tSchedule> => {

    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    //payload.userId = userId

    const findUser: User | null = await userRepository.findOneBy({
        id: userId
    })
    
    const scheduleData: Schedule = scheduleRepository.create({
        ...payload, 
        user: findUser!
    })

    await scheduleRepository.save(scheduleData)

    const returnSchedule: tSchedule = scheduleSchema.parse(scheduleData)

    return returnSchedule
}