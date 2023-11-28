import { useTicket } from 'src/hooks';
import TicketForm from './TicketForm';

function NewTicket() {
    const { createTicket } = useTicket();

    return (
        <TicketForm
            title="Add a Ticket"
            onFormSubmit={createTicket}
            successMessage="Ticket added successfully!"
        />
    )
}

export default NewTicket