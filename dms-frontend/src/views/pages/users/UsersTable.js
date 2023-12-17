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

const UsersTable = ({ users, handleEditUser }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Station</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
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
                                    <TableCell>{user?.station || 'Not Assigned Yet'}</TableCell>
                                    <TableCell>{user?.role}</TableCell>
                                    <TableCell sx={{ display: 'flex', gap: '10px' }}>
                                        <Tooltip title='Edit' placement='top'>
                                            <Icon icon="tabler:edit" width="24" height="24"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleEditUser(user?.id)}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        :
                        <TableRow>
                            <TableCell colSpan={6}>No users found</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default UsersTable
