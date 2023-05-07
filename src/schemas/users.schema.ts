import {z} from 'zod'

export const usersSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(256),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.coerce.date(),
    updatedAt: z.date().nullable(),
    deletedAt: z.date().nullable()
})

export const usersRequestSchema = usersSchema.omit({id: true, createdAt: true, deletedAt: true, updatedAt: true})

export const usersResponseSchema = usersSchema.omit({password: true})

export const userUpdateSchema = usersRequestSchema.partial()

export const loginSchema = usersSchema.pick({email: true, password: true})