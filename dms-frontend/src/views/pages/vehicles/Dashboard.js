// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useVehicle } from 'src/hooks'
import { useEffect } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import VehiclesTable from './VehiclesTable'
import toast from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'

const Dashboard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { vehicles, loading, deleteVehicle, getVehicles } = useVehicle();

    useEffect(() => {
        getVehicles(user?.organizationId);
    }, []);

    const handleNewVehicleClick = () => {
        router.push('/vehicles?newVehicle=true');
    }

    const handleDeleteVehicle = async (vehicle) => {
        const response = confirm(`Are you sure you want to delete the ${vehicle?.name} vehicle?`)
        if (response) {
            try {
                await deleteVehicle(vehicle?.id);
                toast.success("Vehicle deleted successfully!");
            } catch (err) {
                toast.error("Unable to delete a vehicle!");
            }
        }
    }

    const handleEditVehicle = (vehicleId) => {
        router.push(`/vehicles?vehicleId=${vehicleId}`);
    }

    if (loading) {
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
                    onClick={handleNewVehicleClick}
                >
                    New Vehicle
                </Button>
            </Grid>
            <Grid item xs={12}>
                <VehiclesTable
                    vehicles={vehicles}
                    handleDeleteVehicle={handleDeleteVehicle}
                    handleEditVehicle={handleEditVehicle}
                />
            </Grid>
        </Grid >
    )
}

export default Dashboard
