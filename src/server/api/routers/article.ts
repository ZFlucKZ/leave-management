import { TRPCError } from '@trpc/server';
import { title } from 'process';
import { z } from 'zod';
import { slugify } from '~/features/shared/helpers/slugify';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

interface Article {
  id: number;
  slug: string;
  image: string;
  title: string;
  content: string;
  excerpt: string;
}

const articles: Article[] = [
  {
    id: 1,
    slug: 'slug-1',
    image: '/uploads/eberhard-grossgasteiger-W7l2qAUKWcs-unsplash.jpg',
    title: 'Title#1',
    excerpt: 'Excerpt#1',
    content: 'Content#1',
  },
  {
    id: 2,
    slug: 'slug-2',
    image: '/uploads/eberhard-grossgasteiger-W7l2qAUKWcs-unsplash.jpg',
    title: 'Title#2',
    excerpt: 'Excerpt#2',
    content: 'Content#2',
  },
  {
    id: 3,
    slug: 'slug-3',
    image: '/uploads/eberhard-grossgasteiger-W7l2qAUKWcs-unsplash.jpg',
    title: 'Title#3',
    excerpt: 'Excerpt#3',
    content: 'Content#3',
  },
  {
    id: 4,
    slug: 'slug-4',
    image: '/uploads/eberhard-grossgasteiger-W7l2qAUKWcs-unsplash.jpg',
    title: 'Title#4',
    excerpt: 'Excerpt#4',
    content: 'Content#4',
  },
  {
    id: 5,
    slug: 'slug-5',
    image: '/uploads/eberhard-grossgasteiger-W7l2qAUKWcs-unsplash.jpg',
    title: 'Title#5',
    excerpt: 'Excerpt#5',
    content: 'Content#5',
  },
  {
    id: 6,
    slug: 'slug-6',
    image: '/uploads/eberhard-grossgasteiger-W7l2qAUKWcs-unsplash.jpg',
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
export const articleRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return articles;
  }),

  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return articles.find((article) => article.id === input);
  }),

  bySlug: publicProcedure.input(z.string()).query(({ input }) => {
    return articles.find((article) => article.slug === input);
  }),

  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        image: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const article = { id: articles.length, slug: slugify(title), ...input };
      articles.push(article);

      return article;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z
          .object({
            title: z.string(),
            image: z.string(),

            excerpt: z.string(),
            content: z.string(),
          })
          .partial(),
      }),
    )
    .mutation(({ input }) => {
      const { id, data } = input;
      const article = articles.find((article) => article.id === id);

      if (!article) throw new TRPCError({ code: 'NOT_FOUND' });

      if (data.title) {
        article.title = data.title;
        article.slug = slugify(data.title);
      }
      if (data.excerpt) article.title = data.excerpt;
      if (data.content) article.title = data.content;

      return article;
    }),

  remove: publicProcedure.input(z.number()).mutation(({ input }) => {
    const index = articles.findIndex((article) => article.id === input);

    articles.splice(index, 1);
  }),
});
