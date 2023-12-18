// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { createOrganizationApi } from 'src/repository/OrganizationsRepository';
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const schema = yup.object().shape({
    name: yup.string().required(),
    cityName: yup.string().required(),
    postalCode: yup.string().required(),
});

const AddOrganizationForm = ({ setOrganization }) => {
    const { user, setUser } = useAuth();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            cityName: '',
            postalCode: '',
        }
    })

    const onSubmit = async data => {
        try {
            const params = data;
            createOrganizationApi(params).then((res) => {
                if (res?.data?.orgExist) {
                    setOrganization(res?.data?.organization);
                    setUser({ ...user, organization: res?.data?.organization?.name });
                } else {
                    setUser({ ...user, organization: res?.data?.organization, role: res?.data?.role });
                }
                router.push('/');
            })
        } catch (err) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <Card sx={{ width: '50%', marginX: 'auto' }}>
            <CardHeader title="Add Your Organization" />
            <Divider sx={{ m: '0 !important' }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
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
                                name='cityName'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        autoComplete="off"
                                        label='City Name'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.cityName)}
                                        {...(errors.cityName && { helperText: errors.cityName.message })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='postalCode'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        autoComplete="off"
                                        label='Postal Code'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.postalCode)}
                                        {...(errors.postalCode && { helperText: errors.postalCode.message })}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button type='submit' sx={{ width: '50%', marginX: 'auto' }} variant='contained'>
                        Submit
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default AddOrganizationForm
