import React from 'react';
// import axios from 'axios';
import Box from '@mui/material/Box';
import BasicIcon from '../components/parts/icon';
import InputList from '../components/parts/inputList';

function AccountRegistration() {
    return (
        <div>
            <Box>
                <BasicIcon />
            </Box>
            <h5 style={{ textAlign: 'center' }}>
                名目の変更、名目の追加・削除を
                <br />
                行ってください。
            </h5>
            <InputList defaultValue="食品" />
        </div>
    );
}

export default AccountRegistration;
