import { createTRPCRouter, protectedProcedure } from '../../trpc';
import * as z from 'zod';

export const adminLeaveRouter = createTRPCRouter({
  list: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .query(async ({ ctx }) => {
      const leaves = await ctx.db.leave.findMany({
        select: {
          id: true,
          leaveDate: true,
          reason: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return leaves;
    }),

  byId: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const leave = await ctx.db.leave.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          leaveDate: true,
          reason: true,
          status: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return leave;
    }),

  approve: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const leave = ctx.db.leave.update({
        where: {
          id: input,
        },
        data: {
          status: 'APPROVED',
        },
      });

      return leave;
    }),

  reject: protectedProcedure
    .meta({ roles: ['ADMIN', 'MANAGER'] })
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const leave = ctx.db.leave.update({
        where: {
          id: input,
        },
        data: {
          status: 'REJECTED',
        },
      });

      return leave;
    }),
});
