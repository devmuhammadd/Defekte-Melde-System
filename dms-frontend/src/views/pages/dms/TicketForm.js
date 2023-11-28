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
import { getNewTicketData } from 'src/repository/TicketsRepository'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    contact: yup.string().required(),
    status: yup.string().required(),
    urgency: yup.string().required(),
    reporterId: yup.string().required(),
    location: yup.string().required(),
    locationId: yup.string().required()
});

const TicketForm = ({ title, onFormSubmit, ticket, successMessage }) => {
    const router = useRouter();
    // ** States
    const [data, setData] = useState([]);
    const { user } = useAuth();
    const [selectedLocation, setSelectedLocation] = useState(ticket?.location || '');

    const handleLocationChange = (value) => {
        setSelectedLocation(value);
    };

    useEffect(() => {
        getNewTicketData()
            .then((res) => {
                setData(res?.data);
            })
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            title: ticket?.title || '',
            description: ticket?.description || '',
            contact: ticket?.contact || '',
            status: ticket?.status || '',
            urgency: ticket?.urgency || '',
            reporterId: ticket?.reporterId || '',
            location: ticket?.location || '',
            locationId: ticket?.locationAreaId || '',
        }
    })

    const onSubmit = async data => {
        try {
            const params = data;
            params['userId'] = user?.id;
            if (ticket) params['id'] = ticket?.id;
            await onFormSubmit(params);
            router.push('/dms');
            toast.success(successMessage);
        } catch (err) {
            toast.error("Unable to proceed!");
        }
    }

    const handleCancel = () => {
        router.push('/dms');
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
                                name='title'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        autoComplete="off"
                                        label='Title'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.title)}
                                        {...(errors.title && { helperText: errors.title.message })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='description'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        autoComplete="off"
                                        label='Description'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.description)}
                                        {...(errors.description && { helperText: errors.description.message })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='contact'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        autoComplete="off"
                                        label='Contact'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.contact)}
                                        {...(errors.contact && { helperText: errors.contact.message })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='status'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Status'
                                        value={value}
                                        defaultValue=''
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.status)}
                                        {...(errors.status && { helperText: errors.status.message })}
                                    >
                                        <MenuItem value='Opened'>Opened</MenuItem>
                                        <MenuItem value='In-progress'>In-progress</MenuItem>
                                        <MenuItem value='Completed'>Completed</MenuItem>
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='urgency'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Urgency'
                                        value={value}
                                        defaultValue=''
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.urgency)}
                                        {...(errors.urgency && { helperText: errors.urgency.message })}
                                    >
                                        <MenuItem value='Low'>Low</MenuItem>
                                        <MenuItem value='Medium'>Medium</MenuItem>
                                        <MenuItem value='High'>High</MenuItem>
                                        <MenuItem value='Critical'>Critical</MenuItem>
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='reporterId'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Reporter'
                                        value={value}
                                        defaultValue=''
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.reporterId)}
                                        {...(errors.reporterId && { helperText: errors.reporterId.message })}
                                    >
                                        {data?.reporters?.map((reporter) =>
                                            <MenuItem key={`reporter#${reporter?.id}`} value={reporter?.id}>{reporter?.name}</MenuItem>
                                        )}
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='location'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Location'
                                        value={value}
                                        defaultValue=''
                                        onBlur={onBlur}
                                        onChange={(e) => {
                                            onChange(e);
                                            handleLocationChange(e?.target?.value);
                                        }}
                                        error={Boolean(errors.location)}
                                        {...(errors.location && { helperText: errors.location.message })}
                                    >
                                        <MenuItem value='Station'>Station</MenuItem>
                                        <MenuItem value='Room'>Room</MenuItem>
                                        <MenuItem value='Vehicle'>Vehicle</MenuItem>
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                        {(selectedLocation || ticket) &&
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name='locationId'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <CustomTextField
                                            select
                                            fullWidth
                                            label={selectedLocation}
                                            value={value}
                                            defaultValue=''
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.locationId)}
                                            {...(errors.locationId && { helperText: errors.locationId.message })}
                                        >
                                            {data[`${selectedLocation.toLowerCase()}s`]?.map((item) =>
                                                <MenuItem key={`item#${item?.id}`} value={item?.id}>{item?.name}</MenuItem>
                                            )}
                                        </CustomTextField>
                                    )}
                                />
                            </Grid>}
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

export default TicketForm
