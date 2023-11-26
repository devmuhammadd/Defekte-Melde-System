// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

import { statusBarCalculator, statusColorSelector, urgencyColorSelector } from 'src/utils/ticketUtils';
import { useTicket } from 'src/hooks'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Tickets = ({ tickets }) => {
    const { deleteTicket } = useTicket();
    const router = useRouter();

    const handleDelete = async (ticket) => {
        const response = confirm(`Are you sure you want to delete the ${ticket?.title} ticket?`)
        if (response) {
            try {
                await deleteTicket(ticket?.id);
                toast.success("Ticket deleted successfully!");
            } catch (err) {
                toast.error("Unable to delete a ticket!");
            }
        }
    }

    const handleEditTicket = (ticketId) => {
        router.push(`/dms?ticketId=${ticketId}`);
    }

    return (
        <Grid container spacing={6}>
            {tickets &&
                Array.isArray(tickets) &&
                tickets.map((ticket, index) => {
                    return (
                        <Grid key={index} item xs={12} md={6}>
                            <Card>
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
                                            {ticket?.reporter}
                                        </Typography>
                                    }
                                    action={
                                        <OptionsMenu
                                            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                                            options={[
                                                { text: 'Edit Ticket', menuItemProps: { onClick: () => handleEditTicket(ticket?.id) } },
                                                { divider: true, dividerProps: { sx: { my: theme => `${theme.spacing(2)} !important` } } },
                                                { text: 'Delete Ticket', menuItemProps: { sx: { color: 'error.main' }, onClick: () => handleDelete(ticket) } }
                                            ]}
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
                                                    label={`${ticket?.location} (${ticket?.locationArea})`}
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
                                    <Tooltip title={ticket?.status} arrow>
                                        <LinearProgress
                                            color='primary'
                                            variant='determinate'
                                            sx={{ mb: 6, height: 10, cursor: 'pointer' }}
                                            value={statusBarCalculator[ticket?.status]}
                                        />
                                    </Tooltip>
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
                                        <CustomChip
                                            rounded
                                            size='small'
                                            skin='light'
                                            sx={{ height: 60 }}
                                            label={
                                                <>
                                                    <Typography sx={{ fontWeight: 500 }}>Creator</Typography>
                                                    <Typography sx={{ color: 'text.secondary' }}>{ticket?.user}</Typography>
                                                </>
                                            }
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
        </Grid >
    )
}

export default Tickets
