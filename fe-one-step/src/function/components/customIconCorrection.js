import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function CustomIconCorrection({
    onClose,
    onSelectSuccess,
    editingId,
}) {
    const [item, setItem] = useState(null);

    const fetchItem = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/one/custom/icon/${editingId}`,
                { withCredentials: true }
            );
            const result = response.data.data.result;
            setItem(result);
        } catch (error) {
            console.error('データ取得エラー:', error);
        }
    };

    useEffect(() => {
        if (editingId) {
            fetchItem();
        }
    }, [editingId]);

    const handleSave = () => {
        onSelectSuccess({
            iconId: item.custom_id,
            iconPath: item.icon_path,
            iconNaming: item.icon_naming,
            userSaving: item.user_saving,
            fixedAmount: item.fixed_amount,
        });
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
                アイコン情報の編集
            </Typography>

            {/* アイコン画像 */}
            <Box
                component="img"
                src={item.icon_path || ''}
                alt="アイコン"
                sx={{ width: '80px', height: 'auto', mb: 2 }}
            />

            {/* 項目名 */}
            <TextField
                fullWidth
                label="項目名"
                value={item.icon_naming}
                onChange={(e) =>
                    setItem({ ...item, icon_naming: e.target.value })
                }
                sx={{ mb: 2 }}
            />

            {/* 残高 */}
            <TextField
                fullWidth
                label="残高"
                type="number"
                value={item.user_saving}
                onChange={(e) =>
                    setItem({ ...item, user_saving: e.target.value })
                }
                sx={{ mb: 2 }}
            />

            {/* 毎月の積立 */}
            <TextField
                fullWidth
                label="毎月の積立"
                type="number"
                value={item.fixed_amount}
                onChange={(e) =>
                    setItem({ ...item, fixed_amount: e.target.value })
                }
                sx={{ mb: 2 }}
            />

            {/* 保存ボタン */}
            <Box sx={{ textAlign: 'right' }}>
                <Button variant="contained" onClick={handleSave}>
                    保存
                </Button>
            </Box>
        </Box>
    );
}

CustomIconCorrection.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelectSuccess: PropTypes.func.isRequired,
    editingId: PropTypes.number.isRequired,
};
