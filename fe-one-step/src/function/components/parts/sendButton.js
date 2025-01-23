import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';

function SendButton() {
    const handle = () => {
        //処理
        console.log('test');
    };
    return (
        <div>
            <Box sx={{ fontSize: 'large' }}>
                <SendRoundedIcon
                    sx={{ fontSize: '200%', color: '#77A6D0' }}
                    type="button"
                    onClick={handle}
                />
            </Box>
        </div>
    );
}
export default SendButton;
