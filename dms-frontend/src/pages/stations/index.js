import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { adminRoles, viewOnlyRoles } from 'src/utils/roleUtils';
import Dashboard from 'src/views/pages/stations/Dashboard';
import EditStation from 'src/views/pages/stations/EditStation';
import NewStation from 'src/views/pages/stations/NewStation';

const Home = ({ hasQueryParams }) => {
    const router = useRouter();
    const { user } = useAuth();
    const { newStation, stationId } = router?.query;

    useEffect(() => {
        if (!adminRoles.includes(user?.role) && !viewOnlyRoles.includes(user?.role)) router.push('/');
    }, []);

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
