import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDate } from '../../joint/DateContext'; // useDate をインポート

const DateDisplay = () => {
    const { selectedDate } = useDate(); // useDate から selectedDate を取得

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    width: { xs: '30vw', sm: '30vw', md: '30vw' },
                    minWidth: '110px',
                },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="Read Only"
                    label="日付"
                    value={
                        selectedDate
                            ? selectedDate.toLocaleDateString()
                            : '日付未選択'
                    } // 安全に表示
                    slotProps={{
                        input: {
                            readOnly: true, // 読み取り専用
                        },
                    }}
                    sx={{ border: 'none' }}
                />
            </div>
        </Box>
    );
};

export default DateDisplay;
