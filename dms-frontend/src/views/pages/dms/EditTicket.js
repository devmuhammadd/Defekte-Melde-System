import { useTicket } from 'src/hooks';
import TicketForm from './TicketForm';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

function EditTicket({ ticketId }) {
    const { tickets, updateTicket } = useTicket();
    const [ticket, setTicket] = useState();

    useEffect(() => {
        setTicket(tickets.filter((ticket) => ticket?.id == ticketId)[0]);
    }, [])

    if (!ticket) {
        return (
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <CircularProgress sx={{ my: 4 }} />
                    <Typography>Loading...</Typography>
                </Box>
            </Grid>
        )
    }

    return (
        <TicketForm
            title="Edit a Ticket"
            onFormSubmit={updateTicket}
            ticket={ticket}
            successMessage="Ticket updated successfully!"
        />
    )
}

export default EditTicket