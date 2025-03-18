import React from 'react';
// import axios from 'axios';
import Box from '@mui/material/Box';

function AccountRegistration() {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex', // 横並びを指定
                    alignItems: 'center', // 垂直方向の中央揃え
                    gap: 2, // 要素間の間隔
                    marginLeft: '10%',
                }}
            >
                <Box
                    component="img"
                    src="/img/icon.png"
                    alt="App Icon"
                    sx={{
                        marginLeft: '3%',
                        width: '21%',
                        zIndex: 999,
                    }}
                />
            </Box>
            <h5 style={{ textAlign: 'center' }}>
                説明PAGE
                <br />
                説明を入力
            </h5>
        </div>
    );
}

export default AccountRegistration;
