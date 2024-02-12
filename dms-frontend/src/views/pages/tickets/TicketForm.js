// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Radio, RadioGroup, FormControlLabel, Typography, TextField } from '@mui/material';
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
import { getStationData } from 'src/repository/TicketsRepository'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { ticketCreateRoles } from 'src/utils/roleUtils';
import { useStation, useTicket } from 'src/hooks';
import { LoadingButton } from '@mui/lab';

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    contact: yup.string().required(),
    urgency: yup.string().required(),
    stationId: yup.string().required(),
    location: yup.string().required(),
    locationId: yup.string().required(),
});

const TicketForm = ({ title, onFormSubmit, ticket, successMessage }) => {
    const router = useRouter();
    // ** States
    const { user } = useAuth();
    const [selectedLocation, setSelectedLocation] = useState(ticket?.location || 'Room');
    const [stationData, setStationData] = useState('');
    const [selectedStation, setSelectedStation] = useState(ticket?.stationId || '');
    const { stations, getStations } = useStation();
    const { loading } = useTicket();
    const [media, setMedia] = useState();

    useEffect(() => {
        if (!ticketCreateRoles.includes(user?.role)) router.push('/');
    }, []);

    useEffect(() => {
        getStations();

        if (ticket) {
            handleStationChange(ticket?.stationId);
        }
    }, [])

    const handleStationChange = (id) => {
        setSelectedStation(id);
        getStationData(id)
            .then((res) => {
                setStationData(res?.data);
            })
    }

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
            urgency: ticket?.urgency || '',
            stationId: ticket?.stationId || '',
            location: ticket?.location || 'Room',
            locationId: ticket?.locationId || '',
        }
    })

    const onSubmit = async data => {
        try {
            if (media && media.size > 10 * 1024 * 1024) { // Check if media size is greater than 10 MB
                toast.error("Media size should be less than 10MB!");
                return;
            }

            debugger;
            const params = new FormData();
            Object.keys(data).forEach(key => {
                params.append(key, data[key]);
            });

            if (ticket) {
                params.append('id', ticket?.id);
                params.append('userId', ticket?.userId);
                params.append('status', ticket?.status);
                params.append('isDeleted', ticket?.isDeleted);
            } else {
                params.append('userId', user?.id);
                params.append('status', 'Opened');
                params.append('isDeleted', false);
            }

            if (media) {
                params.append('mediaFile', media);
            }

            await onFormSubmit(params);
            router.push('/tickets');
            toast.success(successMessage);
        } catch (err) {
            toast.error(err?.response?.data?.detail || "Unable to proceed!");
        }
    }

    const handleCancel = () => {
        router.push('/tickets');
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
                                        onChange={(e) => {
                                            handleStationChange(e.target.value);
                                            onChange(e);
                                        }}
                                        error={Boolean(errors.stationId)}
                                        {...(errors.stationId && { helperText: errors.stationId.message })}
                                    >
                                        {stations?.map((station) =>
                                            <MenuItem key={`item#${station?.id}`} value={station?.id}>{station?.name}</MenuItem>
                                        )}
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                        {selectedStation &&
                            <>
                                <Grid item xs={12} sm={6}>
                                    <Typography>Location</Typography>
                                    <Controller
                                        name='location'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange, onBlur } }) => (
                                            <RadioGroup row name='location' value={value}
                                                onChange={(e) => {
                                                    setSelectedLocation(e.target.value);
                                                    onChange(e);
                                                }}
                                            >
                                                <FormControlLabel value='Room' control={<Radio />} label='Room' />
                                                <FormControlLabel value='Vehicle' control={<Radio />} label='Vehicle' />
                                            </RadioGroup>
                                        )}
                                    />
                                </Grid>
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
                                                {stationData[`${selectedLocation.toLowerCase()}s`]?.map((item) =>
                                                    <MenuItem key={`item#${item?.id}`} value={item?.id}>{item?.name}</MenuItem>
                                                )}
                                            </CustomTextField>
                                        )}
                                    />
                                </Grid>
                            </>}
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                id="fileInput"
                                type="file"
                                label="Media"
                                fullWidth
                                InputProps={{ inputProps: { accept: "image/*, video/*" } }}
                                onChange={(event) => {
                                    setMedia(event.target.files[0]);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='description'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        multiline
                                        minRows={8}
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
                    </Grid>
                </CardContent>
                <Divider sx={{ m: '0 !important' }} />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <LoadingButton type='submit' sx={{ mar: 2 }} variant='contained' loading={loading}>
                        Submit
                    </LoadingButton>
                    <Button type='reset' color='secondary' variant='tonal' onClick={handleCancel}>
                        Cancel
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default TicketForm
