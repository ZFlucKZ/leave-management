import Layout from '~/features/ui/components/layouts/Admin';
import { type NextPageWithLayout } from '../_app';

const ArticlePage: NextPageWithLayout = () => {
  return <div>IndexPage</div>;
};

ArticlePage.getLayout = Layout;

export default ArticlePage;
