import { TableContainer, Table, TableRow, TableCell, TableBody, Paper } from "@mui/material";

export function Leaderboard({ students, loading }) {

  return (
    <TableContainer component={Paper} sx={{ width: "350px" }}>
      <Table aria-label='leaderboard table'>
        <TableBody>
          {
            students.map((x, index) => (
              <TableRow hover key={'ldr-row' + index}>
                <TableCell>{
                  index === 0 ? '1️st 🥇' :
                    index === 1 ? '2nd 🥈' :
                      index === 2 ? '3rd 🥉' :
                        index + 1
                }</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x['sum(point_types.point_value)']}</TableCell>
              </TableRow>))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}