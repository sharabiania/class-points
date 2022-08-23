import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, Skeleton } from '@mui/material';

export function TransactionHistory({ historyData, onPageChange }) {
  const { data, total, pageSize } = historyData;
  const numberOfPages = Math.ceil(total / pageSize);
  return (data &&
    <TableContainer component={Paper}>
     
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          stickyHeader
          aria-label="transaction history table">
          <TableHead>
            <TableRow hover>
              <TableCell>Name</TableCell>
              <TableCell>Point Value</TableCell>
              <TableCell>Point Type</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && data.map((x, index) => (
                <TableRow hover key={'row' + index}>
                  <TableCell width={200}>{x.name}</TableCell>
                  <TableCell width={90}>{x.point_value}</TableCell>
                  <TableCell width={120}>{x.point_type}</TableCell>
                  <TableCell width={220}>{x.time_stamp}</TableCell>
                  <TableCell width={300}>{x.note}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      <Pagination count={numberOfPages} onChange={(event, value) => onPageChange(value)} />
    </TableContainer>
  )
}