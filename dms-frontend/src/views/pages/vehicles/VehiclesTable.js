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
import { viewOnlyRoles } from 'src/utils/roleUtils'

const VehiclesTable = ({ vehicles, handleDeleteVehicle, handleEditVehicle }) => {
    const { user } = useAuth();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Station</TableCell>
                        {!viewOnlyRoles.includes(user?.role) && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles?.length > 0 ?
                        vehicles?.map(vehicle => {
                            return (
                                <TableRow
                                    key={vehicle?.id}
                                    sx={{
                                        '&:last-of-type td, &:last-of-type th': {
                                            border: 0
                                        },
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {vehicle?.name}
                                    </TableCell>
                                    <TableCell>{vehicle?.station}</TableCell>
                                    {!viewOnlyRoles.includes(user?.role) &&
                                        <TableCell sx={{ display: 'flex', gap: '10px' }}>
                                            <Tooltip title='Edit' placement='top'>
                                                <Icon icon="tabler:edit" width="24" height="24"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleEditVehicle(vehicle?.id)}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Delete' placement='top'>
                                                <Icon icon="material-symbols:delete-outline" width="24" height="24"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleDeleteVehicle(vehicle)}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    }
                                </TableRow>
                            )
                        })
                        :
                        <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: 'center' }}>No vehicles found!</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default VehiclesTable
