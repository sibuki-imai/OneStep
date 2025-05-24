import * as React from 'react';
import Box from '@mui/material/Box';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import SavingsIcon from '@mui/icons-material/Savings';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';

export default function headerIcon() {
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
                        width: {
                            xs: '60px',
                            sm: '70px',
                            md: '80px',
                        },
                        zIndex: 999,
                    }}
                />
                {/* 遷移各種 */}
                <Box>
                    <EditCalendarRoundedIcon
                        sx={{
                            fontSize: {
                                xs: '25px',
                                sm: '30px',
                                md: '40px',
                            },
                            zIndex: 999,
                        }}
                    />
                    <SavingsIcon
                        sx={{
                            fontSize: {
                                xs: '25px',
                                sm: '30px',
                                md: '40px',
                            },
                            zIndex: 999,
                        }}
                    />
                    <AddShoppingCartIcon
                        sx={{
                            fontSize: {
                                xs: '25px',
                                sm: '30px',
                                md: '40px',
                            },
                            zIndex: 999,
                        }}
                    />
                    <EditNoteIcon
                        sx={{
                            fontSize: {
                                xs: '25px',
                                sm: '30px',
                                md: '40px',
                            },
                            zIndex: 999,
                        }}
                    />
                    <PersonIcon
                        sx={{
                            fontSize: {
                                xs: '25px',
                                sm: '30px',
                                md: '40px',
                            },
                            zIndex: 999,
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '2px',
                    width: '97vw',
                    border: '1px solid',
                    borderColor: '#696969',
                    zIndex: 999,
                }}
            />
        </div>
    );
}
