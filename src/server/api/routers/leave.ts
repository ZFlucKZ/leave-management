import * as z from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import * as validator from '~/features/leaves/helpers/validators';

// * Validate by zod
// * number => z.number()
// * number => z.string()

//** frontend => api.article.[list, byId, update, delete, add]
//** backend
export const leaveRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const leaves = await ctx.db.leave.findMany({
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

  add: publicProcedure.input(validator.add).mutation(async ({ input, ctx }) => {
    const article = await ctx.db.leave.create({
      data: {
        ...input,
        userId: 1,
      },
    });

    return article;
  }),

  update: publicProcedure
    .input(validator.update)
    .mutation(async ({ input, ctx }) => {
      const article = await ctx.db.leave.update({
        where: { id: input.id },
        data: input.data,
      });

      return article;
    }),
});
