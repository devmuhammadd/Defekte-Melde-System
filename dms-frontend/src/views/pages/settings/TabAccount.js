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

const TabAccount = () => {
    // ** Hooks
    const { user } = useAuth();
    const {
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { checkbox: false } })

    const initialData = {
        fullName: user?.fullName,
        username: user?.username,
        email: user?.email
    }
    // ** State
    const [formData, setFormData] = useState(initialData);

    const handleFormChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <Grid container spacing={6}>
            {/* Account Details Card */}
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Profile Details' />
                    <form>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        fullWidth
                                        label='Full Name'
                                        placeholder='John Doe'
                                        value={formData.fullName}
                                        onChange={e => handleFormChange('fullName', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        fullWidth
                                        label='Username'
                                        placeholder='john'
                                        value={formData.username}
                                        onChange={e => handleFormChange('username', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomTextField
                                        fullWidth
                                        type='email'
                                        label='Email'
                                        value={formData.email}
                                        placeholder='john.doe@example.com'
                                        onChange={e => handleFormChange('email', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                                    <Button variant='contained' sx={{ mr: 4 }}>
                                        Save Changes
                                    </Button>
                                    <Button type='reset' variant='tonal' color='secondary' onClick={() => setFormData(initialData)}>
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
