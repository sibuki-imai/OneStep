import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function InputList() {
    return (
        <Box>
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label=" 名目"
                    defaultValue=""
                />
            </div>
        </Box>
    );
}
export default InputList;
