import { useVehicle } from 'src/hooks';
import VehicleForm from './VehicleForm';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

function EditVehicle({ vehicleId }) {
    const { vehicles, updateVehicle } = useVehicle();
    const [vehicle, setVehicle] = useState();

    useEffect(() => {
        setVehicle(vehicles.filter((vehicle) => vehicle?.id == vehicleId)[0]);
    }, [])

    if (!vehicle) {
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
        <VehicleForm
            title="Edit a Vehicle"
            onFormSubmit={updateVehicle}
            vehicle={vehicle}
            successMessage="Vehicle updated successfully!"
        />
    )
}

export default EditVehicle