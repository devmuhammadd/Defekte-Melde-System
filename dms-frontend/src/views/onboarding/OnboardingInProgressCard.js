// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Divider } from '@mui/material'

const OnboardingInProgressCard = ({ organization }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user?.role !== 'member') {
            router.push('/');
        }
    }, [])

    return (
        <Card sx={{ width: '50%', marginX: 'auto' }}>
            <CardContent
                sx={{
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
                }}
            >
                <CustomAvatar skin='light' sx={{ width: 50, height: 50, mb: 2.25 }}>
                    <Icon icon='mdi:timer-outline' fontSize='2rem' />
                </CustomAvatar>
                <Typography variant='h4' sx={{ mb: 2.75 }}>
                    Congratulations!
                </Typography>
                <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                    You have successfully registered your account in {organization?.name}. Your onboarding is in progress. You can access the dashboard as soon as the admin assigns you a role!
                </Typography>
                <Divider sx={{ m: '0 !important' }} />
                <Typography sx={{ mb: 6, color: 'text.secondary', fontWeight: 'bold' }}>
                    Note: Reload the page to check if the admin has assigned you a role!
                </Typography>
            </CardContent>
        </Card>
    )
}

export default OnboardingInProgressCard
