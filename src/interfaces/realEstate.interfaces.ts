import {z} from 'zod'
import { addressRequestSchema, realEstateRequestSchema, realEstateSchema } from '../schemas/realEstate.schema'

export type tRealEstate = z.infer<typeof realEstateSchema>

export type tRealEstateRequest = z.infer<typeof realEstateRequestSchema>

export type tAddressRequest = z.infer<typeof addressRequestSchema>