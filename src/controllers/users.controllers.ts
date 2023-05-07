import { Request, Response } from "express";
import { tUserRequest, tUserResponse, tUserUpdate } from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { getUserService } from "../services/users/getUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { softDeleteService } from "../services/users/softDelete.service";
import { User } from "../entities";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const data: tUserRequest = req.body
    const createdUser: tUserResponse = await createUserService(data)

    return res.status(201).json(createdUser)
}

export const getUsersController = async (req: Request, res: Response): Promise<Response> => {
    const list: tUserResponse[] = await getUserService(res.locals.token)
    return res.json(list)
}

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {

    const data: tUserUpdate = req.body
    const userId: number = Number(req.params.id)
    const token: string = res.locals.token
    const updatedUser: tUserResponse = await updateUserService(userId, data, token)

    return res.json(updatedUser)
}

export const softDeleteController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = Number(req.params.id)
    const token: string = res.locals.token 
    await softDeleteService(userId, token)

    return res.status(204).send()
}