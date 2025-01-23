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
                '& .MuiTextField-root': { width: '37%' },
                marginTop: '-16%',
                marginLeft: '23%',
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
                />
            </div>
        </Box>
    );
};

export default DateDisplay;
