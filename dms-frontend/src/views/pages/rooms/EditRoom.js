import { useRoom } from 'src/hooks';
import RoomForm from './RoomForm';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

function EditRoom({ roomId }) {
    const { rooms, updateRoom } = useRoom();
    const [room, setRoom] = useState();

    useEffect(() => {
        setRoom(rooms.filter((room) => room?.id == roomId)[0]);
    }, [])

    if (!room) {
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
        <RoomForm
            title="Edit a Room"
            onFormSubmit={updateRoom}
            room={room}
            successMessage="Room updated successfully!"
        />
    )
}

export default EditRoom