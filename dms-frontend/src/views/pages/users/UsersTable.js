// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Icon } from '@iconify/react'
import { Tooltip } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { adminRoles, viewOnlyRoles } from 'src/utils/roleUtils'

const UsersTable = ({ users, handleEditUser, handleResetPassword }) => {
    const auth = useAuth();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Station</TableCell>
                        {!viewOnlyRoles.includes(auth?.user?.role) && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.length > 0 ?
                        users?.map(user => {
                            return (
                                <TableRow
                                    key={user?.id}
                                    sx={{
                                        '&:last-of-type td, &:last-of-type th': {
                                            border: 0
                                        },
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {user?.fullName}
                                    </TableCell>
                                    <TableCell>{user?.role === 'Member' ? 'Not Assigned Yet' : user?.role}</TableCell>
                                    <TableCell>{user?.station}</TableCell>
                                    {!viewOnlyRoles.includes(auth?.user?.role) &&
                                        <TableCell sx={{ display: 'flex', gap: '10px' }}>
                                            {user?.role === 'Member' ?
                                                <Tooltip title='Update Role' placement='top'>
                                                    <Icon icon="eos-icons:role-binding-outlined" width="24" height="24"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleEditUser(user?.id)}
                                                    />
                                                </Tooltip>
                                                : <Tooltip title='Role Assigned' placement='top'>
                                                    <Icon icon="fluent-mdl2:completed-solid" width="24" height="24" color='green' />
                                                </Tooltip>}
                                            {adminRoles.includes(auth?.user?.role) &&
                                                <Tooltip title='Reset Password' placement='top'>
                                                    <Icon icon="material-symbols:password" width="24" height="24"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleResetPassword(user?.username)}
                                                    />
                                                </Tooltip>}
                                        </TableCell>
                                    }
                                </TableRow>
                            )
                        })
                        :
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: 'center' }}>No users found!</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default UsersTable
