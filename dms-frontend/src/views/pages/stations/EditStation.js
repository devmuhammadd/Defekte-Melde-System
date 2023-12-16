import { useStation, useStation } from 'src/hooks';
import StationForm from './StationForm';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

function EditStation({ stationId }) {
    const { stations, updateStation } = useStation();
    const [station, setStation] = useState();

    useEffect(() => {
        setStation(stations.filter((station) => station?.id == stationId)[0]);
    }, [])

    if (!station) {
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
        <StationForm
            title="Edit a Station"
            onFormSubmit={updateStation}
            station={station}
            successMessage="Station updated successfully!"
        />
    )
}

export default EditStation