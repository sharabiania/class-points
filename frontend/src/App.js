
import { useState, useEffect } from 'react';
import { CohortSelect } from './components/cohort-select';
import './App.css';
import { StudentSelect } from './components/student-select';
import { Leaderboard } from './components/leaderboard';
import { PointSelect } from './components/point-type-select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const apiUrl = 'http://localhost:3000/api/';

function App() {
  const [disabled, setDisabled] = useState(false);
  const [note, setNote] = useState('');
  const [selectedCohort, setSelectedCohort] = useState({});
  const [selectedPoint, setSelectedPoint] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});
  const [pointTypes, setPointTypes] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [students, setStudents] = useState([]);
  const [leaders, setLeaders] = useState([]);
  
  useEffect(() => {
    fetch(apiUrl + 'cohorts')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCohorts(data)
    });

    fetch(apiUrl + 'pointTypes')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setPointTypes(data)
    });

  }, []);

  useEffect(() => {
    console.log('selected cohort is : ', selectedCohort);
    if(!selectedCohort || !selectedCohort.id) return;
    fetch(apiUrl + 'students/' + selectedCohort.id)
    .then(res => res.json())
    .then(data => setStudents(data));

    fetch(apiUrl + 'students/leaderboard/' + selectedCohort.id)
    .then(res => res.json())
    .then(data => setLeaders(data[0]));

  }, [selectedCohort])

  useEffect(() => {
    if(selectedPoint && selectedStudent && selectedPoint.id && selectedStudent.id) {
      setDisabled(true);
    }
    else {
      setDisabled(false);
    }
  }, [selectedPoint, selectedStudent])

  return (
    <div className="App">
      <CohortSelect cohorts={cohorts} setData={setSelectedCohort}/>
      <StudentSelect students={students} setData={setSelectedStudent}/>
      <PointSelect pointTypes={pointTypes} setData={setSelectedPoint}/>
      <TextField id="outlined-basic" label="Notes" variant="outlined" 
        onChange={(event, value) => setNote(value)} />
      <Button 
        disabled={disabled}
        variant="contained" 
        onClick={() => addTransaction(selectedStudent.st_id, selectedPoint.ty_id, note)}>
          Add Transaction
      </Button>
      <Leaderboard students={leaders} />
    </div>
  );
}


function addTransaction(sId, pId, note) {
  if(!sId || !pId) return;
  fetch(apiUrl + 'transactions', {
    method: 'POST',
    body: JSON.stringify({
      sId, pId, note
    })
  })
  .then(res => console.log(res));
}

export default App;
