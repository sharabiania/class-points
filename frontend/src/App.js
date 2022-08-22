import Button from '@mui/material/Button';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useState, useEffect } from 'react';
import { CohortSelect } from './components/cohort-select';
import './App.css';
import { Leaderboard } from './components/leaderboard';
import { TransactionHistory } from './components/transaction-history';
import { Container, Drawer, Divider } from '@mui/material';
import AddTransaction from './components/add-transaction';
import { apiUrl } from './config/config';

function App() {
  const [forceRefresh, setForceRefresh] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState({});

  const [pointTypes, setPointTypes] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [students, setStudents] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // get cohorts
    fetch(apiUrl + '/cohorts')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCohorts(data)
      });

    // get point types
    fetch(apiUrl + '/pointTypes')
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
    fetch(apiUrl + '/students/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => setStudents(data));

    // get leaderboard
    fetch(apiUrl + '/students/leaderboard/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => setLeaders(data[0]));

    // get transactions
    fetch(apiUrl + '/transactions/history/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => setHistory(data[0]));

  }, [selectedCohort, forceRefresh])


  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar style={{padding: '15px'}}>
          <CohortSelect cohorts={cohorts} setData={setSelectedCohort} />
          <Button color="inherit" onClick={() => setOpenDrawer(true)}>Give A Point!</Button>
        </Toolbar>
      </AppBar>

      <Container>

        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}>
          <AddTransaction
            pointTypes={pointTypes}
            students={students}
            onComplete={() => {
              setForceRefresh(!forceRefresh);
              setOpenDrawer(false);
            }} />
        </Drawer>

        <h2>Leaderboard</h2>
        <Divider />
        <Leaderboard students={leaders} />

        <h2>Transaction History</h2>
        <Divider />
        <TransactionHistory data={history} />
      </Container>

    </div>
  );
}


export default App;
