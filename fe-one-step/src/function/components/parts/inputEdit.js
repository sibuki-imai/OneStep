import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';

// 省略：インポートはそのままでOK

export default function InputEdit({ onClose, onSelectSuccess, moneyId }) {
    const [item, setItem] = useState(null);
    const [value, setValue] = useState(dayjs());

    const fetchItem = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/input/correction/${moneyId}`,
                { withCredentials: true }
            );
            const result = response.data.data.result;
            setItem(result);

            // 年月日を dayjs に変換してセット（※ 月は0ベースではなくそのまま使える）
            const { year, month, day } = result;
            setValue(
                dayjs(
                    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                )
            );
        } catch (error) {
            console.error('データ取得エラー:', error);
        }
    }, [moneyId]);

    useEffect(() => {
        if (moneyId) {
            fetchItem();
        }
    }, [moneyId, fetchItem]);

    const handleSave = async () => {
        try {
            const dateObj = value.toDate();
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1; // 月は0始まりなので +1
            const day = dateObj.getDate();

            const payload = {
                unique_user_id: item.unique_user_id,
                money_id: item.money_id,
                year,
                month,
                day,
                amount: Number(item.amount),
                memo: item.memo || '',
            };

            console.log('送信', payload);
            const response = await axios.patch(
                `${process.env.REACT_APP_BE_DOMAIN}/api/input/correction/${moneyId}`,
                payload,
                { withCredentials: true }
            );

            if (response.status === 200) {
                onSelectSuccess({
                    iconId: item.custom_id,
                    iconPath: item.icon_path,
                    iconNaming: item.icon_naming,
                    userSaving: item.user_saving,
                    fixedAmount: item.fixed_amount,
                });
                window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/report`;
            }
        } catch (error) {
            console.error('保存エラー:', error);
        }
        onClose();
    };

    if (!item) return null;

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                p: 4,
                borderRadius: 2,
                width: {
                    xs: '90vw',
                    sm: '60vw',
                    md: '40vw',
                },
                mx: 'auto',
                mt: '10vh',
            }}
        >
            <Typography variant="h6" mb={2}>
                入力内容の編集
            </Typography>

            {/* アイコンと項目名 */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Box
                    component="img"
                    src={item.icon_path || ''}
                    alt="アイコン"
                    sx={{
                        width: { xs: '8vw', sm: '5vw', md: '3vw' },
                        height: 'auto',
                    }}
                />
                <Box sx={{ marginLeft: '3px' }}>{item.icon_naming}</Box>
            </Box>

            <Box sx={{ mb: 2 }} />

            {/* 日付ピッカー */}
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
                <DatePicker
                    label="日付"
                    value={value}
                    onChange={setValue}
                    format="YYYY/MM/DD"
                    sx={{ width: '90%' }}
                    slotProps={{
                        textField: {
                            autoFocus: false,
                            fullWidth: true,
                        },
                    }}
                />
            </LocalizationProvider>

            <Box sx={{ mb: 2 }} />

            {/* 金額 */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    fullWidth
                    label="金額"
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                        setItem({ ...item, amount: e.target.value })
                    }
                    sx={{ width: '90%' }}
                />
                <Box sx={{ mx: 1 }} />円
            </Box>

            <Box sx={{ mb: 2 }} />

            {/* メモ */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    fullWidth
                    label="メモ"
                    value={item.memo}
                    onChange={(e) => setItem({ ...item, memo: e.target.value })}
                    sx={{ width: '90%' }}
                />
            </Box>

            <Box sx={{ mb: 2 }} />

            {/* ボタン */}
            <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button variant="outlined" color="error" onClick={onClose}>
                    キャンセル
                </Button>
                <Box sx={{ mx: 2 }} />
                <Button variant="contained" onClick={handleSave}>
                    保存
                </Button>
            </Box>
        </Box>
    );
}

InputEdit.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelectSuccess: PropTypes.func.isRequired,
    moneyId: PropTypes.number.isRequired,
};
