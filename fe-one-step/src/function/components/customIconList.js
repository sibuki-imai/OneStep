import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TrashBox from './parts/trashBox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export default function CustomIconList() {
    const [iconData, setIconData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const trashbutton = async (user_icon_number) => {
        try {
            setSuccessMessage('');
            setErrorMessage(''); // エラーリセット

            const deleteList = user_icon_number;
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

    const Iconbutton = async (user_icon_number, icon_path) => {
        try {
            setSuccessMessage('');
            setErrorMessage(''); // エラーリセット

            const iconformer = { user_icon_number, icon_path };
            const iconChange = await axios.patch(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/item-change`,
                { iconformer },
                { withCredentials: true }
            );

            if (iconChange.status === 200) {
                setSuccessMessage(iconChange.data.message);
                currentSituation();
            }
        } catch (error) {
            console.error('Icon変更エラー:', error);
            setErrorMessage(error.response.data.message);
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
                    <IconButton
                        onClick={() =>
                            Iconbutton(item.user_icon_number, item.icon_path)
                        }
                    >
                        <Box
                            component="img"
                            src={item.icon_path || ''}
                            sx={{
                                width: {
                                    xs: '24px', // スマホ
                                    sm: '32px', // タブレット
                                    md: '40px', // PC
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
                        onClick={() => trashbutton(item.user_icon_number)}
                    >
                        <TrashBox />
                    </IconButton>
                </Box>
            ))}
        </div>
    );
}
