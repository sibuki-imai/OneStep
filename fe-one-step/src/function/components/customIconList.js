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

export default function CustomIconList() {
    const [iconData, setIconData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedIconId, setSelectedIconId] = useState(null);

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

    const trashbutton = async (user_custom_id) => {
        try {
            setSuccessMessage('');
            setErrorMessage(''); // エラーリセット

            const deleteList = user_custom_id;
            console.log('テスト', deleteList);
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

    // const Iconbutton = async (
    //     user_custom_id,
    //     icon_id,
    //     user_icon_number,
    //     icon_naming,
    //     fixed_amount,
    //     user_saving
    // ) => {
    //     try {
    //         setSuccessMessage('');
    //         setErrorMessage(''); // エラーリセット

    //         const payload = {
    //             user_custom_id,
    //             icon_id,
    //             user_icon_number,
    //             icon_naming,
    //             fixed_amount,
    //             user_saving,
    //         };
    //         const iconChange = await axios.patch(
    //             `${process.env.REACT_APP_BE_DOMAIN}/api/icon/item-change`,
    //             { payload },
    //             { withCredentials: true }
    //         );

    //         if (iconChange.status === 200) {
    //             setSuccessMessage(iconChange.data.message);
    //             currentSituation();
    //         }
    //     } catch (error) {
    //         console.error('Icon変更エラー:', error);
    //         setErrorMessage(error.response.data.message);
    //     }
    // };
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

            {iconData.map((item, index) => (
                <Box
                    key={item.icon_id || index}
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        mb: 2, // 各行の間に余白
                        px: 2, // 横パディング
                    }}
                >
                    {selectedIconId === item.icon_id && openModal && (
                        <Modal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                        >
                            <Box>
                                <IconDisplay
                                    iconId={item.icon_id}
                                    onClose={() => setOpenModal(false)}
                                    onSelectSuccess={() => {
                                        currentSituation();
                                        setOpenModal(false);
                                    }}
                                />
                            </Box>
                        </Modal>
                    )}
                    <IconButton
                        onClick={() => {
                            setSelectedIconId(item.icon_id);
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
                        onChange={(e) =>
                            handleChange(index, 'icon_naming', e.target.value)
                        }
                    />
                    <TextField
                        fullWidth
                        label="固定金額"
                        value={item.fixed_amount || 0}
                        onChange={(e) =>
                            handleChange(index, 'fixed_amount', e.target.value)
                        }
                    />
                    <TextField
                        fullWidth
                        label="貯蓄金額"
                        value={item.user_saving || 0}
                        onChange={(e) =>
                            handleChange(index, 'user_saving', e.target.value)
                        }
                    />
                    <IconButton
                        onClick={() => trashbutton(item.user_custom_id)}
                    >
                        <TrashBox />
                    </IconButton>
                </Box>
            ))}
        </div>
    );
}
