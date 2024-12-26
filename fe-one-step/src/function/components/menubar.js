import { Box } from '@mui/system';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import SavingsIcon from '@mui/icons-material/Savings';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';

const MenuBar = () => {
  return (
    <div className="MenuBar">
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '3%',
          backgroundColor: '#D8E9F8', // メニューバーカラー
          color: '#77A6D0', // アイコンカラー
          display: 'flex',
          justifyContent: 'space-around',
          padding: '9% 0',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          borderRadius: '35% 35% 0 0',
        }}
      >
        {/* 各項目を均等に配置 */}
        <Box
          sx={{
            flex: 1, // 均等幅
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <EditCalendarRoundedIcon
            sx={{ fontSize: '200%', marginTop: '-10%' }}
          />
          <span style={{ textAlign: 'center' }}>入力</span>
        </Box>

        <Box
          sx={{
            flex: 1, // 均等幅
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SavingsIcon sx={{ fontSize: '200%', marginTop: '-10%' }} />
          <span style={{ textAlign: 'center' }}>予算</span>
        </Box>

        <Box
          sx={{
            flex: 1, // 均等幅
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <EditNoteIcon sx={{ fontSize: '200%', marginTop: '-10%' }} />
          <span style={{ textAlign: 'center' }}>レポート</span>
        </Box>

        <Box
          sx={{
            flex: 1, // 均等幅
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PersonIcon sx={{ fontSize: '200%', marginTop: '-10%' }} />
          <span style={{ textAlign: 'center' }}>ユーザ</span>
        </Box>

        <Box
          sx={{
            flex: 1, // 均等幅
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AddShoppingCartIcon sx={{ fontSize: '200%', marginTop: '-10%' }} />
          <span style={{ textAlign: 'center' }}>商品定価</span>
        </Box>
      </Box>
    </div>
  );
};

export default MenuBar;
