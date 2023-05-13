import { Router } from "express";
import { createScheduleController, getSchedulesController } from "../controllers/schedule.controller";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { validateData } from "../middlewares/validateData.middleware";
import { scheduleRequestSchema } from "../schemas/schedule.schema";
import { validateScheduleMiddleware } from "../middlewares/validateSchedule.middleware";
import { adminRouteMiddleware } from "../middlewares/adminRoute.middleware";
import { validateRealEstateIdMiddleware } from "../middlewares/validateRealEstateId.middleware";

export const scheduleRoute: Router = Router()

scheduleRoute.post('', validateTokenMiddleware, validateData(scheduleRequestSchema),validateScheduleMiddleware, createScheduleController)

scheduleRoute.get('/realEstate/:id', validateTokenMiddleware, adminRouteMiddleware, validateRealEstateIdMiddleware, getSchedulesController)