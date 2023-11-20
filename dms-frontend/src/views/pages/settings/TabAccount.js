// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'src/utils/axios'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required(),
    fullName: yup.string().required(),
})

const TabAccount = () => {
    const { user, setUser } = useAuth();

    const defaultValues = {
        fullName: user?.fullName,
        username: user?.username,
        email: user?.email
    }
    // ** Hooks
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({ defaultValues, resolver: yupResolver(schema) })

    const onFormSubmit = (data) => {
        axios.put('/profile', data)
            .then((res) => {
                setUser({ ...res?.data, role: 'user' });
                toast.success('Account details updated!');
            })
            .catch((err) => {
                toast.error(err?.data?.detail);
            });
    }

    return (
        <Grid container spacing={6}>
            {/* Account Details Card */}
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Profile Details' />
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='fullName'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <CustomTextField
                                                fullWidth
                                                label='Full Name'
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Full Name'
                                                error={Boolean(errors.fullName)}
                                                {...(errors.fullName && { helperText: errors.fullName.message })}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='username'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <CustomTextField
                                                fullWidth
                                                label='Username'
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Username'
                                                error={Boolean(errors.username)}
                                                {...(errors.username && { helperText: errors.username.message })}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name='email'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <CustomTextField
                                                fullWidth
                                                label='Email'
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Email'
                                                error={Boolean(errors.email)}
                                                {...(errors.email && { helperText: errors.email.message })}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                                    <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                                        Save Changes
                                    </Button>
                                    <Button type='reset' variant='tonal' color='secondary' onClick={() => reset()}>
                                        Reset
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabAccount
