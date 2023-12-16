import { useRoom } from 'src/hooks';
import RoomForm from './RoomForm';

function NewRoom() {
    const { createRoom } = useRoom();

    return (
        <RoomForm
            title="Add a Room"
            onFormSubmit={createRoom}
            successMessage="Room added successfully!"
        />
    )
}

export default NewRoom