import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import { useState } from 'react';

export function CohortSelect({cohorts, setData}) {

  const [state, setState] = useState({btn: true, selected: {}});

  function cohortChange() {
    setData(state.selected);
    setState({...state, btn: true});    
  }

  return (
    <Container>
      <Autocomplete
      disablePortal
      onChange={(event, value) => { setState({btn: false, selected: value})}}
      id="cohorts-auto-complete"
      options={cohorts}
      sx={{ width: 300 }}
      getOptionLabel = {option => option.name}
      renderInput={(params) => <TextField {...params} label="Cohorts" />}
    />
    <Button 
      color="inherit" 
      disabled={state.btn}
      onClick={cohortChange}
      >Change Cohort</Button>

    </Container>
  )
}