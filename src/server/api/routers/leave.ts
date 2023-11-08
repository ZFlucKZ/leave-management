import * as z from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import * as validator from '~/features/leaves/helpers/validators';
import { TRPCError } from '@trpc/server';
import { setTimeout } from 'timers/promises';

// * Validate by zod
// * number => z.number()
// * number => z.string()

//** frontend => api.article.[list, byId, update, delete, add]
//** backend
export const leaveRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    // await setTimeout(5000);
    const leaves = await ctx.db.leave.findMany({
      where: {
        userId: +ctx.session?.user.id,
      },
      select: {
        id: true,
        reason: true,
        leaveDate: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return leaves;
  }),

  byId: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const leave = await ctx.db.leave.findUnique({
      where: { id: input },
      select: {
        id: true,
        leaveDate: true,
        reason: true,
      },
    });

    if (!leave) throw new TRPCError({ code: 'NOT_FOUND' });

    return leave;
  }),

  add: protectedProcedure
    .input(validator.add)
    .mutation(async ({ input, ctx }) => {
      const article = await ctx.db.leave.create({
        data: {
          ...input,
          userId: +ctx.session?.user.id,
        },
      });

      return article;
    }),

  update: protectedProcedure
    .input(validator.update)
    .mutation(async ({ input, ctx }) => {
      const existingLeave = await ctx.db.leave.findUnique({
        where: {
          id: input.id,
        },
      });

      //* Attribute-Based Access Control
      if (existingLeave?.userId === +ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const article = await ctx.db.leave.update({
        where: { id: input.id },
        data: input.data,
      });

      return article;
    }),
});
