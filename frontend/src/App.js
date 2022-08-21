import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Stack, Drawer } from '@mui/material';

import { useState, useEffect } from 'react';
import { CohortSelect } from './components/cohort-select';
import './App.css';
import { StudentSelect } from './components/student-select';
import { Leaderboard } from './components/leaderboard';
import { PointSelect } from './components/point-type-select';
import { TransactionHistory } from './components/transaction-history';



const apiUrl = 'http://localhost:3000/api/';

function App() {
  const [disabled, setDisabled] = useState(false);
  const [note, setNote] = useState('');
  const [forceRefresh, setForceRefresh] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState({});
  const [selectedPoint, setSelectedPoint] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});
  const [pointTypes, setPointTypes] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [students, setStudents] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // get cohorts
    fetch(apiUrl + 'cohorts')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCohorts(data)
      });

    // get point types
    fetch(apiUrl + 'pointTypes')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPointTypes(data)
      });

  }, []);

  useEffect(() => {
    console.log('selected Cohort: ', selectedCohort);
    if (!selectedCohort || !selectedCohort.id) return;

    // get students
    fetch(apiUrl + 'students/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => setStudents(data));

    // get leaderboard
    fetch(apiUrl + 'students/leaderboard/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => setLeaders(data[0]));

    // get transactions
    fetch(apiUrl + 'transactions/history/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => setHistory(data[0]));

  }, [selectedCohort, forceRefresh])

  useEffect(() => {
    if (selectedPoint && selectedStudent && selectedPoint.id && selectedStudent.id) {
      setDisabled(true);
    }
    else {
      setDisabled(false);
    }
  }, [selectedPoint, selectedStudent])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <CohortSelect cohorts={cohorts} setData={setSelectedCohort} />
          <Button color="inherit" onClick={() => setOpenDrawer(true)}>Give A Point!</Button>
        </Toolbar>
      </AppBar>

      <Drawer 
        anchor="right" 
        open={openDrawer}  
        onClose={() => setOpenDrawer(false)}>
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
              setOpenDrawer,
              setForceRefresh, forceRefresh
              )}>
              Add Transaction
            </Button>
          </CardActions>
        </Card>
      </Drawer>

      <hr />
      <h2>Leaderboard</h2>
      <hr />
      <Leaderboard students={leaders} />

      <h2>Transaction History</h2>
      <hr />
      <TransactionHistory data={history} />
    </div>
  );
}


function addTransaction(sId, pId, note, setOpenDrawer, setForceRefresh, forceRefresh) {
  console.log('sid, tid: ', sId, pId);
  if (!sId || !pId) return;
  // TODO display progress spinner
  fetch(apiUrl + 'transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sId, pId, note
    })
  })
  .then(res => 
    {
      // TODO close drawer
      setOpenDrawer(false);      
      setForceRefresh(!forceRefresh)
      console.log(res);
    });
}

export default App;
