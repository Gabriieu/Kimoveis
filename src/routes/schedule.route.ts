import { Router } from "express";
import { createScheduleController } from "../controllers/schedule.controller";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { validateData } from "../middlewares/validateData.middleware";
import { scheduleRequestSchema } from "../schemas/schedule.schema";

export const scheduleRoute: Router = Router()

scheduleRoute.post('', validateData(scheduleRequestSchema), validateTokenMiddleware, createScheduleController)