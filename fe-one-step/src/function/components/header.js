import { Box } from '@mui/system';
import React from 'react';

const Header = () => {
    return (
        <div className="Header">
            <Box
                component="img"
                src="img/icon.png"
                alt="Header Icon"
                sx={{
                    top: '0%',
                    width: '17%',
                    height: '17%',
                    zIndex: 1000,
                }}
            />
            {/* <Box
                sx={{
                    verticalAlign: 'top',
                    position: 'fixed',
                    top: 0, // 画面上部に固定
                    left: 0,
                    width: '100%',
                    height: '6%',
                    backgroundColor: '#E4EFF9', // メニューバーカラー
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '10px 0',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // 上部用の影
                    zIndex: 1000,
                    borderRadius: '0 0 35% 35%',
                }}
            >
                <Box
                    component="img"
                    src="img/icon.png"
                    alt="App Icon"
                    sx={{
                        position: 'relative',
                        top: '-10%',
                        right: '35%',
                        height: 'auto', // 高さを自動調整
                        width: '20%', // 横幅に基づいてサイズを調整
                        maxWidth: '100%', // 画面幅を超えないように制約をつける
                        objectFit: 'contain', // アスペクト比を維持
                        zIndex: 1001,
                    }}
                />
            </Box> */}
        </div>
    );
};

export default Header;
