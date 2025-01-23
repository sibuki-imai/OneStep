import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function PasswordInput() {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
            </div>
        </Box>
    );
}

export default PasswordInput;
