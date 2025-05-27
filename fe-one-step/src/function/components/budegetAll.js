import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Modal from '@mui/material/Modal';
import CustomIconCorrection from './customIconCorrection';

export default function CustomIcon() {
    const [CustomData, setCustomData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const CustomIconList = async () => {
        try {
            const result = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/current-situation`,
                { withCredentials: true }
            );
            const dataList = result.data.data.currentSituation;
            setCustomData(dataList);
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);
            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
        }
    };

    useEffect(() => {
        CustomIconList();
    }, []);
    const hander = async (customId) => {
        setEditingIndex(customId);
        setOpenModal(true);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // 横方向中央
                flexDirection: 'column',
                alignItems: 'center', // コンテンツ中央寄せ
                p: 2,
            }}
        >
            {openModal && editingIndex !== null && (
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box>
                        <CustomIconCorrection
                            editingId={editingIndex}
                            onClose={() => setOpenModal(false)}
                            onSelectSuccess={({ iconId, iconPath }) => {
                                const updated = [...CustomData];
                                updated[editingIndex].icon_id = iconId;
                                updated[editingIndex].icon_path = iconPath;

                                setOpenModal(false);
                            }}
                        />
                    </Box>
                </Modal>
            )}
            {CustomData.map((item) => (
                <Box
                    key={item.custom_id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',

                        width: '100%',
                        maxWidth: '800px', // 最大幅
                        p: 2,
                        mt: 2,
                        border: '2px solid #a9a9a9',
                        boxShadow: '3px 5px 2px #808080',
                        borderRadius: 2,
                        backgroundColor: '#f7f9ff',
                    }}
                >
                    {/* アイコン画像 */}
                    <Box sx={{ width: { xs: '8vw', sm: '6vw', md: '4vw' } }}>
                        <Box
                            component="img"
                            src={item.icon_path || ''}
                            alt={item.icon_naming}
                            sx={{ width: '100%', height: 'auto' }}
                        />
                    </Box>

                    {/* 項目名 */}
                    <Box sx={{ width: '28%' }}>
                        <Typography variant="caption" color="text.secondary">
                            項目名
                        </Typography>
                        <Typography variant="body1">
                            {item.icon_naming}
                        </Typography>
                    </Box>

                    {/* 残金 */}
                    <Box sx={{ width: '25%' }}>
                        <Typography variant="caption" color="text.secondary">
                            残高
                        </Typography>
                        <Typography variant="body1">
                            {item.user_saving}円
                        </Typography>
                    </Box>

                    {/* 毎月の固定額 */}
                    <Box sx={{ width: '25%' }}>
                        <Typography variant="caption" color="text.secondary">
                            毎月の積立
                        </Typography>
                        <Typography variant="body1">
                            {item.fixed_amount}円
                        </Typography>
                    </Box>

                    {/* 編集アイコン */}
                    <Box
                        sx={{
                            width: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        onClick={() => hander(item.custom_id)}
                    >
                        <EditRoundedIcon
                            sx={{ color: '#4169e1', cursor: 'pointer' }}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
