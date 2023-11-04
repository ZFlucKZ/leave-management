import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

interface Announcement {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    slug: 'slug-1',
    title: 'Title#1',
    excerpt: 'Excerpt#1',
    content: 'Content#1',
  },
  {
    id: 2,
    slug: 'slug-2',
    title: 'Title#2',
    excerpt: 'Excerpt#2',
    content: 'Content#2',
  },
  {
    id: 3,
    slug: 'slug-3',
    title: 'Title#3',
    excerpt: 'Excerpt#3',
    content: 'Content#3',
  },
  {
    id: 4,
    slug: 'slug-4',
    title: 'Title#4',
    excerpt: 'Excerpt#4',
    content: 'Content#4',
  },
  {
    id: 5,
    slug: 'slug-5',
    title: 'Title#5',
    excerpt: 'Excerpt#5',
    content: 'Content#5',
  },
  {
    id: 6,
    slug: 'slug-6',
    title: 'Title#6',
    excerpt: 'Excerpt#6',
    content: 'Content#6',
  },
];

// * Validate by zod
// * number => z.number()
// * number => z.string()

//** frontend => api.article.[list, byId, update, delete, add]
//** backend
export const announcementRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return announcements;
  }),

  bySlug: publicProcedure.input(z.string()).query(({ input }) => {
    return announcements.find((announcement) => announcement.slug === input);
  }),
});
