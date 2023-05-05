import { Repository } from "typeorm";
import { tUserResponse, tUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { usersResponseSchema } from "../../schemas/users.schema";

export const updateUserService = async(userId: number, userData: tUserUpdate, token: any): Promise<tUserResponse> => {
    
    if(Number(token.sub) !== userId && !token.admin){
        throw new AppError('Insufficient permission', 401)
    }

    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        id: userId
    })
    
    
    const newData: User = userRepository.create({
        ...user,
        ...userData,
        updatedAt: new Date()
    })

    await userRepository.save(newData)

    const returnUser: tUserResponse = usersResponseSchema.parse(newData)

    return returnUser
}