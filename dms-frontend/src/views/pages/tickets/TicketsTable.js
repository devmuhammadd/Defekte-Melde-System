// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { backgroundColorSelector } from 'src/utils/ticketUtils'
import { Icon } from '@iconify/react'
import { Checkbox, Tooltip } from '@mui/material'
import { useState } from 'react'
import { viewOnlyRoles } from 'src/utils/roleUtils'
import { useAuth } from 'src/hooks/useAuth'

const TicketsTable = ({ tickets, handleDeleteTicket, handleEditTicket, handleTicketStatusChange }) => {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const { user } = useAuth();

    const handleSelectTicket = (event, id) => {
        const selectedIndex = selectedTickets.indexOf(id)
        let newSelected = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedTickets, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedTickets.slice(1))
        } else if (selectedIndex === selectedTickets.length - 1) {
            newSelected = newSelected.concat(selectedTickets.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selectedTickets.slice(0, selectedIndex), selectedTickets.slice(selectedIndex + 1))
        }
        setSelectedTickets(newSelected);
    }

    const isTicketSelected = id => selectedTickets.indexOf(id) !== -1;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Title</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Urgency</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Reporter</TableCell>
                        {!viewOnlyRoles.includes(user?.role) && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets?.length > 0 ?
                        tickets?.map(ticket => {
                            const isSelected = isTicketSelected(ticket?.id)
                            return (
                                <TableRow
                                    key={ticket?.id
                                    }
                                    sx={{
                                        '&:last-of-type td, &:last-of-type th': {
                                            border: 0
                                        },
                                        backgroundColor: backgroundColorSelector[ticket?.urgency],
                                    }}
                                >
                                    <TableCell padding='checkbox'>
                                        <Checkbox checked={isSelected}
                                            onClick={event => handleSelectTicket(event, ticket?.id)}
                                        />
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {ticket?.title}
                                    </TableCell>
                                    <TableCell>{`${ticket?.station} - ${ticket?.locationArea}`}</TableCell>
                                    <TableCell>{ticket?.urgency}</TableCell>
                                    <TableCell>{ticket?.status}</TableCell>
                                    <TableCell>{ticket?.user}</TableCell>
                                    {!viewOnlyRoles.includes(user?.role) &&
                                        <TableCell sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                            <Tooltip title='Edit' placement='top'>
                                                <Icon icon="tabler:edit" width="24" height="24"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleEditTicket(ticket?.id)}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Mark In-Progress' placement='top'>
                                                <Icon icon="carbon:in-progress" width="24" height="24"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleTicketStatusChange(ticket, 'In-progress')}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Mark as Completed' placement='top'>
                                                <Icon icon="mdi:tick-outline" width="24" height="24"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleTicketStatusChange(ticket, 'Completed')}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Delete' placement='top'>
                                                <Icon icon="material-symbols:delete-outline" width="24" height="24"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleDeleteTicket(ticket)}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    }
                                </TableRow>
                            )
                        })
                        :
                        <TableRow>
                            <TableCell colSpan={7} sx={{ textAlign: 'center' }}>No tickets found!</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default TicketsTable
