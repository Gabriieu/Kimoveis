import { Router } from "express";
import { validateData } from "../middlewares/validateData.middleware";
import { userUpdateSchema, usersRequestSchema } from "../schemas/users.schema";
import { createUserController, getUsersController, softDeleteController, updateUserController } from "../controllers/users.controllers";
import { validateEmailMiddleware } from "../middlewares/validateEmail.middleware";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { validateIDMiddleware } from "../middlewares/validateID.middleware";
import { adminRouteMiddleware } from "../middlewares/adminRoute.middleware";

export const usersRoutes: Router = Router()

usersRoutes.post('', validateData(usersRequestSchema), validateEmailMiddleware, createUserController)

usersRoutes.get('', validateTokenMiddleware,adminRouteMiddleware, getUsersController)

usersRoutes.patch('/:id', validateData(userUpdateSchema), validateIDMiddleware, validateTokenMiddleware, updateUserController)

usersRoutes.delete('/:id', validateTokenMiddleware, validateIDMiddleware, softDeleteController)
