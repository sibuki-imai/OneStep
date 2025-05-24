import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function IconSelect({ onChange }) {
    const [iconData, setIconData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const CustomList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BE_DOMAIN}/api/icon/current-situation`,
                { withCredentials: true }
            );
            const dataList = response.data.data.currentSituation;
            setIconData(dataList);
        } catch (error) {
            console.error('ユーザー情報取得エラー:', error);
            window.location.href = `${process.env.REACT_APP_FE_DOMAIN}`;
        }
    };

    useEffect(() => {
        CustomList();
    }, []);

    return (
        <Box
            sx={{
                height: {
                    xs: '150px',
                    sm: '200px',
                    md: '210px',
                },
                overflowY: 'auto',
                border: '1px solid #ccc',
                borderRadius: '20px',
                padding: '8px',
                width: {
                    xs: '90vw',
                    sm: '80vw',
                    md: '60vw',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    px: 2,
                    marginLeft: '3vw',
                    justifyContent: 'flex-start',
                }}
            >
                {iconData.map((item) => (
                    <Box
                        key={item.custom_id}
                        onClick={() => {
                            setSelectedId(item.custom_id);
                            onChange(item.custom_id); // ← これはクリック時にだけ実行されるのでOK
                        }}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: {
                                xs: '10vw',
                                sm: '8vw',
                                md: '6vw',
                            },
                            mt: 2,
                            p: 1,
                            borderRadius: 2,
                            border: '2px solid',
                            borderColor:
                                selectedId === item.custom_id
                                    ? '#ff4500'
                                    : '#000000',
                            cursor: 'pointer',
                            transition: 'border-color 0.3s',
                            '&:hover': {
                                borderColor: '#4169e1',
                                color: '#4169e1',
                            },
                            color:
                                selectedId === item.custom_id
                                    ? '#ff4500'
                                    : '#000000',
                        }}
                    >
                        <Box
                            component="img"
                            src={item.icon_path || ''}
                            sx={{
                                width: '60%',
                                height: 'auto',
                            }}
                        />
                        <Box
                            component="span"
                            sx={{
                                mt: 1,
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                wordBreak: 'break-word',
                            }}
                        >
                            {item.icon_naming || ''}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
IconSelect.propTypes = {
    // value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
