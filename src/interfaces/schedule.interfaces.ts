import {z} from 'zod'
import { scheduleRequestSchema, scheduleSchema } from '../schemas/schedule.schema'

export type tSchedule = z.infer<typeof scheduleSchema>

export type tScheduleRequest = z.infer<typeof scheduleRequestSchema>
