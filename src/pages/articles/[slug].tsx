import {
  type InferGetStaticPropsType,
  type GetStaticPaths,
  type GetStaticProps,
} from 'next';
import ArticleDetails from '~/features/articles/components/ArticleDetails';
import Layout from '~/features/ui/components/layouts/Normal';
import { generateServerSideHelper } from '~/server/shared/serverSideHelper';
// import { useRouter } from 'next/router';

const DetailsPage = ({
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** If set Fallback is true can use code below
  // const router = useRouter();
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return <ArticleDetails slug={slug}></ArticleDetails>;
};

export const getStaticProps: GetStaticProps<{ slug: string }> = async (
  context,
) => {
  const helpers = generateServerSideHelper();

  const slug = context.params?.slug as string;

  await helpers.article.bySlug.prefetch(slug);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const helpers = generateServerSideHelper();
  const articles = await helpers.article.list.fetch();

  return {
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    fallback: 'blocking',
  };
};

DetailsPage.getLayout = Layout;

export default DetailsPage;
