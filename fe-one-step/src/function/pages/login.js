import React from 'react';
import Box from '@mui/material/Box';
import MuiButton from '../components/button';

function Login() {
  const handle = () => {
    console.log('test', `${process.env.REACT_APP_FE_DOMAIN}/record-input`);
    window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/record-input`;
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex', // 横並びを指定
          alignItems: 'center', // 垂直方向の中央揃え
          gap: 2, // 要素間の間隔
        }}
      >
        <Box
          component="img"
          src="img/Appicon.png"
          alt="App Icon"
          sx={{
            height: '30%',
            width: '30%',
          }}
        />
        <h1 style={{ fontSize: '300%', margin: '10%' }}>執事</h1>
      </Box>
      <MuiButton type="button" onClick={handle}>
        Googleでログイン
      </MuiButton>
    </div>
  );
}

export default Login;
