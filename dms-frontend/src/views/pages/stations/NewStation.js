import { useStation } from 'src/hooks';
import TicketForm from './StationForm';

function NewStation() {
    const { createOrganization } = useStation();

    return (
        <TicketForm
            title="Add a Station"
            onFormSubmit={createOrganization}
            successMessage="Station added successfully!"
        />
    )
}

export default NewStation