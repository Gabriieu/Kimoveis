import { Request, Response } from "express";
import { tUserRequest, tUserResponse } from "../interfaces/users.interfaces";
import { createUserService } from "../services/createUser.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const data: tUserRequest = req.body
    const createdUser: tUserResponse = await createUserService(data)

    return res.status(201).json(createdUser)
}