import React, { useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import BasicIcon from '../components/parts/icon';
import CustomIconList from '../components/customIconList';

function AccountRegistration() {
    useEffect(() => {
        const currentSituation = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BE_DOMAIN}/api/user/inquiry/confirmation`,
                    { withCredentials: true }
                );
                console.log(response);
            } catch (error) {
                console.error('ユーザー情報取得エラー:', error);

                window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
            }
        };

        currentSituation();
    }, []);

    return (
        <div>
            <Box>
                <BasicIcon />
            </Box>
            <h5 style={{ textAlign: 'center' }}>
                名目の変更、名目の追加・削除を
                <br />
                行ってください。
            </h5>
            <CustomIconList />
        </div>
    );
}

export default AccountRegistration;
