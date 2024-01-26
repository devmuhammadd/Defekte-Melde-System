// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'

import CustomTextField from 'src/@core/components/mui/text-field'

import Icon from 'src/@core/components/icon'

import toast from 'react-hot-toast'
import { useTicket } from 'src/hooks'
import { getMechanicsApi } from 'src/repository/UsersRepository'
import { MenuItem } from '@mui/material'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const AssignMechanicModal = ({ ticket, show, setShow }) => {
  const [selectedMechanic, setSelectedMechanic] = useState();
  const [mechanics, setMechanics] = useState();
  const { updateTicket } = useTicket();

  useEffect(() => {
    if (!ticket) return;

    getMechanicsApi(ticket?.stationId).then((res) => {
      setMechanics(res?.data);
    });
  }, []);

  const handleMechanicChange = (event) => {
    setSelectedMechanic(event?.target?.value);
  }

  const handleModalClose = () => {
    setShow(false);
  }

  const handleSubmit = async () => {
    try {
      await updateTicket({
        ...ticket,
        mechanicId: selectedMechanic,
      });
      toast.success('Mechanic assigned successfully!');
    } catch (err) {
      completeLoading();
      toast.error(err?.response?.data?.message || "Unable to proceed!");
    }
    handleModalClose();
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={handleModalClose}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={handleModalClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Assign Mechanic
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Mechanic'
                value={selectedMechanic}
                defaultValue=''
                onChange={handleMechanicChange}
              >
                {mechanics?.map((mechanic) =>
                  <MenuItem key={`item#${mechanic?.id}`} value={mechanic?.id}>{mechanic?.fullName}</MenuItem>
                )}
              </CustomTextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleModalClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default AssignMechanicModal;
