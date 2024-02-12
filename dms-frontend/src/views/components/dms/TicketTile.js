// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

import { backgroundColorSelector, statusColorSelector, urgencyColorSelector } from 'src/utils/ticketUtils';
import { useAuth } from 'src/hooks/useAuth'
import { viewOnlyRoles } from 'src/utils/roleUtils'

function TicketTile(props) {
    const {
        ticket,
        handleDeleteTicket,
        handleEditTicket,
        handleTicketStatusChange,
        handleAssignMechanic,
        handleViewTicket
    } = props;
    const { user } = useAuth();

    const getOptions = () => {
        const options = [
            { text: 'View Ticket', menuItemProps: { onClick: () => handleViewTicket(ticket?.id) } },
            { text: 'Edit Ticket', menuItemProps: { onClick: () => handleEditTicket(ticket?.id) } },
            { text: 'Mark In-progress', menuItemProps: { onClick: () => handleTicketStatusChange(ticket, 'In-progress') } },
            { text: 'Complete Ticket', menuItemProps: { onClick: () => handleTicketStatusChange(ticket, 'Completed') } },
            { text: 'Delete Ticket', menuItemProps: { sx: { color: 'error.main' }, onClick: () => handleDeleteTicket(ticket) } }
        ]
        if (!ticket?.mechanic)
            options.push({ text: 'Assign Mechanic', menuItemProps: { onClick: () => handleAssignMechanic(ticket) } })

        return options;
    }

    return (
        <Card sx={{ backgroundColor: backgroundColorSelector[ticket?.urgency] }}>
            <CardHeader
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    '& .MuiCardHeader-avatar': { mr: 3 }
                }}
                subheader={
                    <Typography sx={{ display: 'flex', flexDirectionL: 'column', color: 'text.secondary' }}>
                        <Typography component='span' sx={{ mr: 1, fontWeight: 500 }}>
                            Reporter:
                        </Typography>{' '}
                        {ticket?.userId === user?.id ? 'You' : ticket?.user}
                    </Typography>
                }
                action={
                    !viewOnlyRoles.includes(user?.role) && <OptionsMenu
                        iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                        options={getOptions()}
                    />
                }
                title={
                    <Typography variant='h5'>
                        {ticket?.title}
                    </Typography>
                }
            />
            <CardContent>
                <Typography sx={{ color: 'text.secondary' }}>{ticket?.description}</Typography>
            </CardContent>
            <Divider sx={{ my: '0 !important' }} />
            <CardContent>
                <Box
                    sx={{
                        mb: 6,
                        gap: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Tooltip title='Location' placement='top'>
                        <Box>
                            <CustomChip
                                rounded
                                size='small'
                                skin='light'
                                label={`${ticket?.station} - ${ticket?.locationArea}`}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Box>
                    </Tooltip>
                    <Tooltip title='Urgency' placement='top'>
                        <Box>
                            <CustomChip
                                rounded
                                size='small'
                                skin='light'
                                color={urgencyColorSelector[ticket?.urgency]}
                                label={ticket?.urgency}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Box>
                    </Tooltip>
                    <Tooltip title='Status' placement='top'>
                        <Box>
                            <CustomChip
                                rounded
                                size='small'
                                skin='light'
                                color={statusColorSelector[ticket?.status]}
                                label={ticket?.status}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Box>
                    </Tooltip>
                </Box>
                <Box
                    sx={{
                        gap: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <CustomChip
                        rounded
                        size='small'
                        skin='light'
                        sx={{ height: 60 }}
                        label={
                            <>
                                <Typography sx={{ fontWeight: 500 }}>Contact</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{ticket?.contact}</Typography>
                            </>
                        }
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default TicketTile