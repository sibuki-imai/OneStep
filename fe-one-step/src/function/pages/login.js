import React from 'react';
import Box from '@mui/material/Box';
import MuiButton from '../components/parts/button';
import BasicIcon from '../components/parts/icon';

function Login() {
    const handle = () => {
        const redirect = `${process.env.REACT_APP_BE_DOMAIN}/${process.env.REACT_APP_REDIRECT_BE}`;
        window.location.href =
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=` +
            `${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=` +
            `${redirect}&response_type=code&scope=` +
            `https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20` +
            `https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email` +
            `&access_type=offline&state=`;
    };

    const emailRegistration = () => {
        window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/account/registration/email`;
    };
    const emailLogin = () => {
        window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/accout/email/login`;
    };

    return (
        <div>
            <Box>
                <BasicIcon />
            </Box>
            <Box sx={{ marginLeft: '15%' }}>
                <MuiButton type="button" onClick={handle}>
                    Googleでログイン
                </MuiButton>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '3vh', marginLeft: '15%' }}>
                <MuiButton
                    sx={{
                        width: '150px',
                        '--btn-bg': '#009900',
                        '--btn-border': '#009900',
                        '--btn-inset1': '#33b333',
                        '--btn-inset2': '#008000',
                        '--btn-bg-hover': '#008000',
                        '--btn-bg-active': '#006600',
                    }}
                    type="button"
                    onClick={emailRegistration}
                >
                    emailで登録
                </MuiButton>
                <MuiButton
                    sx={{ marginLeft: '3vw' }}
                    type="button"
                    onClick={emailLogin}
                >
                    emailでログイン
                </MuiButton>
            </Box>
            <Box sx={{ marginLeft: '15%' }}>
                現在Googleサインインは
                <br />
                申請中の為利用できません。
            </Box>
        </div>
    );
}

export default Login;
