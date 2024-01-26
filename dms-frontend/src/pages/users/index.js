import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { adminRoles, viewOnlyRoles } from 'src/utils/roleUtils';
import Dashboard from 'src/views/pages/users/Dashboard';
import UpdateUserRole from 'src/views/pages/users/UpdateUserRole';

const Home = ({ hasQueryParams }) => {
    const router = useRouter();
    const { user } = useAuth();
    const { userId } = router?.query;

    useEffect(() => {
        if (!adminRoles.includes(user?.role) && !viewOnlyRoles.includes(user?.role)) router.push('/');
    }, []);

    const renderComponent = () => {
        if (hasQueryParams && userId) {
            return <UpdateUserRole userId={userId} />;
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
