import { useRouter } from 'next/router';
import Card from '~/features/ui/components/Card';
import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';

const AnnouncementDetails = () => {
  const router = useRouter();
  const { data: announcement, isLoading } = api.announcement.bySlug.useQuery(
    router.query.slug as string,
  );

  if (isLoading) return <Loading></Loading>;

  if (!announcement) return <div>No data found.</div>;

  return <Card>{announcement.title}</Card>;
};

export default AnnouncementDetails;
