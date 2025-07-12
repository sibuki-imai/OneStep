import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import InputEdit from './inputEdit';

export default function ReportDisplay() {
    const [reportList, setReportList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [sum, setSum] = useState(0);
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedCustomId, setSelectedCustomId] = useState(null);
    const [iconOptions, setIconOptions] = useState([]);

    const fetchIcons = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_BE_DOMAIN}/api/icon/current-situation`,
            { withCredentials: true }
        );

        // console.log('確認', res.data.data.currentSituation);
        const iconList = res.data.data.currentSituation;
        console.log('確認', iconList);
        setIconOptions(iconList ?? []);
    };

    const reportListGet = useCallback(
        async (customId = null, yearVal = year, monthVal = month) => {
            try {
                const params = { year: yearVal, month: monthVal };
                if (customId !== null) {
                    params.customId = customId;
                }
                const res = await axios.get(
                    `${process.env.REACT_APP_BE_DOMAIN}/api/report/all/get`,
                    {
                        params,
                        withCredentials: true,
                    }
                );
                setReportList(res.data.data.result);
                const total = res.data.data.result.reduce(
                    (acc, item) => acc + item.amount,
                    0
                );
                setSum(total);
            } catch (error) {
                // エラーハンドリング
            }
        },
        [year, month]
    );

    const moveMonth = (offset) => {
        let newMonth = month + offset;
        let newYear = year;
        if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        } else if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        }
        setMonth(newMonth);
        setYear(newYear);
        reportListGet(selectedCustomId, newYear, newMonth);
    };

    useEffect(() => {
        fetchIcons();
        reportListGet();
        console.log('アイコンリスト:', iconOptions);
    }, [reportListGet]);

    return (
        <div>
            {openModal && editingIndex !== null && (
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    disableEnforceFocus
                >
                    <Box
                        sx={{
                            outline: 'none', // フォーカスリング無効
                            border: 'none', // 枠線削除
                            boxShadow: 'none', // 影を削除
                            backgroundColor: 'transparent', // 背景も透明化
                        }}
                    >
                        <InputEdit
                            moneyId={editingIndex}
                            onClose={() => setOpenModal(false)}
                            onSelectSuccess={() => {
                                setOpenModal(false);
                            }}
                        />
                    </Box>
                </Modal>
            )}
            <Box sx={{ marginLeft: '2vw', display: 'flex' }}>
                <ArrowBackIosRoundedIcon
                    onClick={() => moveMonth(-1)}
                    sx={{ cursor: 'pointer' }}
                />
                <Box>
                    {year}年{month}月
                </Box>
                <ArrowForwardIosRoundedIcon
                    onClick={() => moveMonth(1)}
                    sx={{ cursor: 'pointer' }}
                />
                <Box sx={{ marginLeft: '2vw' }}>
                    合計{sum.toLocaleString('ja-JP')}円
                </Box>
                <Box sx={{ marginLeft: '2vw' }}>
                    <button onClick={() => setFilterOpen(true)}>
                        絞り込み
                    </button>
                </Box>
                <Modal open={filterOpen} onClose={() => setFilterOpen(false)}>
                    <Box
                        sx={{
                            width: 300,
                            margin: '10% auto',
                            bgcolor: 'white',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            maxHeight: '80vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Typography>絞り込み</Typography>
                        <RadioGroup
                            value={selectedCustomId ?? ''}
                            onChange={(e) =>
                                setSelectedCustomId(
                                    e.target.value === ''
                                        ? null
                                        : Number(e.target.value)
                                )
                            }
                        >
                            <FormControlLabel
                                value=""
                                control={<Radio />}
                                label="絞り込みなし"
                            />
                            {iconOptions.map((icon) => (
                                <FormControlLabel
                                    key={icon.custom_id}
                                    value={icon.custom_id}
                                    control={<Radio />}
                                    label={icon.icon_naming}
                                />
                            ))}
                        </RadioGroup>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setFilterOpen(false);
                                reportListGet(selectedCustomId);
                            }}
                        >
                            絞り込み実行
                        </Button>
                    </Box>
                </Modal>
            </Box>
            <Box>
                {reportList.map((item, money_id) => (
                    <Box
                        key={money_id}
                        sx={{
                            padding: '0.5em',
                            color: '#5d627b',
                            background: '#faffff',
                            borderTop: 'solid 2px #5d627b',
                            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={() => {
                            setEditingIndex(item.money_id);
                            setOpenModal(true);
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    placeItems: 'center',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    width: {
                                        xs: '20vw',
                                        sm: '15vw',
                                        md: '20vw',
                                    },
                                    // backgroundColor: 'red',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={item.iconPath}
                                    sx={{
                                        width: {
                                            xs: '8vw',
                                            sm: '5vw',
                                            md: '3vw',
                                        },
                                        margin: ' auto',
                                        height: 'auto',
                                    }}
                                />
                                <Typography variant="body2">
                                    {item.iconNaming}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    color: '#000000',
                                    marginLeft: '1vw',
                                    width: {
                                        xs: '10vw',
                                        sm: '8vw',
                                        md: '5vw',
                                    },
                                    // backgroundColor: 'red',
                                }}
                            >
                                {item.day}日
                            </Box>

                            <Box
                                sx={{
                                    marginLeft: '1vw',
                                    // backgroundColor: 'red',
                                    width: {
                                        xs: '27vw',
                                        sm: '20vw',
                                        md: '10vw',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        color: '#000000',
                                        textAlign: 'right',
                                    }}
                                >
                                    {item.amount.toLocaleString('ja-JP')}円
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    marginLeft: '2vw',
                                    // backgroundColor: 'red',
                                    width: {
                                        xs: '33vw',
                                        sm: '50vw',
                                        md: '80vw',
                                    },
                                    height: '100%',
                                }}
                            >
                                <Box>{item.memo}</Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </div>
    );
}
