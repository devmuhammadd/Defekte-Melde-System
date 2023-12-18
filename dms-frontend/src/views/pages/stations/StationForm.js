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
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { useUser } from 'src/hooks';

const schema = yup.object().shape({
    name: yup.string().required(),
    chiefId: yup.string().required(),
});

const StationForm = ({ title, onFormSubmit, station, successMessage }) => {
    const router = useRouter();
    const { users, getUsers } = useUser();
    const { user } = useAuth();
    const [organizationUsers, setOrganizationUsers] = useState();

    useEffect(() => {
        getUsers(user?.organizationId);
        setOrganizationUsers(users.filter(u => u?.id !== user?.id));
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            name: station?.name || '',
            chiefId: station?.chiefId || '',
        }
    })

    const onSubmit = async data => {
        try {
            const params = data;

            if (station) params['id'] = station?.id;
            else params['organizationId'] = user?.organizationId;

            await onFormSubmit(params);
            router.push('/stations');
            toast.success(successMessage);
        } catch (err) {
            toast.error("Unable to proceed!");
        }
    }

    const handleCancel = () => {
        router.push('/stations');
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
                                name='chiefId'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Chief'
                                        value={value}
                                        defaultValue=''
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.chiefId)}
                                        {...(errors.chiefId && { helperText: errors.chiefId.message })}
                                    >
                                        {organizationUsers?.map((user) =>
                                            <MenuItem key={`user#${user?.id}`} value={user?.id}>{user?.fullName}</MenuItem>
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

export default StationForm
