import { Router } from "express";
import { validateData } from "../middlewares/validateData.middleware";
import { usersRequestSchema } from "../schemas/users.schema";
import { createUserController } from "../controllers/users.controllers";

export const usersRoutes: Router = Router()

usersRoutes.post('', validateData(usersRequestSchema), createUserController)