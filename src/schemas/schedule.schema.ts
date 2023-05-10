import {z} from 'zod'
import { realEstateSchema } from './realEstate.schema';
import { usersResponseSchema } from './users.schema';


export const scheduleSchema = z.object({
    id: z.number(),
    date: z.coerce.date(),
    hour: z.string(),
    realEstateId: z.number(),
    userId: z.number()
})

export const scheduleRequestSchema = scheduleSchema.omit({id: true, userId: true})

export const scheduleResponseSchema = scheduleSchema.extend({realEstateId: realEstateSchema, userId: usersResponseSchema})
