import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginDialog from "./login-dialog";
import { useState } from "react";
import { apiUrl } from '../config/config';
import LogoutIcon from '@mui/icons-material/Logout';


export default function LoginToolbar({ loggedIn,
  setLoggedIn,
  onLoginError,
}) {

  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutProgress, setLogoutProgress] = useState(false);

  return (
    <>
      <LoginDialog open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={user => { setLoggedIn(user.username); setLoginOpen(false); }}
        onError={err => onLoginError(err)} />

      {!loggedIn && <Button color="inherit" onClick={() => setLoginOpen(true)}>Login</Button>}
      {loggedIn && <LoadingButton
        color="inherit"
        onClick={() => logout(setLoggedIn, setLogoutProgress)}
        loadingPosition='end'
        endIcon={<LogoutIcon />}
        loading={logoutProgress}>
        Logout {loggedIn}
      </LoadingButton>}

    </>);
}


function logout(setLoggedIn, setProgress) {
  setProgress(true);
  fetch(apiUrl + '/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    // .then(res => res.json())
    .then(data => {
      setLoggedIn(false);
      document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    })
    .catch(err => {
      console.log('fetch logout error: ', err);
    })
    .finally(() => setProgress(false));
}