import { Box } from '@mui/system';
import React from 'react';

const Header = () => {
  return (
    <div className="Header">
      <Box
        sx={{
          verticalAlign: 'top',
          position: 'fixed',
          top: 0, // 画面上部に固定
          left: 0,
          width: '100%',
          height: '8%',
          backgroundColor: '#E4EFF9', // メニューバーカラー
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // 上部用の影
          zIndex: 1000,
          borderRadius: '0 0 35% 35%',
        }}
      ></Box>
    </div>
  );
};

export default Header;
