import { Typography, TableContainer, Table, TableRow, TableCell, TableBody, Paper, Stack } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function UpArrow({ value }) {
  return (
    <Stack spacing={1}>
      <ArrowDropUpIcon htmlColor="green" />
      <Typography variant="caption" display="block" align="center" fontSize={15} color="green">
        {value}
      </Typography>
    </Stack>
  )
}

function DownArrow({ value }) {
  return (
    <Stack>
      <ArrowDropDownIcon htmlColor="red" />
      <Typography variant="caption" display="block" align="center" fontSize={15} color="red">
        {value}
      </Typography>
    </Stack>
  )
}

export function Leaderboard({ students }) {

  return (
    <TableContainer component={Paper} sx={{ width: "350px" }}>
      <Table aria-label='leaderboard table'>
        <TableBody>
          {
            students.map((x, index) => (
              <TableRow hover key={'ldr-row' + index}>
                <TableCell>{x.up_down > 0 ? <UpArrow value={x.up_down} /> :
                  x.up_down < 0 ? <DownArrow value={x.up_down} /> : ''}</TableCell>
                <TableCell>{
                  x.ranking === 1 ? '1️st 🥇' :
                    x.ranking === 2 ? '2nd 🥈' :
                      x.ranking === 3 ? '3rd 🥉' :
                        x.ranking
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