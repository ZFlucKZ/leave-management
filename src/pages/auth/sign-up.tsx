import { type NextPageWithLayout } from '../_app';
import Layout from '~/features/ui/components/layouts/Normal';
import Register from '~/features/auth/components/register';

const RegisterPage: NextPageWithLayout = () => {
  return <Register></Register>;
};

RegisterPage.getLayout = Layout;

export default RegisterPage;
