import { articleRouter } from '~/server/api/routers/article';
import { createTRPCRouter } from '~/server/api/trpc';
import { leaveRouter } from './routers/leave';
import { type inferRouterOutputs, type inferRouterInputs } from '@trpc/server';
import { announcementRouter } from './routers/announement';
import { authRouter } from './routers/auth';
import { adminLeaveRouter } from './routers/admin/leave';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  article: articleRouter,
  leave: leaveRouter,
  announcement: announcementRouter,
  auth: authRouter,
  admin: createTRPCRouter({
    leave: adminLeaveRouter,
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
