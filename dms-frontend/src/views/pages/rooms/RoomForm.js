// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
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
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { useStation, useUser } from 'src/hooks';
import { chiefRoles } from 'src/utils/roleUtils'

const schema = yup.object().shape({
    name: yup.string().required(),
    stationId: yup.string().required(),
});

const RoomForm = ({ title, onFormSubmit, room, successMessage }) => {
    const router = useRouter();
    const { stations, getStations } = useStation();
    const { user } = useAuth();

    useEffect(() => {
        if (!chiefRoles.includes(user?.role)) router.push('/');
    }, []);

    useEffect(() => {
        getStations();
    }, []);

    const calculateStationId = () => user?.role === 'Chief' ? user?.stationId : room?.stationId;

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            name: room?.name || '',
            stationId: calculateStationId() || '',
        }
    })

    const onSubmit = async data => {
        try {
            const params = data;
            if (room) params['id'] = room?.id;
            await onFormSubmit(params);
            router.push('/rooms');
            toast.success(successMessage);
        } catch (err) {
            toast.error("Unable to proceed!");
        }
    }

    const handleCancel = () => {
        router.push('/rooms');
    }

    return (
        <Card>
            <CardHeader title={title} />
            <Divider sx={{ m: '0 !important' }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='name'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        autoComplete="off"
                                        label='Name'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.name)}
                                        {...(errors.name && { helperText: errors.name.message })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='stationId'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Station'
                                        value={value}
                                        defaultValue=''
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.stationId)}
                                        {...(errors.stationId && { helperText: errors.stationId.message })}
                                    >
                                        {stations?.map((station) =>
                                            <MenuItem key={`station#${station?.id}`} value={station?.id}>{station?.name}</MenuItem>
                                        )}
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
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
        </Card>
    )
}

export default RoomForm
