import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function StudentSelect({students, setData}) {

  return (
    <Autocomplete
    disablePortal
    id="students-auto-complete"
    options={students}
    // getOptionSelected = {(option, value) => option.id === value.id}
    onChange={(event, value) => setData(value)}
    sx={{ width: 300 }}
    getOptionLabel = {option => option.name}
    renderInput={(params) => <TextField {...params} label="Students" />}
  />
  )
}