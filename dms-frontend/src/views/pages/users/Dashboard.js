// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useUser } from 'src/hooks'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import UsersTable from './UsersTable'

const Dashboard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { loading, users, getUsers } = useUser();
    const [organizationUsers, setOrganizationUsers] = useState();

    useEffect(() => {
        if (user?.role !== 'admin') router.push('/');
        getUsers(user?.organizationId);
        setOrganizationUsers(users.filter(u => u?.id !== user?.id));
    }, []);

    const handleEditUser = (userId) => {
        router.push(`/users?userId=${userId}`);
    }

    if (loading || user?.role !== 'admin') {
        return (
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <CircularProgress sx={{ my: 4 }} />
                    <Typography>Loading...</Typography>
                </Box>
            </Grid>
        )
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UsersTable
                    users={organizationUsers}
                    handleEditUser={handleEditUser}
                />
            </Grid>
        </Grid >
    )
}

export default Dashboard
