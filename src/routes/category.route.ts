import { Router } from "express";
import { validateData } from "../middlewares/validateData.middleware";
import { categoryRequestSchema } from "../schemas/category.schema";
import { createCategoryController, listAllCategoriesController } from "../controllers/categories.controller";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { validateCategoryMiddleware } from "../middlewares/validateCategory.middleware";

export const categoryRoutes: Router = Router()

categoryRoutes.post('', validateTokenMiddleware, validateData(categoryRequestSchema), validateCategoryMiddleware, createCategoryController)
categoryRoutes.get('', listAllCategoriesController)

