import { z } from 'zod'

export const realEstateSchema = z.object({
    id: z.number(),
    sold: z.boolean().nullable(),
    value: z.string(),
    size: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    addressId: z.number(),
    categoryId: z.number()
})

export const addressSchema = z.object({
    id: z.number(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2)
})

export const addressRequestSchema = addressSchema.omit({id: true})

export const realEstateRequestSchema = realEstateSchema.omit({id: true, createdAt: true, updatedAt: true, addressId: true, sold: true }).extend({address: addressRequestSchema})