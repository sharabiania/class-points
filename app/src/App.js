import { useState, useEffect } from 'react';
import { CohortSelect } from './components/cohort-select';
import './App.css';
import { Leaderboard } from './components/leaderboard';
import { TransactionHistory } from './components/transaction-history';
import {
  AppBar, Skeleton, Stack, Box,
  Toolbar, Typography, Container, Drawer,
  Divider, BottomNavigation, Snackbar, Fab
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddTransaction from './components/add-transaction';
import Price from './components/price';
import { apiUrl } from './config/config';
import LoginToolbar from './components/login-toolbar';




function App() {

  const [forceRefresh, setForceRefresh] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [pointTypes, setPointTypes] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [students, setStudents] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [snack, setSnack] = useState({ open: false, msg: '' });
  const [leaderLoad, setLeaderLoad] = useState(false);
  const [transLoad, setTransLoad] = useState(false);
  const [loggedIn, setLoggedIn] = useState('');
  const [checkLoginProgress, setCheckLoginProgress] = useState(true);

  useEffect(() => {
    // check login
    setCheckLoginProgress(true);
    fetch(apiUrl + '/auth/check_login', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn)
          setLoggedIn(data.loggedIn);
        // else setLoggedIn('')
      })
      .finally(() => setCheckLoginProgress(false));
    // get cohorts
    fetch(apiUrl + '/cohorts')
      .then(res => res.json())
      .then(data => {
        setCohorts(data)
      });

    // get active cohort
    fetch(apiUrl + '/cohorts/active')
      .then(res => res.json())
      .then(data => setSelectedCohort(data[0]))

    // get point types
    fetch(apiUrl + '/pointTypes')
      .then(res => res.json())
      .then(data => {
        setPointTypes(data)
      });

  }, []);

  useEffect(() => {
    if (!selectedCohort || !selectedCohort.id) return;

    // get students
    fetch(apiUrl + '/students/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => setStudents(data));

    // get leaderboard
    setLeaderLoad(true);
    fetch(apiUrl + '/students/leaderboard/' + selectedCohort.id)
      .then(res => res.json())
      .then(data => {
        setLeaders(data);
        setLeaderLoad(false);
      });

    setTransLoad(true);
    fetch(apiUrl + '/transactions/history/' + selectedCohort.id + `?pageSize=10&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setHistory(data);
        setTransLoad(false);
      });

  }, [page, selectedCohort, forceRefresh]);

  return (
    <div className="app">

      <AppBar position="static">
        <Toolbar style={{ padding: '15px' }}>
          <CohortSelect cohorts={cohorts} setData={setSelectedCohort} defaultCohort={selectedCohort} />
          {!checkLoginProgress && <LoginToolbar
            onLoginError={err => setSnack({ open: true, msg: err })}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />}
        </Toolbar>
      </AppBar>

      {loggedIn && <Fab
        style={{ position: 'fixed', bottom: '30px', right: '30px' }}
        color='primary'
        onClick={() => setOpenDrawer(true)}>
        <ControlPointIcon />
      </Fab>}

      <Container sx={{ margin: "20px" }}>

        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}>
          <AddTransaction
            pointTypes={pointTypes}
            students={students}
            onPending={() => console.log('pending')}
            onError={err => setSnack({ open: true, msg: err || 'Error occurred whiled adding transaction!' })}
            onComplete={() => {
              setForceRefresh(!forceRefresh);
              setOpenDrawer(false);
            }} />
        </Drawer>


        {leaderLoad &&
          <Stack direction="row" spacing={2}>
            <Skeleton variant="circular" width={150} height={150} />
            <Skeleton variant="text" width={600} height={150} />
          </Stack>}
        {!leaderLoad && <><Typography variant="h2">👑 Leaderboard</Typography><Divider sx={{ margin: "15px" }} /></>}

        <Container sx={{ margin: "20px" }}>
          <Stack direction="row" spacing={10} sx={{ display: "flex", justifyContent: "space-between" }}>
            {leaderLoad && <Skeleton variant="rounded" width={300} height={450} />}
            {!leaderLoad && <Leaderboard students={leaders} />}
            <Price />
          </Stack>

        </Container>

        {transLoad &&
          <Stack direction="row" spacing={2}>
            <Skeleton variant="circular" width={150} height={150} />
            <Skeleton variant="text" width={600} height={150} />
          </Stack>}
        {!transLoad && <><Typography variant="h2">📜 Transaction History</Typography><Divider sx={{ margin: "15px" }} /></>}

        <Container sx={{ margin: "20px" }}>
          {transLoad && <Skeleton variant="rounded" width={950} height={550} />}
          {!transLoad &&
            <TransactionHistory
              historyData={history}
              onPageChange={(page) => setPage(page - 1)}
              page={page + 1}
            />}
        </Container>
      </Container>
      <Box>
        <BottomNavigation sx={{ backgroundColor: "gray" }}>

        </BottomNavigation>
        <i>version 0.0.7</i>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snack.open}
        message={snack.msg}
        autoHideDuration={2000}
        onClose={() => setSnack({ open: false, msg: '' })}
      />


    </div>
  );
}


export default App;
