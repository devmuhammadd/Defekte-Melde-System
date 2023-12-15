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
import { getOrganizationByNameApi } from 'src/repository/OrganizationRepository';
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const schema = yup.object().shape({
    name: yup.string().required(),
});

const OrganizationNameForm = ({ setOrganization }) => {
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
            name: ''
        }
    })

    const onSubmit = async data => {
        try {
            const params = data;
            getOrganizationByNameApi(params?.name).then((res) => {
                if (res?.data?.id) {
                    setUser({ ...user, organization: res?.data?.name });
                    router.push('/');
                }
                setOrganization(res?.data);
            })
        } catch (err) {
            toast.error("Unable to fetch organization!");
        }
    }

    return (
        <Card sx={{ width: '50%', marginX: 'auto' }}>
            <CardHeader title="Join the Organization" />
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
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button type='submit' sx={{ width: '50%', marginX: 'auto' }} variant='contained'>
                        Submit
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default OrganizationNameForm
