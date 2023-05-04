import {z} from 'zod'
import { usersRequestSchema, usersResponseSchema, usersSchema } from '../schemas/users.schema'


export type tUser = z.infer<typeof usersSchema>

export type tUserRequest = z.infer<typeof usersRequestSchema>

export type tUserResponse = z.infer<typeof usersResponseSchema>