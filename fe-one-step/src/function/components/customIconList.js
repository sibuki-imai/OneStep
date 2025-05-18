import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TrashBox from './parts/trashBox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import IconDisplay from './parts/iconDisplay';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

export default function CustomIconList() {
    const [iconData, setIconData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const currentSituation = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/current-situation`,
                { withCredentials: true }
            );
            console.log(response);

            const dataList = response.data.data.currentSituation;
            setIconData(dataList);
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);

            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
        }
    };

    useEffect(() => {
        currentSituation();
    }, []);
    const handleChange = (index, field, value) => {
        const newData = [...iconData];
        newData[index][field] = value;
        setIconData(newData);
    };

    const trashbutton = async (custom_id) => {
        try {
            setSuccessMessage('');
            setErrorMessage(''); // エラーリセット

            const deleteList = custom_id;
            const itemDelete = await axios.delete(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/item-delete`,
                {
                    data: { deleteList },
                    withCredentials: true,
                }
            );
            if (itemDelete.status === 200) {
                setSuccessMessage(itemDelete.data.message);
                currentSituation();
            }
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);
            setErrorMessage(error.response.data.message);
        }
    };

    const addButton = async () => {
        const newItem = {
            custom_id: `tentative-${Date.now()}`,
            tentative: true,
            user_icon_number: `tentative-${Date.now()}`,
            icon_path: 'img/food.png',
            icon_id: 1,
            icon_naming: '',
            fixed_amount: 0,
            user_saving: 0,
        };

        setIconData((prev) => [...prev, newItem]);
    };

    const registration = async () => {
        try {
            setSuccessMessage('');
            setErrorMessage('');

            const registrationList = iconData.map((item) => ({
                custom_number: item.custom_id,
                icon_id: item.icon_id,
                user_icon_number: item.user_icon_number,
                icon_naming: item.icon_naming,
                fixed_amount: item.fixed_amount,
                user_saving: item.user_saving,
                tentative: item.tentative,
            }));
            console.log('送信内容', registrationList);
            const send = await axios.patch(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/list/registration`,
                { registrationList },
                { withCredentials: true }
            );

            if (send.status === 200) {
                setSuccessMessage('登録が完了しました');
                setSuccessMessage('');
                setErrorMessage('');
                const userUpData = await axios.patch(
                    `${process.env.REACT_APP_BE_DOMAIN}/api/user/setting/updata`,
                    {},
                    { withCredentials: true }
                );
                if (userUpData.status === 200) {
                    window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/record-input`;
                }
                currentSituation(); // 最新データを再取得
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <Box
                sx={{
                    position: 'fixed',
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
            <Box
                sx={{
                    overflowX: 'auto',
                    width: '100%',
                }}
            >
                {iconData.map((item, index) => (
                    <Box
                        key={item.custom_id}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            mb: 2, // 各行の間に余白
                            px: 2, // 横パディング
                            minWidth: '800px',
                            justifyContent: 'center',
                        }}
                    >
                        {openModal && editingIndex !== null && (
                            <Modal
                                open={openModal}
                                onClose={() => setOpenModal(false)}
                            >
                                <Box>
                                    <IconDisplay
                                        onClose={() => setOpenModal(false)}
                                        onSelectSuccess={({
                                            iconId,
                                            iconPath,
                                        }) => {
                                            const updated = [...iconData];
                                            updated[editingIndex].icon_id =
                                                iconId;
                                            updated[editingIndex].icon_path =
                                                iconPath;
                                            setIconData(updated);
                                            setOpenModal(false);
                                        }}
                                    />
                                </Box>
                            </Modal>
                        )}

                        <IconButton
                            onClick={() => {
                                setEditingIndex(index);
                                setOpenModal(true);
                            }}
                        >
                            <Box
                                component="img"
                                src={item.icon_path || ''}
                                sx={{
                                    width: {
                                        xs: '24px',
                                        sm: '32px',
                                        md: '40px',
                                    },
                                    height: 'auto',
                                }}
                            />
                        </IconButton>

                        <TextField
                            fullWidth
                            label={`項目名 ${index + 1}`}
                            value={item.icon_naming || ''}
                            margin="normal"
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    'icon_naming',
                                    e.target.value
                                )
                            }
                            sx={{
                                width: 300,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="固定金額"
                            value={item.fixed_amount ?? ''}
                            margin="normal"
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    'fixed_amount',
                                    parseInt(e.target.value, 10) || 0
                                )
                            }
                            sx={{
                                width: 300,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="貯蓄金額"
                            value={item.user_saving ?? ''}
                            margin="normal"
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    'user_saving',
                                    parseInt(e.target.value, 10) || 0
                                )
                            }
                            sx={{
                                width: 300,
                            }}
                        />
                        <IconButton onClick={() => trashbutton(item.custom_id)}>
                            <TrashBox />
                        </IconButton>
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="outlined"
                    href="#outlined-buttons"
                    sx={{
                        height: 50,
                        borderRadius: '10px',
                        mt: 3,
                        mb: 3,
                        width: '40vi',
                        maxWidth: '150px',
                    }}
                    onClick={addButton}
                >
                    項目の追加
                </Button>
                <Box sx={{ width: '20vi' }} />
                <Button
                    variant="outlined"
                    href="#outlined-buttons"
                    onClick={registration}
                    sx={{
                        height: 50,
                        borderRadius: '10px',
                        mt: 3,
                        mb: 3,
                        width: '40vi',
                        backgroundColor: '#e4eff9',
                    }}
                >
                    登録
                </Button>
            </Box>
        </div>
    );
}
