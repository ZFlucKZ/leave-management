import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

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
});
