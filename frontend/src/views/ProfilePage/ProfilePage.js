import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../TopBar/TopBar';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Navigate } from 'react-router-dom';
import { FinduserByEmail,UpdateUserNickname, UpdateUserBio} from "../../apis/user";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  getAuth,
  sendPasswordResetEmail
} from 'firebase/auth';


export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [tempname, setTempName] = useState(name);
  const [update, setUpdate] = useState(false);
  const [bio, setBio] = useState('');
  const [tempbio, setTempBio] = useState(bio);
  const [updateBio, setUpdateBio] = useState(false);
  const [alignment, setAlignment] = useState('true');
  const [open, setOpen] = React.useState(false);
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  if (!localStorage.getItem('authenticated')) {
    return <Navigate to="/" replace={true} />;
  } else{
    let email = localStorage.getItem('userId')
    FinduserByEmail({ email }).then((res) => {
      setName(res[0].nickname)
      setBio(res[0].bio)
    });
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handlereset = (event) => {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          alert('A reset email have been sent to your email');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    };
    const handleChange = () => {
      handlereset()
      setOpen(false);
      localStorage.clear();
      navigate("/");
    };
    const updateUsername = () => {
      if (!update) {
        setUpdate(true)
        setTempName(name)
      } else {
        setUpdate(false)
        setName(tempname)

        const payload = {
          email: localStorage.getItem('userId'),
          nickname: tempname
        }
        console.log(payload)
        UpdateUserNickname(payload)
      }
    }
    const updateUserbio = () => {
      if (!updateBio) {
        setUpdateBio(true)
        setTempBio(bio)
      } else {
        setUpdateBio(false)
        setBio(tempbio)
        const payload = {
          email: localStorage.getItem('userId'),
          bio: tempbio
        }
        console.log(payload)
        UpdateUserBio(payload)
      }
    }
    return (
      <div>
        <ResponsiveAppBar />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '33%',
              height: '100vh'
            }}
          >
            <Box
              component="img"
              sx={{
                mt: 10,
                height: 233,
                width: 350
              }}
              alt="Profile Photo."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            ></Box>
            <Button
              variant="contained"
              sx={{
                mt: 5,
                height: 50,
                width: 350
              }}
              style={{ background: '#656268' }}
            >
              Update Your Profile Image
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h5" sx={{ mt: 5 }}>
                Username:
              </Typography>
  
              {update === false ? (
                <Typography variant="h5" sx={{ mt: 5 }}>
                  {name}
                </Typography>
              ) : (
                <TextField
                  required
                  sx={{ ml: 1, mt: 5, width: 200, height: 5 }}
                  value={tempname}
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                      backgroundColor: '#FFF',
                      paddingLeft: 4,
                      paddingRight: 4,
                      color: '#383838'
                    }
                  }}
                  inputProps={{
                    style: {
                      fontSize: 14,
                      height: 35,
                      width: 272,
                      padding: '0 14px',
                      fontWeight: 'bold'
                    }
                  }}
                  onChange={(e) => {
                    setTempName(e.target.value);
                  }}
                />
              )}
  
              <Button
                onClick={updateUsername}
                variant="contained"
                sx={{
                  ml: 2,
                  mt: 5,
                  width: 10,
                  height: 30,
                  backgroundColor: '#656268'
                }}
              >
                update
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h5" sx={{ mt: 5 }}>
                Bio:
              </Typography>
  
              {updateBio === false ? (
                <Typography variant="h5" sx={{ mt: 5 }}>
                  {bio}
                </Typography>
              ) : (
                <TextField
                  required
                  sx={{ ml: 1, mt: 5, width: 200, height: 5 }}
                  value={tempbio}
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                      backgroundColor: '#FFF',
                      paddingLeft: 4,
                      paddingRight: 4,
                      color: '#383838'
                    }
                  }}
                  inputProps={{
                    style: {
                      fontSize: 14,
                      height: 35,
                      width: 272,
                      padding: '0 14px',
                      fontWeight: 'bold'
                    }
                  }}
                  onChange={(e) => {
                    setTempBio(e.target.value);
                  }}
                />
              )}
  
              <Button
                onClick={updateUserbio}
                variant="contained"
                sx={{
                  ml: 2,
                  mt: 5,
                  width: 10,
                  height: 30,
                  backgroundColor: '#656268'
                }}
              >
                update
              </Button>
            </Box>
  
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h5" sx={{ mt: 5 }}>
                Profile Visibility:
              </Typography>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton sx={{ mt: 5, ml: 2, height: 30 }} value="true" aria-label="Visible">
                  visible
                </ToggleButton>
                <ToggleButton sx={{ mt: 5, height: 30 }} value="false" aria-label="Not Visible">
                  Not visible
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Button
              variant="contained"
              sx={{ mt: 5, height: 50, width: 350 }}
              style={{ background: '#656268' }}
              onClick={() => {
                handleClickOpen();
              }}
              >
              Change Your Password
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Change Passwor?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    You sure you want to change your password?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleChange}>Confirm</Button>
                  <Button onClick={handleClose}>Back</Button>
                </DialogActions>
            </Dialog>
            <Button
              variant="contained"
              sx={{
                mt: 5,
                height: 50,
                width: 350
              }}
              style={{ background: '#656268' }}
            >
              Delete Your Account
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '33%',
              height: '100vh'
            }}
          >
            <Typography variant="h4" sx={{ mt: 5 }}>
              Your Posted Tasks:
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '34%',
              height: '100vh'
            }}
          >
            <Typography variant="h4" sx={{ mt: 5 }}>
              Your Finished Tasks:
            </Typography>
          </Box>
        </Box>
      </div>
    );
  }
}