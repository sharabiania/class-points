import { TableContainer, Table, TableRow, TableCell, TableBody, Paper, Skeleton } from "@mui/material";

export function Leaderboard({ students, loading }) {

  return (
    <TableContainer component={Paper} sx={{ width: "300px"}}>
      <Table aria-label='leaderboard table'>
        <TableBody>
          {
            students.map((x, index) => (
              <TableRow hover key={'ldr-row' + index}>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x['sum(point_types.point_value)']}</TableCell>
              </TableRow>))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}