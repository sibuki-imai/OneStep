import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function InputNominal({ value, onChange }) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '100%' },
                width: { xs: '65vw', sm: '66vw', md: '67vw' },
                marginTop: '3px',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-helperText"
                    label="メモ"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </Box>
    );
}

InputNominal.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default InputNominal;
