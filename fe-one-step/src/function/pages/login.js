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

    const debug = () => {
        window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/debug`;
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
            <Box>
                <MuiButton type="button" onClick={debug}>
                    debug用
                </MuiButton>
            </Box>
        </div>
    );
}

export default Login;
