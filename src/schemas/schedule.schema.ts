import {z} from 'zod'

export const scheduleSchema = z.object({
    id: z.number(),
    date: z.date(),
    hour: z.string().datetime(),
    realEstateId: z.number(),
    userId: z.number()
})

export const scheduleRequestSchema = scheduleSchema.omit({id: true, userId: true})
