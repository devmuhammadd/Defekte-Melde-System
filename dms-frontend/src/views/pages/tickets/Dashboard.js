// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardStatisticsSquare from 'src/views/pages/tickets/CardStatisticsSquare'
import { useTicket } from 'src/hooks'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import CriticalTickets from 'src/views/pages/tickets/CriticalTickets'
import { calculateTicketStats } from 'src/utils/ticketUtils'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import TicketsTable from './TicketsTable'
import toast from 'react-hot-toast'
import { ticketCreateRoles } from 'src/utils/roleUtils'
import { useAuth } from 'src/hooks/useAuth'
import AssignMechanicModal from './AssignMechanicModal'

const Dashboard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { tickets, ticketStats, loading, loadDmsData, deleteTicket, completeTicket } = useTicket();
    const [criticalTickets, setCriticalTickets] = useState();
    const [otherTickets, setOtherTickets] = useState();
    const [assignMechanicTicket, setAssignMechanicTicket] = useState();
    const [showAssignMechanicModal, setShowAssignMechanicModal] = useState(false);

    useEffect(() => {
        loadDmsData();
    }, []);

    useEffect(() => {
        const criticalTickets = tickets?.filter(ticket => ticket.urgency === 'Critical')?.reverse()?.slice(0, 2).reverse();
        const otherTickets = tickets?.filter(ticket => !criticalTickets.includes(ticket));
        setCriticalTickets(criticalTickets || []);
        setOtherTickets(otherTickets || []);
    }, [tickets])

    const handleNewTicketClick = () => {
        router.push('/tickets?newTicket=true');
    }

    const handleDeleteTicket = async (ticket) => {
        const response = confirm(`Are you sure you want to delete the ${ticket?.title} ticket?`)
        if (response) {
            try {
                await deleteTicket({ ...ticket, isDeleted: true });
                toast.success("Ticket deleted successfully!");
            } catch (err) {
                toast.error("Unable to delete a ticket!");
            }
        }
    }

    const handleEditTicket = (ticketId) => {
        router.push(`/tickets?editTicket=true&ticketId=${ticketId}`);
    }

    const handleViewTicket = (ticketId) => {
        router.push(`/tickets?ticketId=${ticketId}`);
    }

    const handleTicketStatusChange = async (ticket, status) => {
        const response = confirm(`Are you sure you want to update the status of ${ticket?.title} ticket?`)
        if (response) {
            try {
                await completeTicket({ ...ticket, status });
                toast.success("Ticket status updated successfully!");
            } catch (err) {
                toast.error("Unable to update the ticket's status!");
            }
        }
    }

    const handleAssignMechanic = (ticket) => {
        setAssignMechanicTicket(ticket);
        setShowAssignMechanicModal(true);
    }

    if (loading || !criticalTickets || !otherTickets) {
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
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <CardStatisticsSquare data={calculateTicketStats(ticketStats)} />
            </Grid>
            {ticketCreateRoles.includes(user?.role) &&
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' color='primary'
                        endIcon={<Icon icon='ic:baseline-plus' />}
                        onClick={handleNewTicketClick}
                    >
                        New Ticket
                    </Button>
                </Grid>
            }
            <Grid item xs={12}>
                <CriticalTickets
                    tickets={criticalTickets}
                    handleDeleteTicket={handleDeleteTicket}
                    handleEditTicket={handleEditTicket}
                    handleTicketStatusChange={handleTicketStatusChange}
                    handleAssignMechanic={handleAssignMechanic}
                    handleViewTicket={handleViewTicket}
                />
            </Grid>
            <Grid item xs={12}>
                <TicketsTable
                    tickets={otherTickets}
                    handleDeleteTicket={handleDeleteTicket}
                    handleEditTicket={handleEditTicket}
                    handleTicketStatusChange={handleTicketStatusChange}
                    handleAssignMechanic={handleAssignMechanic}
                    handleViewTicket={handleViewTicket}
                />
                {
                    assignMechanicTicket &&
                    <AssignMechanicModal
                        ticket={assignMechanicTicket}
                        show={showAssignMechanicModal}
                        setShow={setShowAssignMechanicModal}
                    />
                }
            </Grid>
        </Grid >
    )
}

export default Dashboard
