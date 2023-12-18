// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useRoom } from 'src/hooks'
import { useEffect } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import RoomsTable from './RoomsTable'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

const Dashboard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { rooms, loading, deleteRoom, getRooms } = useRoom();

    useEffect(() => {
        if (user?.role !== 'admin') router.push('/');
        getRooms(user?.organizationId);
    }, []);

    const handleNewRoomClick = () => {
        router.push('/rooms?newRoom=true');
    }

    const handleDeleteRoom = async (room) => {
        const response = confirm(`Are you sure you want to delete the ${room?.name} room?`)
        if (response) {
            try {
                await deleteRoom(room?.id);
                toast.success("Room deleted successfully!");
            } catch (err) {
                toast.error("Unable to delete a room!");
            }
        }
    }

    const handleEditRoom = (roomId) => {
        router.push(`/rooms?roomId=${roomId}`);
    }

    if (loading || user?.role !== 'admin') {
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' color='primary'
                    endIcon={<Icon icon='ic:baseline-plus' />}
                    onClick={handleNewRoomClick}
                >
                    New Room
                </Button>
            </Grid>
            <Grid item xs={12}>
                <RoomsTable
                    rooms={rooms}
                    handleDeleteRoom={handleDeleteRoom}
                    handleEditRoom={handleEditRoom}
                />
            </Grid>
        </Grid >
    )
}

export default Dashboard
