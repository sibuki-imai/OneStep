import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import IconDisplay from './parts/iconDisplay';

export default function CustomIconCorrection({
    onClose,
    onSelectSuccess,
    editingId,
}) {
    const [item, setItem] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const fetchItem = useCallback(async () => {
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
    }, [editingId]);

    useEffect(() => {
        if (editingId) {
            fetchItem();
        }
    }, [editingId, fetchItem]);

    const handleSave = async () => {
        onSelectSuccess({
            iconId: item.custom_id,
            iconPath: item.icon_path,
            iconNaming: item.icon_naming,
            userSaving: item.user_saving,
            fixedAmount: item.fixed_amount,
        });
        const response = await axios.patch(
            `${process.env.REACT_APP_BE_DOMAIN}/api/icon/item-change`,
            {
                customId: item.custom_id,
                iconId: item.icon_id,
                iconPath: item.icon_path,
                iconNaming: item.icon_naming,
                userSaving: item.user_saving,
                fixedAmount: item.fixed_amount,
            },
            { withCredentials: true }
        );
        console.log(response);
        if (response.status === 200) {
            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/budget`;
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
            {openModal && editingIndex !== null && (
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box>
                        <IconDisplay
                            onClose={() => setOpenModal(false)}
                            onSelectSuccess={({ iconId, iconPath }) => {
                                setItem({
                                    ...item,
                                    icon_id: iconId,
                                    icon_path: iconPath,
                                });
                                setOpenModal(false);
                            }}
                        />
                    </Box>
                </Modal>
            )}

            <Typography variant="h6" mb={2}>
                予算情報の編集
            </Typography>

            {/* アイコン画像 */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                <Box
                    component="img"
                    src={item.icon_path || ''}
                    alt="アイコン"
                    sx={{
                        width: '80px',
                        height: 'auto',
                    }}
                />
                <EditRoundedIcon
                    onClick={() => {
                        setEditingIndex(item.custom_id);
                        setOpenModal(true);
                    }}
                />
            </Box>
            <Box sx={{ mb: 2 }} />

            {/* 項目名 */}
            <Box>
                <TextField
                    fullWidth
                    label="項目名"
                    value={item.icon_naming}
                    onChange={(e) =>
                        setItem({ ...item, icon_naming: e.target.value })
                    }
                    sx={{ mb: 2, width: '90%' }}
                />
            </Box>

            {/* 残高 */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    fullWidth
                    label="残高"
                    type="number"
                    value={item.user_saving}
                    onChange={(e) =>
                        setItem({ ...item, user_saving: e.target.value })
                    }
                    sx={{ width: '90%' }}
                />
                <Box sx={{ mx: 1 }} />円
            </Box>
            <Box sx={{ mb: 2 }} />

            {/* 毎月の積立 */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    fullWidth
                    label="毎月の積立"
                    type="number"
                    value={item.fixed_amount}
                    onChange={(e) =>
                        setItem({ ...item, fixed_amount: e.target.value })
                    }
                    sx={{ width: '90%' }}
                />
                <Box sx={{ mx: 1 }} />円
            </Box>
            <Box sx={{ mb: 2 }} />

            {/* キャンセルボタン */}

            <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onClose()}
                >
                    キャンセル
                </Button>
                <Box sx={{ mx: 2 }} />
                {/* 保存ボタン */}
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
