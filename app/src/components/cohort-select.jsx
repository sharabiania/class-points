import { Autocomplete, TextField, Stack, Button, Container } from '@mui/material';
import { useState } from 'react';

export function CohortSelect({ cohorts, setData, defaultCohort }) {

  const [state, setState] = useState({ btn: true, selected: {} });

  return (
    <Container>
      {defaultCohort &&
      <Stack spacing={2} direction="row">
        
          <Autocomplete
            disablePortal
            onChange={(event, value) => {
              if (value)
                setState({ btn: false, selected: value });
              else
                setState({ btn: true, selected: null });
            }}
            defaultValue={defaultCohort}
            id="cohorts-auto-complete"
            options={cohorts}
            sx={{ width: 300 }}
            getOptionLabel={option => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Cohorts" />}
          />
        <Button
          color="inherit"
          variant="outlined"
          disabled={state.btn}
          onClick={() => {
            setData(state.selected);
            setState({ ...state, btn: true });
          }}
        >Change Cohort</Button>
      </Stack>}
    </Container>
  )
}