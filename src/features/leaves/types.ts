import { type RouterOutput } from '~/server/api/root';
import { add, update } from './helpers/validators';
import * as z from 'zod'

export type Leave = RouterOutput['leave']['list'][number];

export type AddLeaveInput = z.infer<typeof add>
export type UpdateLeaveInput = z.infer<typeof update>