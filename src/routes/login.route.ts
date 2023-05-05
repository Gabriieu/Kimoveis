import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { validateData } from "../middlewares/validateData.middleware";
import { loginSchema } from "../schemas/users.schema";

export const loginRoute: Router = Router()

loginRoute.use('', validateData(loginSchema), loginController)