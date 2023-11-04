import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

interface Leave {
  id: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  leaveDate: string;
}

const leaves: Leave[] = [
  {
    id: 1,
    reason: 'Reason#1',
    status: 'PENDING',
    leaveDate: new Date().toISOString(),
  },
  {
    id: 2,
    reason: 'Reason#2',
    status: 'APPROVED',
    leaveDate: new Date().toISOString(),
  },
  {
    id: 3,
    reason: 'Reason#3',
    status: 'REJECTED',
    leaveDate: new Date().toISOString(),
  },
];

// * Validate by zod
// * number => z.number()
// * number => z.string()

//** frontend => api.article.[list, byId, update, delete, add]
//** backend
export const leaveRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return leaves;
  }),
});
