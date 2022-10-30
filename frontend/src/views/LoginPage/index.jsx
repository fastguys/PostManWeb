import { Box } from '@mui/material';
import React from 'react';
import Login from './Login';
import ResponsiveAppBar from '../TopBar/TopBar';

const LoginPage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <ResponsiveAppBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          {/*<Left part*/}
          <Box
            sx={{
              width: '60%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ width: 700, height: 50, border: 1, mb: 5 }}>Enter address</Box>
            <Box sx={{ width: 700, height: 400, border: 1 }} />
          </Box>

          {/*Right part*/}
          <Box
            sx={{
              width: '40%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ width: 300, height: 600, padding: 10 }}>
              <Login />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default LoginPage;
