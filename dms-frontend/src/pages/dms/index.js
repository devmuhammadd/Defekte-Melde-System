// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardStatisticsSquare from 'src/views/pages/dms/CardStatisticsSquare'
import { useTicket } from 'src/hooks'
import { useEffect } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import Tickets from 'src/views/pages/dms/Tickets'
import { calculateTicketStats } from 'src/utils/ticketUtils'
import Icon from 'src/@core/components/icon'

const Home = () => {
  const { tickets, ticketStats, loading, loadDmsData } = useTicket();

  useEffect(() => {
    loadDmsData();
  }, []);

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
      <Grid item xs={12}>
        <CardStatisticsSquare data={calculateTicketStats(ticketStats)} />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' color='success' endIcon={<Icon icon='ic:baseline-plus' />}>
          New Ticket
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Tickets tickets={tickets} />
      </Grid>
    </Grid >
  )
}

export default Home
