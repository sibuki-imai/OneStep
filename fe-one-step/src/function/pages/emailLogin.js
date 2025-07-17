import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MuiButton from '../components/parts/button';
import BasicIcon from '../components/parts/icon';

function EmailLogin() {
    // 【state】ユーザー情報を保存する
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handle = async () => {
        setErrorMessage(''); // エラーリセット
        const payload = {
            userEmail: userEmail,
            userPassword: userPassword,
        };
        try {
            const registration = await axios.post(
                `${process.env.REACT_APP_BE_DOMAIN}/api/user/setting/registration/email/login`,
                payload,
                { withCredentials: true }
            );
            console.log('返却状況', registration);
            if (registration.status === 200) {
                window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/record-input`;
            }
        } catch (error) {
            console.log('エラー詳細:', error);

            if (error.response) {
                console.log('エラー詳細:', error.response);

                if (
                    error.response.status === 400 &&
                    error.response.data.message
                ) {
                    setErrorMessage(error.response.data.message);
                    return;
                }
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
                <Typography variant="h5">ようこそ！</Typography>
            </Box>
            <h5 style={{ textAlign: 'center' }}>
                下記にEmail,パスワード、を入力の上
                <br />
                ログインボタンをクリックしてください
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
                    label="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    variant="filled"
                    sx={{ marginBottom: '10px' }} // 下の余白を少し作る
                />
                <TextField
                    required
                    id="filled-required"
                    label="PassWord"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    variant="filled"
                    sx={{ marginBottom: '10px' }} // 下の余白を少し作る
                />

                <MuiButton
                    type="button"
                    onClick={handle}
                    sx={{ marginTop: '10px' }}
                >
                    ログイン
                </MuiButton>
            </Box>
        </div>
    );
}

export default EmailLogin;
