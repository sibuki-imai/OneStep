import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import MuiButton from '../components/parts/button';

function AccountRegistration() {
    // 【state】ユーザー情報を保存する
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const userget = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/user/basic/information`,
                { withCredentials: true }
            );
            console.log(response);

            setUserName(response.data.UserName);
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);

            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
        }
    };
    useEffect(() => {
        userget();
    }, []);
    const handle = async () => {
        const paylod = {
            userId: userId,
            userName: userName,
            userEmail: userEmail,
            invitationCode: invitationCode,
        };
        const registration = await axios.post(
            `${process.env.REACT_APP_BE_DOMAIN}/api/user/basic/information`,
            { paylod },
            { withCredentials: true }
        );
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex', // 横並びを指定
                    alignItems: 'center', // 垂直方向の中央揃え
                    gap: 2, // 要素間の間隔
                    marginLeft: '10%',
                }}
            >
                <Box
                    component="img"
                    src="/img/icon.png"
                    alt="App Icon"
                    sx={{
                        marginLeft: '3%',
                        width: '21%',
                        zIndex: 999,
                    }}
                />
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
            <TextField
                required
                id="filled-required"
                label="必須"
                defaultValue=""
                variant="filled"
            />
            <MuiButton type="button" onClick={handle}>
                Googleで登録する
            </MuiButton>
        </div>
    );
}

export default AccountRegistration;
