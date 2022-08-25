import { TableContainer, Table, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function Leaderboard({ students }) {

  return (
    <TableContainer component={Paper} sx={{ width: "350px" }}>
      <Table aria-label='leaderboard table'>
        <TableBody>
          {
            students.map((x, index) => (
              <TableRow hover key={'ldr-row' + index}>
                <TableCell>{x.up_down > 0 ? [<ArrowDropUpIcon />,  x.up_down ] :
                  x.up_down < 0 ? [<ArrowDropDownIcon />, x.up_down] : x.up_down}</TableCell>
                <TableCell>{
                  index === 0 ? '1️st 🥇' :
                    index === 1 ? '2nd 🥈' :
                      index === 2 ? '3rd 🥉' :
                        index + 1
                }</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.total_points}</TableCell>
              </TableRow>))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}