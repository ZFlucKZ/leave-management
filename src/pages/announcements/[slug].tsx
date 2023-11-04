import AnnouncementDetails from '~/features/announcements/components/AnnouncementDetails';
import Layout from '~/features/ui/components/layouts/Normal';

const DetailsPage = () => {
  return <AnnouncementDetails></AnnouncementDetails>;
};

DetailsPage.getLayout = Layout;

export default DetailsPage;
