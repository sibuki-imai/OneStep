import React from 'react';
import Box from '@mui/material/Box';
import MuiButton from '../components/parts/button';
import InputNominal from '../components/parts/inputNominal';

function Login() {
    const handle = () => {
        // window.location.href = `${process.env.REACT_APP_BE_DOMAIN}/${process.env.REACT_APP_SIGNIN}`;
        window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/record-input`;
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex', // 横並びを指定
                    alignItems: 'center', // 垂直方向の中央揃え
                    gap: 2, // 要素間の間隔
                    marginTop: '25%',
                    marginLeft: '10%',
                }}
            >
                <Box
                    component="img"
                    src="img/icon.png"
                    alt="App Icon"
                    sx={{
                        marginLeft: '3%',
                        width: '21%',
                        zIndex: 999,
                    }}
                />

                <h1 style={{ fontSize: '300%', margin: '3%' }}>執事</h1>
            </Box>
            <Box sx={{ marginLeft: '15%' }}>
                <MuiButton type="button" onClick={handle}>
                    Googleでログイン
                </MuiButton>
            </Box>
            <InputNominal />
        </div>
    );
}

export default Login;
