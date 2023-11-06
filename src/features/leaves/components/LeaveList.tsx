import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import LeaveItem from './LeaveItem';
import FloatingActionButton from '~/features/ui/components/FloatingActionButton';
import { useRouter } from 'next/router';
import { useAppStore } from '~/features/store';

const LeaveList = () => {
  const router = useRouter();
  const { data: leaves, isLoading } = api.leave.list.useQuery(); //* CSR

  const count = useAppStore((state) => state.cart.count);
  const setCount = useAppStore((state) => state.setCartCount);

  if (isLoading) return <Loading />;

  if (!leaves) return <div>Not found.</div>;

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {count}
      {leaves.map((leave) => (
        <LeaveItem key={leave.id} {...leave}></LeaveItem>
      ))}
      <FloatingActionButton
        onClick={() => {
          void router.push('/leaves/new');
          setCount(count + 1);
        }}
      >
        +
      </FloatingActionButton>
    </div>
  );
};

export default LeaveList;
