import {z} from 'zod'
import { loginSchema, userUpdateSchema, usersRequestSchema, usersResponseSchema, usersSchema } from '../schemas/users.schema'
import { DeepPartial } from 'typeorm'


export type tUser = z.infer<typeof usersSchema>

export type tUserRequest = z.infer<typeof usersRequestSchema>

export type tUserResponse = z.infer<typeof usersResponseSchema>

export type tLogin = z.infer<typeof loginSchema>

export type tToken = {token: string}

export type tUserUpdate = DeepPartial<typeof userUpdateSchema>