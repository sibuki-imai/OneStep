import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SavingsIcon from '@mui/icons-material/Savings';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
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
                <Box
                    sx={{
                        margin: '0 0 0 auto',
                        marginRight: '2%',
                        display: 'flex',
                        gap: { xs: '2vw', sm: '2vw', md: '2vw' }, // アイコン間の間隔
                    }}
                >
                    {[
                        {
                            icon: <EditRoundedIcon />,
                            label: '入力',
                            to: `/record-input`,
                        },
                        {
                            icon: <SavingsIcon />,
                            label: '予算',
                            to: `/budget`,
                        },
                        {
                            icon: <EditNoteIcon />,
                            label: 'レポート',
                            to: `/report`,
                        },
                        {
                            icon: <Inventory2RoundedIcon />,
                            label: '備蓄品',
                            to: `/saving-confirmation`,
                        },

                        {
                            icon: <PersonIcon />,
                            label: 'マイページ',
                            value: `/my-page`,
                        },
                    ].map((item, index) => (
                        <Link
                            to={item.to}
                            key={index}
                            style={{ textDecoration: 'none' }}
                        >
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    color: '#83a5c4',
                                    '&:hover': {
                                        color: '#4169e1',
                                    },
                                }}
                            >
                                {React.cloneElement(item.icon, {
                                    sx: {
                                        fontSize: {
                                            xs: '25px',
                                            sm: '30px',
                                            md: '40px',
                                        },
                                    },
                                })}
                                <Box
                                    sx={{
                                        fontSize: {
                                            xs: '2vw',
                                            sm: '2vw',
                                            md: '1vw',
                                        },
                                        textAlign: 'center',
                                        color: '#56595A',
                                    }}
                                >
                                    {item.label}
                                </Box>
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
            <Box // 下線
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
