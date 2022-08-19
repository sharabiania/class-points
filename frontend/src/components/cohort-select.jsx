import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function CohortSelect({cohorts, setData}) {

  return (
    <Autocomplete
    disablePortal
    onChange={(event, value) => setData(value)}
    id="cohorts-auto-complete"
    options={cohorts}
    sx={{ width: 300 }}
    getOptionLabel = {option => option.name}
    renderInput={(params) => <TextField {...params} label="Cohorts" />}
  />
  )
}