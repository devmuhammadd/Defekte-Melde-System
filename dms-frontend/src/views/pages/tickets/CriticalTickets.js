import Grid from '@mui/material/Grid'
import TicketTile from 'src/views/components/dms/TicketTile'

const CriticalTickets = (props) => {
    const {
        tickets,
        handleDeleteTicket,
        handleEditTicket,
        handleTicketStatusChange,
        handleAssignMechanic
    } = props;

    return (
        <Grid container spacing={6}>
            {tickets?.map((ticket, index) => {
                return (
                    <Grid key={index} item xs={12} md={6}>
                        <TicketTile
                            ticket={ticket}
                            handleDeleteTicket={handleDeleteTicket}
                            handleEditTicket={handleEditTicket}
                            handleTicketStatusChange={handleTicketStatusChange}
                            handleAssignMechanic={handleAssignMechanic}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default CriticalTickets
