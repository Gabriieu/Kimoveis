import { Router } from "express";
import { validateData } from "../middlewares/validateData.middleware";
import { userUpdateSchema, usersRequestSchema } from "../schemas/users.schema";
import { createUserController, getUsersController, softDeleteController, updateUserController } from "../controllers/users.controllers";
import { validateEmailMiddleware } from "../middlewares/validateEmail.middleware";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";

export const usersRoutes: Router = Router()

usersRoutes.post('', validateData(usersRequestSchema), validateEmailMiddleware, createUserController)

usersRoutes.get('', validateTokenMiddleware, getUsersController)

usersRoutes.patch('/:id', validateData(userUpdateSchema), validateEmailMiddleware, validateTokenMiddleware, updateUserController)

usersRoutes.delete('/:id', validateTokenMiddleware, softDeleteController)
