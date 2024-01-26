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
import toast from 'react-hot-toast'
import { getAvailableStations } from 'src/repository/OrganizationsRepository'
import { adminRoles } from 'src/utils/roleUtils'
import { useAuth } from 'src/hooks/useAuth'
import { useStation } from 'src/hooks'

const schema = yup.object().shape({
    role: yup.string().required(),
    stationId: yup.string()
});

const roles = ['Public Administrator', 'Chief Mechanic', 'Chief', 'Mechanic', 'Reporter']

const RoleAssignmentForm = (props) => {
    const { title, onFormSubmit, user, successMessage, organizationId } = props;
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState();
    const auth = useAuth();
    const { stations, getStations } = useStation();

    useEffect(() => {
        if (!adminRoles.includes(auth?.user?.role)) router.push('/');
    }, []);

    useEffect(() => {
        getStations();
    }, []);

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    }

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            role: user?.role || '',
            stationId: user?.stationId || ''
        }
    })

    const onSubmit = async data => {
        try {
            if (!['Public Administrator', 'Chief Mechanic'].includes(selectedRole) && !data?.stationId) {
                toast.error('Please select station!');
                return;
            }
            const params = { ...user, role: data?.role, stationId: data?.stationId };

            await onFormSubmit(params);
            router.push('/users');
            toast.success(successMessage);
        } catch (err) {
            toast.error(err?.response?.data?.detail || 'Unable to proceed!');
        }
    }

    const handleCancel = () => {
        router.push('/users');
    }

    const showStationField = () => {
        return selectedRole && !['Public Administrator', 'Chief Mechanic'].includes(selectedRole)
    }

    return (
        <Card>
            <CardHeader title={title} />
            <Divider sx={{ m: '0 !important' }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Grid container spacing={6}>
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
                                        onChange={(e) => {
                                            handleRoleChange(e.target.value);
                                            onChange(e);
                                        }}
                                        error={Boolean(errors.role)}
                                        {...(errors.role && { helperText: errors.role.message })}
                                    >
                                        {roles?.map((role) =>
                                            <MenuItem key={`role#${role}`} value={role}>{role}</MenuItem>
                                        )}
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                        {showStationField() &&
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
                        }
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
