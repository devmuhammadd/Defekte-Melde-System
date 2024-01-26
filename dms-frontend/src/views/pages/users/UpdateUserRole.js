import { useUser } from 'src/hooks';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import RoleAssignmentForm from './RoleAssignmentForm';
import { useAuth } from 'src/hooks/useAuth';

function UpdateUserRole({ userId }) {
    const auth = useAuth();
    const { users, updateUser } = useUser();
    const [user, setUser] = useState();

    useEffect(() => {
        setUser(users.filter((user) => user?.id == userId)[0]);
    }, [])

    if (!user) {
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
        <RoleAssignmentForm
            title={`Update User Role - ${user?.fullName}`}
            onFormSubmit={updateUser}
            user={user}
            successMessage="Role assigned successfully!"
            organizationId={auth?.user?.organizationId}
        />
    )
}

export default UpdateUserRole