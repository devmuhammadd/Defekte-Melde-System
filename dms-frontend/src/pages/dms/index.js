import { useRouter } from 'next/router';
import Dashboard from 'src/views/pages/dms/Dashboard';
import EditTicket from 'src/views/pages/dms/EditTicket';
import NewTicket from 'src/views/pages/dms/NewTicket';

const Home = ({ hasQueryParams }) => {
  const router = useRouter();
  const { newTicket, ticketId } = router?.query;

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
