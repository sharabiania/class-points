import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function TransactionHistory({data}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Point Value</TableCell>
            <TableCell>Point Type</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              data.map((x, index) => (
                <TableRow key={'row'+ index}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.point_value}</TableCell>
                  <TableCell>{x.point_type}</TableCell>
                  <TableCell>{x.time_stamp}</TableCell>
                  <TableCell>{x.note}</TableCell>
                </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </TableContainer>
  )
}