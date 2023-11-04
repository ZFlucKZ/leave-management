import AnnouncementList from '~/features/announcements/components/AnnouncementList';
import Layout from '~/features/ui/components/layouts/Normal';

const IndexPage = () => {
  return <AnnouncementList></AnnouncementList>;
};

IndexPage.getLayout = Layout;

export default IndexPage;
