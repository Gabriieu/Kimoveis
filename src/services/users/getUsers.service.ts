import { Repository } from "typeorm";
import { AppError } from "../../error";
import { tUserResponse } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { usersResponseSchema } from "../../schemas/users.schema";

export const getUserService = async (token: any): Promise<tUserResponse[]> => {

    if(!token.admin){
        throw new AppError('Insufficient permission', 401)
    }

    const usersRepository: Repository<User> = AppDataSource.getRepository(User)

    const users: User[] | null = await usersRepository.find()

    const returnList: tUserResponse[] = users.map(user => usersResponseSchema.parse(user))

    return returnList
}