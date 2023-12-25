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

const StationsTable = ({ stations, handleDeleteStation, handleEditStation }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Chief</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stations?.length > 0 ?
                        stations?.map(station => {
                            return (
                                <TableRow
                                    key={station?.id}
                                    sx={{
                                        '&:last-of-type td, &:last-of-type th': {
                                            border: 0
                                        },
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {station?.name}
                                    </TableCell>
                                    <TableCell>{station?.chief}</TableCell>
                                    <TableCell sx={{ display: 'flex', gap: '10px' }}>
                                        <Tooltip title='Edit' placement='top'>
                                            <Icon icon="tabler:edit" width="24" height="24"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleEditStation(station?.id)}
                                            />
                                        </Tooltip>
                                        <Tooltip title='Delete' placement='top'>
                                            <Icon icon="material-symbols:delete-outline" width="24" height="24"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDeleteStation(station)}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        :
                        <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: 'center' }}>No stations found!</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default StationsTable
