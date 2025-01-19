import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function DateDisplay() {
    const displayDate = 'test';
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '18ch' },
                marginTop: '3%',
                marginLeft: '2%',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="Read Only"
                    label="日付"
                    value={displayDate} // 安全に表示
                    slotProps={{
                        input: {
                            readOnly: true, // 読み取り専用
                        },
                    }}
                />
            </div>
        </Box>
    );
}

export default DateDisplay;
