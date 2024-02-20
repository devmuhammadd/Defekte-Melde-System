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

import useBgColor from 'src/@core/hooks/useBgColor'
import toast from 'react-hot-toast'
import { useService } from 'src/hooks'
import { useState } from 'react'
import { resetPasswordByAdminApi } from 'src/repository/UsersRepository'
import { LoadingButton } from '@mui/lab'

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

const ResetPasswordModal = ({ show, setShow, username }) => {
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    setShow(false);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await resetPasswordByAdminApi({
        username: username,
        password
      });
      toast.success('Password updated successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to proceed!");
    }
    setLoading(false);
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
              Reset User Password
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ margin: 'auto' }}>
              <CustomTextField
                type="password"
                fullWidth
                autoComplete="off"
                label='Password'
                value={password}
                onChange={handlePasswordChange}
              />
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
          <LoadingButton loading={loading} variant='contained' sx={{ mr: 1 }} onClick={handleSubmit}>
            Submit
          </LoadingButton>
          <Button variant='tonal' color='secondary' onClick={handleModalClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ResetPasswordModal;
