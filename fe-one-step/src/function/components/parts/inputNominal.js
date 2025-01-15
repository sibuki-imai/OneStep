// import React from 'react';
// import Box from '@mui/material/Box';

// function InputNominal() {
//     return (
//         <div>
//             <Box
//                 sx={{
//                     width: '100%',
//                     objectFit: 'contain',
//                 }}
//             >
//                 <span style={{ fontSize: '12px', display: 'block' }}>メモ</span>
//                 <text></text>
//             </Box>
//         </div>
//     );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function InputNominal() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '18ch' },
                marginTop: '-3%',
                marginLeft: '2%',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label=" メモ"
                    defaultValue=""
                />
            </div>
        </Box>
    );
}

export default InputNominal;
