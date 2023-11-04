import { useState } from 'react';
import Button from '~/features/ui/components/Button';
import { api } from '~/utils/api';

interface ArticleDetailsProps {
  id: number;
}

const ArticleDetails = ({ id }: ArticleDetailsProps) => {
  const { data: article, isLoading } = api.article.byId.useQuery(id);

  if (isLoading) return <div>Loading...</div>;

  if (!article) return <div>No content.</div>;

  return (
    <ul>
      <li>{article.title}</li>
      <li>{article.excerpt}</li>
      <li>{article.content}</li>
    </ul>
  );
};

const IndexPage = () => {
  const [currentId, setCurrentId] = useState(-1);

  const utils = api.useContext();
  const list = utils.article.list;
  // * tRPC => React Query
  const { isLoading, data: articles } = api.article.list.useQuery();
  const { mutateAsync: addArticle } = api.article.add.useMutation({
    onSuccess() {
      void list.invalidate();
    },
  });
  const { mutateAsync: updateArticle } = api.article.update.useMutation({
    onSuccess() {
      void list.invalidate();
    },
  });
  const { mutateAsync: removeArticle } = api.article.remove.useMutation({
    onSuccess() {
      void list.invalidate();
    },
  });

  const dateString = new Date().toISOString();

  const add = () => {
    void addArticle({
      title: `My Title: ${dateString}`,
      excerpt: `My Excerpt: ${dateString}`,
      content: `My Content: ${dateString}`,
    });
  };

  const update = (id: number) => {
    void updateArticle({
      id,
      data: {
        title: `Update Title: ${dateString}`,
        excerpt: `Update Excerpt: ${dateString}`,
        content: `Update Content: ${dateString}`,
      },
    });
  };

  const remove = (id: number) => {
    void removeArticle(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!articles) {
    return <div>No content.</div>;
  }

  return (
    <>
      <Button color="primary" onClick={add}>
        Add
      </Button>
      <br />
      <ul>
        {articles?.map((article) => {
          return (
            <li key={article.id} className="flex">
              <Button onClick={() => setCurrentId(article.id)}>
                Show Details
              </Button>

              <Button onClick={() => update(article.id)}>Edit</Button>

              <Button onClick={() => remove(article.id)}>Delete</Button>

              {article.title}
            </li>
          );
        })}
      </ul>
      {currentId !== -1 && <ArticleDetails id={currentId}></ArticleDetails>}
    </>
  );
};

export default IndexPage;
