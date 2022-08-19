import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function PointSelect({pointTypes, setData}) {

  return (
    <Autocomplete
    disablePortal
    id="point-auto-complete"
    onChange={(event, value) => setData(value)}
    options={pointTypes}
    sx={{ width: 300 }}
    getOptionLabel = {option => option.name}
    renderInput={(params) => <TextField {...params} label="Point Type" />}
  />
  )
}