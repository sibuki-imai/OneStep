import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function InputMoney() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '60%' },
                // marginLeft: '12%',
                // marginTop: '-3%',
                marginLeft: '55%',
                marginTop: '-15%',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label=" 金額"
                    defaultValue=""
                />
            </div>
        </Box>
    );
}
export default InputMoney;
