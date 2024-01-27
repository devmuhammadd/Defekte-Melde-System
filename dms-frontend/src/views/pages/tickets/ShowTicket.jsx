import { Box, Card, CardContent, CardMedia, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Icon from 'src/@core/components/icon';
import CustomTextField from 'src/@core/components/mui/text-field';
import { useComment, useTicket } from 'src/hooks';
import { useAuth } from 'src/hooks/useAuth';
import { ticketCreateRoles } from 'src/utils/roleUtils';

function ShowTicket({ ticketId }) {
  const router = useRouter();
  const { user } = useAuth();
  const { tickets } = useTicket();
  const { comments, getComments, createComment } = useComment();
  const [ticket, setTicket] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    if (!ticketCreateRoles.includes(user?.role)) router.push('/');
  }, []);

  useEffect(() => {
    setTicket(tickets.filter((ticket) => ticket?.id == ticketId)[0]);
    getComments(ticketId);
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const handleAddComment = async () => {
    try {
      await createComment(ticketId, { message: comment });
      setComment('');
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Unable to proceed!");
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
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
            <Grid xs={12} md={6}>
              <Card>
                <CardContent>
                  <Stack direction='row' alignItems='center'>
                    <CustomTextField
                      fullWidth
                      autoComplete="off"
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Leave a comment..."
                    />
                    <IconButton onClick={handleAddComment}>
                      <Icon icon='material-symbols-light:send' fontSize={32} color='#544ee6' />
                    </IconButton>
                  </Stack>
                  <Box sx={{ marginTop: '16px', height: '430px', overflow: 'auto' }}>
                    {comments.map((comment) => (
                      <Box sx={{ backgroundColor: '#544ee6', padding: '10px', marginTop: '10px', borderRadius: '10px', width: 'fit-content' }}>
                        <Typography variant='body1' color='white'>{comment.message}</Typography>
                        <Typography variant='body2' color='white' textAlign='end'>{comment.user} | {comment.createdAt}</Typography>
                      </Box>
                    ))}
                  </Box>
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