import { useRouter } from 'next/router';
import Dashboard from 'src/views/pages/stations/Dashboard';
import EditStation from 'src/views/pages/stations/EditStation';
import NewStation from 'src/views/pages/stations/NewStation';

const Home = ({ hasQueryParams }) => {
    const router = useRouter();
    const { newStation, stationId } = router?.query;

    const renderComponent = () => {
        if (hasQueryParams) {
            if (newStation) {
                return <NewStation />;
            } else if (stationId) {
                return <EditStation stationId={stationId} />;
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
