import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source"; 
import { AppError } from "../../error";

export const softDeleteService = async (userId: number, token: any) => {

    if(!token.admin){
        throw new AppError('Insufficient permission', 401)
    }
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        id: userId
    })

    if(!user || user.deletedAt){
        throw new AppError('User not found', 404)
    }

    await userRepository.save({
        ...user,
        deletedAt: new Date()
    })

    return 
}