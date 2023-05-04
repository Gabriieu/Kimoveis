import {z} from 'zod'

export const usersSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().max(256),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable()
})

export const usersRequestSchema = usersSchema.omit({id: true, createdAt: true, updatedAt: true, deletedAt: true})

export const usersResponseSchema = usersSchema.omit({password: true})