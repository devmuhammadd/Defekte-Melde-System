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
import { capitalize } from 'src/utils/common'

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
                                    <TableCell>{user?.role === 'Member' ? 'Not Assigned Yet' : user?.role}</TableCell>
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
                                    </TableCell>
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
