import { profile, register } from '~/features/auth/helpers/validators';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import bcrypt from 'bcryptjs';

export const authRouter = createTRPCRouter({
  register: publicProcedure.input(register).mutation(async ({ input, ctx }) => {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = await ctx.db.user.create({
      data: {
        ...input,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return user;
  }),

  update: protectedProcedure
    .input(profile)
    .mutation(async ({ input: { password, ...data }, ctx }) => {
      const id = +ctx.session.user.id;

      const profile = await ctx.db.user.update({
        where: {
          id,
        },
        data: {
          ...data,
          password: password ? await bcrypt.hash(password, 12) : undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
        },
      });
      return profile;
    }),
});
