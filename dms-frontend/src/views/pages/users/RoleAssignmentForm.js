// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const roles = [
    { id: 'mechanic', name: 'Mechanic' },
    { id: 'driver', name: 'Driver' },
    { id: 'chief', name: 'Chief' }
]

const schema = yup.object().shape({
    role: yup.string().required()
});

const RoleAssignmentForm = ({ title, onFormSubmit, user, successMessage }) => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            role: user?.role || '',
        }
    })

    const onSubmit = async data => {
        try {
            const params = { ...user, role: data?.role };

            await onFormSubmit(params);
            router.push('/users');
            toast.success(successMessage);
        } catch (err) {
            toast.error("Unable to proceed!");
        }
    }

    const handleCancel = () => {
        router.push('/users');
    }

    return (
        <Card>
            <CardHeader title={title} />
            <Divider sx={{ m: '0 !important' }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='role'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Role'
                                    value={value}
                                    defaultValue=''
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.role)}
                                    {...(errors.role && { helperText: errors.role.message })}
                                >
                                    {roles?.map((role) =>
                                        <MenuItem key={`role#${role?.id}`} value={role?.id}>{role?.name}</MenuItem>
                                    )}
                                </CustomTextField>
                            )}
                        />
                    </Grid>
                </CardContent>
                <Divider sx={{ m: '0 !important' }} />
                <CardActions>
                    <Button type='submit' sx={{ mr: 2 }} variant='contained'>
                        Submit
                    </Button>
                    <Button type='reset' color='secondary' variant='tonal' onClick={handleCancel}>
                        Cancel
                    </Button>
                </CardActions>
            </form>
        </Card >
    )
}

export default RoleAssignmentForm
