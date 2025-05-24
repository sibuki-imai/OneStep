import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
// import Menubar from '../components/menubar';
import Icon from '../components/parts/iconlogo';
import { DateProvider, useDate } from '../joint/DateContext';
import Calendar from '../components/calendar';
import IconSelect from '../components/IconSelect';
import InputNominal from '../components/parts/inputNominal';
import InputMoney from '../components/parts/inputMoney';
import DateDisplay from '../components/parts/dateDisplay';
import SendButton from '../components/parts/sendButton';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function InputInner() {
    const { selectedDate } = useDate();
    const [amount, setAmount] = useState(0);
    const [customId, setCustomId] = useState(null);
    const [memo, setMemo] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // 3秒後に非表示
            return () => clearTimeout(timer); // クリーンアップ
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000); // 3秒後に非表示
            return () => clearTimeout(timer); // クリーンアップ
        }
    }, [errorMessage]);
    const send = async () => {
        try {
            setSuccessMessage('');
            setErrorMessage('');
            const payload = {
                date: formatDate(selectedDate),
                customId,
                amount,
                memo,
            };
            console.log('確認', payload);

            const result = await axios.post(
                `${process.env.REACT_APP_BE_DOMAIN}/api/input/new`,
                payload,
                {
                    withCredentials: true,
                }
            );

            if (result.status === 200) {
                setSuccessMessage(result.data.message);
            }
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);
            setErrorMessage(error.response.data.message);
        }
    };
    return (
        <div>
            {/* <Menubar /> */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'auto',
                    minWidth: '300px', // 幅の最小値を設定
                    maxWidth: '80%', // 画面幅に応じた最大幅
                    zIndex: 1500, // 他の要素より前面に表示
                }}
            >
                {errorMessage && (
                    <Stack spacing={2}>
                        <Alert
                            severity="error"
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            {errorMessage}
                        </Alert>
                    </Stack>
                )}
                {successMessage && (
                    <Stack spacing={2}>
                        <Alert
                            severity="success"
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            {successMessage}
                        </Alert>
                    </Stack>
                )}
            </Box>
            <Icon />

            <Box
                sx={{
                    display: 'flex',
                    marginTop: { xs: '3vh', sm: '2vh', md: '2vh' },
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <DateDisplay />
                <Box
                    sx={{
                        width: { xs: '5vw', sm: '6vw', md: '7vw' },
                    }}
                />
                <InputMoney value={amount} onChange={setAmount} />
                <Box
                    sx={{
                        width: { xs: '5vw', sm: '6vw', md: '7vw' },
                    }}
                />
                <SendButton onClick={send} component="button" />
            </Box>
            <Box
                sx={{
                    display: { md: 'flex' },
                    justifyContent: 'center',
                    marginTop: '5px',
                }}
            >
                <Calendar
                    sx={{ justifyContent: { xs: 'center', sm: 'center' } }}
                />
                <Box
                    sx={{
                        width: {
                            xs: '8vw',
                            sm: '8vw',
                            md: '8vw',
                        },
                        height: {
                            xs: '2vh',
                        },
                    }}
                />
                <IconSelect
                    sx={{ justifyContent: { xs: 'center', sm: 'center' } }}
                    value={customId}
                    onChange={setCustomId}
                />
                <Box
                    sx={{
                        width: {
                            md: '15vw',
                        },
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <InputNominal value={memo} onChange={setMemo} />
                <Box
                    sx={{
                        width: { xs: '15vw', sm: '13vw', md: '10vw' },
                    }}
                />
            </Box>
        </div>
    );
}
function formatDate(date) {
    if (!date) return '';
    const y = date.getFullYear();
    const m = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + date.getDate()).slice(-2);
    return `${y}-${m}-${d}`;
}

function Input() {
    return (
        <DateProvider>
            <InputInner />
        </DateProvider>
    );
}
export default Input;
