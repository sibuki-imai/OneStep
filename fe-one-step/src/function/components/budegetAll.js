import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import axios from 'axios';

export default function CustomIcon() {
    const CustomIconList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/current-situation`,
                { withCredentials: true }
            );
            const dataList = response.data.data.currentSituation;
            console.log(dataList);
            alert('取得');
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);
            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
        }
    };

    useEffect(() => {
        CustomIconList();
    }, []);

    return <Box></Box>;
}
