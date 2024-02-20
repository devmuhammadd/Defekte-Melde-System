// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useUser } from 'src/hooks'
import { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import UsersTable from './UsersTable'
import ResetPasswordModal from './ResetPasswordModal'

const Dashboard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { loading, users, getUsers } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [organizationUsers, setOrganizationUsers] = useState();
    const [ResetPasswordUsername, setResetPasswordUsername] = useState();

    useEffect(() => {
        getUsers(user?.organizationId);
    }, []);

    useEffect(() => {
        setOrganizationUsers(users.filter(u => u?.id !== user?.id));
    }, [users]);


    const handleEditUser = (userId) => {
        router.push(`/users?userId=${userId}`);
    }

    const handleResetPassword = (username) => {
        setResetPasswordUsername(username);
        setOpenModal(true);
    }

    if (loading) {
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
                    handleResetPassword={handleResetPassword}
                />
            </Grid>
            <ResetPasswordModal show={openModal} setShow={setOpenModal} username={ResetPasswordUsername} />
        </Grid >
    )
}

export default Dashboard
