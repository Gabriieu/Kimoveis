import { Repository } from "typeorm";
import { RealEstate, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";

export const getScheduleByRealEstateService = async (realEstateId: number) => {

    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findRealEstate = await realEstateRepository.createQueryBuilder("estate")
    .where("estate.id = :estateId", {estateId: realEstateId})
    .leftJoinAndSelect("estate.address", "address")
    .leftJoinAndSelect("estate.category", "category")
    .getOne()

    const findSchedules = await scheduleRepository.createQueryBuilder("schedule")
    .where("schedule.realEstateId = :estate", {estate: findRealEstate!.id})
    .leftJoinAndSelect("schedule.user", "user")
    .getMany()

    const resposta = {...findRealEstate, schedules: findSchedules}
    
    console.log(resposta)

    return resposta
}