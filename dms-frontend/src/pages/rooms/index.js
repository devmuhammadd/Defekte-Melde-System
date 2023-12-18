import { useRouter } from 'next/router';
import Dashboard from 'src/views/pages/rooms/Dashboard';
import EditRoom from 'src/views/pages/rooms/EditRoom';
import NewRoom from 'src/views/pages/rooms/NewRoom';

const Home = ({ hasQueryParams }) => {
    const router = useRouter();
    const { newRoom, roomId } = router?.query;

    const renderComponent = () => {
        if (hasQueryParams) {
            if (newRoom) {
                return <NewRoom />;
            } else if (roomId) {
                return <EditRoom roomId={roomId} />;
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
