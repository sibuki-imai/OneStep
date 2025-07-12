import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

function InputMoney({ value, onChange }) {
    const [touched, setTouched] = useState(false);

    const handleChange = (e) => {
        const inputValue = e.target.value;

        // 入力開始時に touched を true にする
        if (!touched) {
            setTouched(true);
        }

        // 入力を数値に変換して渡す（空の場合は 0）
        const parsed = inputValue === '' ? '' : Number(inputValue);
        onChange(parsed);
    };

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
                    required
                    id="outlined-required"
                    label=" 金額"
                    type="number"
                    value={!touched && value === 0 ? '' : value}
                    onChange={handleChange}
                />
            </div>
        </Box>
    );
}

InputMoney.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default InputMoney;
