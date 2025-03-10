import React from 'react';
import Box from '@mui/material/Box';

function Errorpage() {
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
                エラーが発生しました。
                <br />
                再度ログインをお願いします。
            </h5>
        </div>
    );
}

export default Errorpage;
