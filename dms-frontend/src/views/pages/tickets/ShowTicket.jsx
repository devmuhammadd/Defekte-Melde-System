import { Card, CardContent, CardMedia, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTicket } from 'src/hooks';
import { useAuth } from 'src/hooks/useAuth';

function ShowTicket({ ticketId }) {
  const { user } = useAuth();
  const { tickets } = useTicket();
  const [ticket, setTicket] = useState();

  useEffect(() => {
    setTicket(tickets.filter((ticket) => ticket?.id == ticketId)[0]);
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Grid xs={12} md={6}>
              <Card>
                {ticket?.image &&
                  <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/glass-house.png' />
                }
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Title</strong></TableCell>
                          <TableCell>{ticket?.title}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Location</strong></TableCell>
                          <TableCell>{ticket?.location}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Urgency</strong></TableCell>
                          <TableCell>{ticket?.urgency}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell>{ticket?.status}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Reporter</strong></TableCell>
                          <TableCell>{ticket?.userId === user?.id ? 'You' : ticket?.user}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Mechanic</strong></TableCell>
                          <TableCell>{ticket?.mechanic}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Description</strong></TableCell>
                          <TableCell>{ticket?.description}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={5}>
              <Card>
                <CardContent>
                  <Typography variant='h5'>Comments</Typography>
                </CardContent>
              </Card>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ShowTicket