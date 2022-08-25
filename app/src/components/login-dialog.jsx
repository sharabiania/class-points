import { useState } from 'react';
import { Dialog, DialogTitle, Button, TextField } from '@mui/material';
import { apiUrl } from '../config/config';

export default function LoginDialog({ open, onClose, onSuccess, onError }) {
  const [user, setUser] = useState('admin2');
  const [pass, setPass] = useState('pass1');

  function login(user, pass) {
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
        console.log('login data: ', data);
        if (!data) onError('Error logging in');
        else onSuccess(data);
      })
      .catch(err => {
        console.log('fetch login error: ', err);
        onError(err);
      })
  }



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <TextField id='login-user' label='username' variant='outlined' value={user} onChange={e => setUser(e.target.value)} />
      <TextField id='login-pass' label='password' variant='outlined' value={pass} onChange={e => setPass(e.target.value)} />
      <Button onClick={() => login(user, pass)}>Login</Button>
    </Dialog>
  )
}