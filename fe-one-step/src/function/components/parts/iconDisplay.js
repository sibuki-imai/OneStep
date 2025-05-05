import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TrashBox from './trashBox';
// import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export default function IconDisplay() {
    const [iconData, setIconData] = useState([]);

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

    const trashbutton = async () => {
        try {
            const deleteList = index + 1;
            const itemDelete = await axios.delete(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/item-delete`,
                { deleteList },
                { withCredentials: true }
            );
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);

            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
        }
    };
    return (
        <div>
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
                    <IconButton>
                        <Box
                            component="img"
                            src={item.icon_path.toLocaleString() || ''}
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
                            handleChange(
                                index,
                                'user_saving',
                                e.user_saving.value
                            )
                        }
                    />
                    <IconButton onClick={trashbutton}>
                        <TrashBox />
                    </IconButton>
                </Box>
            ))}
        </div>
    );
}
