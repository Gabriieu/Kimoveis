import { Router } from "express";
import { createRealEstateController } from "../controllers/realEstate.controller";
import { validateAddressMiddleware } from "../middlewares/validateAddress.middleware";
import { adminRouteMiddleware } from "../middlewares/adminRoute.middleware";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { validateData } from "../middlewares/validateData.middleware";
import { realEstateRequestSchema } from "../schemas/realEstate.schema";

export const realEstateRoute: Router = Router()

realEstateRoute.post('', validateData(realEstateRequestSchema), validateTokenMiddleware, adminRouteMiddleware, validateAddressMiddleware, createRealEstateController)