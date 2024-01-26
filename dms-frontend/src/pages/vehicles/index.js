import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { chiefRoles, viewOnlyRoles } from 'src/utils/roleUtils';
import Dashboard from 'src/views/pages/vehicles/Dashboard';
import EditVehicle from 'src/views/pages/vehicles/EditVehicle';
import NewVehicle from 'src/views/pages/vehicles/NewVehicle';

const Home = ({ hasQueryParams }) => {
    const router = useRouter();
    const { newVehicle, vehicleId } = router?.query;
    const { user } = useAuth();

    useEffect(() => {
        if (!chiefRoles.includes(user?.role) && !viewOnlyRoles.includes(user?.role)) router.push('/');
    }, []);

    const renderComponent = () => {
        if (hasQueryParams) {
            if (newVehicle) {
                return <NewVehicle />;
            } else if (vehicleId) {
                return <EditVehicle vehicleId={vehicleId} />;
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
