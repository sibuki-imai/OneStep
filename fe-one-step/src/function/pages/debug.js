import React from 'react';
import Box from '@mui/material/Box';
import MuiButton from '../components/parts/button';
import axios from 'axios';

function Debug() {
    const debug = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BE_DOMAIN}/debug/connect`,
            {}
            // { withCredentials: true }
        );

        if (response.status === 200 && response.data.message) {
            alert(response.data.message);
        } else {
            alert('接続不可');
        }
    };

    return (
        <div>
            <Box>
                <MuiButton type="button" onClick={debug}>
                    接続確認
                </MuiButton>
            </Box>
        </div>
    );
}

export default Debug;
