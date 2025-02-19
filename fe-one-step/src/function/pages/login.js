import React from 'react';
import Box from '@mui/material/Box';
import MuiButton from '../components/parts/button';

function Login() {
    const handle = () => {
        const redirect = `${process.env.REACT_APP_FE_DOMAIN}/${process.env.REACT_APP_REDIRECT_BE}`;
        alert(redirect);
        window.location.href =
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=` +
            `${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=` +
            `${redirect}&response_type=code&scope=https%3A%2F%` +
            `2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&access_` +
            `type=offline&state=`;
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
        </div>
    );
}

export default Login;
