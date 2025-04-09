import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MuiButton from '../components/parts/button';
import BasicIcon from '../components/parts/icon';

function AccountRegistration() {
    // 【state】ユーザー情報を保存する
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const userget = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/user/basic/information`,
                { withCredentials: true }
            );
            console.log(response);

            setUserName(response.data.UserName);
            setUserId(response.data.UserId);
            setUserEmail(response.data.UserEmail);
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);

            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
        }
    };
    useEffect(() => {
        userget();
    }, []);
    const handle = async () => {
        setErrorMessage(''); // エラーリセット
        const payload = {
            userId: userId,
            userName: userName,
            userEmail: userEmail,
            invitationCode: invitationCode,
        };
        try {
            const registration = await axios.post(
                `${process.env.REACT_APP_BE_DOMAIN}/api/user/setting/registration`,
                payload,
                { withCredentials: true }
            );
            console.log('返却状況', registration);
            if (registration.status === 200) {
                window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/tutorial`;
            }
        } catch (error) {
            if (error.response) {
                console.log('エラー詳細:', error.response);
            }
            if (error.response.status === 400 && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/errorpage`;
            }
        }
    };

    return (
        <div>
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
            </Box>

            <Box>
                <BasicIcon />
            </Box>
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h5">
                    {userName ? (
                        `${userName}さん、ようこそ！`
                    ) : (
                        <CircularProgress />
                    )}
                </Typography>
            </Box>
            <h5 style={{ textAlign: 'center' }}>
                下記に招待コードを入力の上、
                <br />
                登録ボタンをクリックしてください
            </h5>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // 縦方向に並べる
                    alignItems: 'center', // 水平方向の中央揃え
                }}
            >
                <TextField
                    required
                    id="filled-required"
                    label="必須"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    variant="filled"
                    sx={{ marginBottom: '10px' }} // 下の余白を少し作る
                />
                <MuiButton
                    type="button"
                    onClick={handle}
                    sx={{ marginTop: '10px' }}
                    disabled={!userName || !invitationCode}
                >
                    Googleで登録する
                </MuiButton>
            </Box>
        </div>
    );
}

export default AccountRegistration;
