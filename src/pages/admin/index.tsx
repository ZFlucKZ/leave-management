import Layout from '~/features/ui/components/layouts/Admin';
import { type NextPageWithLayout } from '../_app';

const IndexPage: NextPageWithLayout = () => {
  return <div>IndexPage</div>;
};

IndexPage.getLayout = Layout;

export default IndexPage;
