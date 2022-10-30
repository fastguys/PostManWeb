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
import { FinduserByEmail } from "../../apis/user";
import { set } from 'mongoose';

export default function Signup() {
  const [name, setName] = useState('Joseph');
  const [update, setUpdate] = useState(false);
  const [bio, setBio] = useState('hello');
  const [updateBio, setUpdateBio] = useState(false);
  const [alignment, setAlignment] = useState('true');
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  if (!localStorage.getItem('authenticated')) {
    return <Navigate to="/" replace={true} />;
  } else{
    let email = localStorage.getItem('userId')
    FinduserByEmail({ email }).then((res) => {
      console.log(res[0].nickname)
      setName(res[0].nickname)
      setBio(res[0].bio)
    });
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
                  value={name}
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
                    setName(e.target.value);
                  }}
                />
              )}
  
              <Button
                onClick={() => (!update ? setUpdate(true) : setUpdate(false))}
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
                  value={bio}
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
                    setBio(e.target.value);
                  }}
                />
              )}
  
              <Button
                onClick={() => (!updateBio ? setUpdateBio(true) : setUpdateBio(false))}
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
