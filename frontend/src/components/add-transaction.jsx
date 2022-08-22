import { Card, CardContent, CardActions, Button, Stack, TextField, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { StudentSelect } from './student-select';
import { PointSelect } from './point-type-select';
import { apiUrl } from '../config/config';

export default function AddTransaction({ students, pointTypes, onComplete, onPending}) {

  const [progress, setProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [note, setNote] = useState('');
  const [selectedPoint, setSelectedPoint] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});

  useEffect(() => {
    if (selectedPoint && selectedStudent && selectedPoint.ty_id && selectedStudent.st_id) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [selectedPoint, selectedStudent])

  return (
    <Card variant='outlined' sx={{ minWidth: 275 }} style={{ width: 400 }} >
      <CardContent>
        <Stack spacing={2}>
          <StudentSelect students={students} setData={setSelectedStudent} />
          <PointSelect pointTypes={pointTypes} setData={setSelectedPoint} />
          <TextField id="outlined-basic" label="Notes" variant="outlined"
            onChange={event => setNote(event.target.value)} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          disabled={disabled}
          variant="contained"
          onClick={() =>
            addTransaction(selectedStudent.st_id,
              selectedPoint.ty_id,
              note,
              onComplete,
              onPending,
              setProgress,
              setDisabled
            )}>
          Add Transaction 
         {progress && <CircularProgress size="20px" />}
        </Button>
      </CardActions>
    </Card>
  );
}


function addTransaction(sId, pId, note, onComplete, onPending, setProgress, setDisabled) {
  if (!sId || !pId) return;
  setProgress(true);
  setDisabled(true);
  if(onPending) onPending();  
  fetch(apiUrl + '/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sId, pId, note
    })
  })
    .then(res => {     
      if(onComplete) onComplete();
    })
    .catch(err => {
      // TODO handle error:
      console.error('error while adding transaction: ', err);
    })
    .finally(() => {
      setProgress(false);
      setDisabled(false);
    });
}
