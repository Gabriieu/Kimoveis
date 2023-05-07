import { Repository } from "typeorm";
import { tLogin, tToken } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const loginService = async (payload: tLogin): Promise<tToken> => {

    const usersRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await usersRepository.findOneBy({
        email: payload.email
    })

    if(!user || user.deletedAt){
        throw new AppError('Invalid credentials', 401)
    }

    const compare = await bcrypt.compare(payload.password, user.password)

    if(!compare){
        throw new AppError('Invalid credentials', 401)
    }

    const token = jwt.sign(
        {
            name: user.name,
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            subject: user.id.toString()
        }
    )

    return {token}
}