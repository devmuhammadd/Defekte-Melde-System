import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { notAllowedRoles } from 'src/utils/roleUtils';
import Dashboard from 'src/views/pages/tickets/Dashboard';
import EditTicket from 'src/views/pages/tickets/EditTicket';
import NewTicket from 'src/views/pages/tickets/NewTicket';

const Home = ({ hasQueryParams }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { newTicket, ticketId } = router?.query;

  useEffect(() => {
    if (notAllowedRoles.includes(user?.role)) router.push('/');
  }, []);


  const renderComponent = () => {
    if (hasQueryParams) {
      if (newTicket) {
        return <NewTicket />;
      } else if (ticketId) {
        return <EditTicket ticketId={ticketId} />;
      }
    } else {
      return <Dashboard />;
    }
  };

  return <>{renderComponent()}</>;
};

export async function getServerSideProps(context) {
  const { query } = context;

  const hasQueryParams = Object.keys(query).length > 0;

  return {
    props: {
      hasQueryParams,
    },
  };
}

export default Home;
