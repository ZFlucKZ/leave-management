import { type RouterOutput } from '~/server/api/root';
import { type add, type update } from './helpers/validators';
import type * as z from 'zod';

export type LeaveItem = RouterOutput['leave']['list'][number];
export type LeaveDetails = RouterOutput['leave']['byId'];

export type AddLeaveInput = z.infer<typeof add>;
export type UpdateLeaveInput = z.infer<typeof update>;

export type AdminLeaveItem = RouterOutput['admin']['leave']['list'][number];
