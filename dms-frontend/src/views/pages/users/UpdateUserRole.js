import { useUser } from 'src/hooks';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import RoleAssignmentForm from './RoleAssignmentForm';

function UpdateUserRole({ userId }) {
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
            title={`Assign User Role - ${user?.fullName}`}
            onFormSubmit={updateUser}
            user={user}
            successMessage="Role assigned successfully!"
        />
    )
}

export default UpdateUserRole