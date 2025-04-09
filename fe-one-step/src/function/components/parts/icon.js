import * as React from 'react';
import Box from '@mui/material/Box';

export default function BasicIcon() {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex', // 横並びを指定
                    alignItems: 'center', // 垂直方向の中央揃え
                    gap: 2, // 要素間の間隔
                    marginLeft: '3%',
                }}
            >
                <Box
                    component="img"
                    src="/img/icon.png"
                    alt="App Icon"
                    sx={{
                        width: '10%',
                        zIndex: 999,
                    }}
                />
                <h1 style={{ fontSize: '300%', margin: '3%' }}>執事</h1>
            </Box>
        </div>
    );
}
