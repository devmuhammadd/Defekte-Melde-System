// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useStation } from 'src/hooks'
import { useEffect } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import StationsTable from './StationsTable'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const router = useRouter();
    const { stations, loading, deleteStation, getStations } = useStation();

    useEffect(() => {
        getStations();
    }, []);

    const handleNewStationClick = () => {
        router.push('/stations?newStation=true');
    }

    const handleDeleteStation = async (station) => {
        const response = confirm(`Are you sure you want to delete the ${station?.name} station?`)
        if (response) {
            try {
                await deleteStation(station?.id);
                toast.success("Station deleted successfully!");
            } catch (err) {
                toast.error("Unable to delete a station!");
            }
        }
    }

    const handleEditStation = (stationId) => {
        router.push(`/stations?stationId=${stationId}`);
    }

    if (loading || !stations) {
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
                    onClick={handleNewStationClick}
                >
                    New Station
                </Button>
            </Grid>
            <Grid item xs={12}>
                <StationsTable
                    stations={stations}
                    handleDeleteStation={handleDeleteStation}
                    handleEditStation={handleEditStation}
                />
            </Grid>
        </Grid >
    )
}

export default Dashboard
