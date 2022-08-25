import { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, TextField, Stack, DialogContent } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { apiUrl } from '../config/config';

export default function LoginDialog({ open, onClose, onSuccess, onError }) {
  const [user, setUser] = useState('admin2');
  const [pass, setPass] = useState('pass1');
  const [progress, setProgress] = useState(false);

  function login(user, pass) {
    setProgress(true);
    fetch(apiUrl + '/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user, password: pass })
    })
      .then(res => {
        if (!res.ok) return null;
        else return res.json();
      })
      .then(data => {        
        if (!data) onError('Error logging in');
        else onSuccess(data);
      })
      .catch(err => {
        console.log('fetch login error: ', err);
        onError(err);
      })
      .finally(() => setProgress(false));
  }



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField id='login-user' label='Username' variant='outlined' value={user} onChange={e => setUser(e.target.value)} />
          <TextField id='login-pass' label='Password' variant='outlined' value={pass} onChange={e => setPass(e.target.value)} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loadingPosition='end'
          loading={progress}
          disabled={!user || !pass}
          endIcon={<LoginIcon />}
          onClick={() => login(user, pass)}>
            Login
        </LoadingButton>
      </DialogActions>      
    </Dialog>
  )
}