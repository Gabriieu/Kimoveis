import { Repository } from "typeorm";
import { tUserRequest, tUserResponse } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { usersResponseSchema } from "../../schemas/users.schema";

export const createUserService = async (payload: tUserRequest): Promise<tUserResponse> => {

    const usersRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const createUser: User = usersRepository.create(payload)

    await usersRepository.save(createUser)
    console.log(createUser)
    const returnUser: tUserResponse = usersResponseSchema.parse(createUser)
    console.log(`*********\n\n\n${returnUser}********`)
    
    return returnUser
}