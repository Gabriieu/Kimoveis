import {z} from 'zod'
import { categoryRequestSchema, categorySchema } from '../schemas/category.schema'

export type tCategory = z.infer<typeof categorySchema>

export type tCategoryRequest = z.infer<typeof categoryRequestSchema>