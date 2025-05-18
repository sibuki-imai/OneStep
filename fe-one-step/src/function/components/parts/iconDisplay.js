import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
// import { margin, width } from '@mui/system';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { textAlign } from '@mui/system';

const IconDisplay = ({ onClose, onSelectSuccess }) => {
    const [icons, setIcons] = useState([]); // 初期値は空配列で安全に

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BE_DOMAIN}/api/common/icon/all`, {
                withCredentials: true, // 認証情報が必要なら追加
            })
            .then((res) => {
                const fetchedIcons = res.data.data || [];
                setIcons(fetchedIcons);
            })
            .catch((err) => {
                console.error('アイコン取得エラー:', err);
            });
    }, []);

    return (
        <div>
            <Box
                sx={{
                    width: '80%',
                    height: '80vh',
                    backgroundColor: 'lightblue',
                    mt: '10vh',
                    mx: 'auto',
                    background: '#e0ffff',
                    borderRadius: '20px',
                    border: '1px solid #333',
                    flexWrap: 'wrap',
                    justifyContent: ' space-around',
                    gap: 2,
                    px: 4,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between', // 左右に分ける
                        width: '100%',
                    }}
                >
                    <CloseRoundedIcon
                        sx={{
                            marginTop: '1%',
                            border: '1px solid #333',
                        }}
                        onClick={onClose}
                    />
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <h2>アイコン一覧</h2>
                    </Box>

                    <Box sx={{ width: '24px' }} />
                </Box>
                {icons.length > 0 ? (
                    icons.map((icon) => (
                        <Box
                            key={icon.icon_id}
                            component="button"
                            type="button"
                            onClick={() => {
                                // 選択されたアイコン情報を親に渡す
                                onSelectSuccess({
                                    iconId: icon.icon_id,
                                    iconPath: icon.icon_path,
                                });

                                // モーダルを閉じる
                                onClose();
                            }}
                            sx={{
                                all: 'unset', // デフォルトのbuttonスタイルをリセット
                                cursor: 'pointer',
                                display: 'inline-block',
                                m: 1,
                                px: 2,
                                border: '1px solid #333',
                                borderRadius: '10px',
                            }}
                        >
                            <Box
                                component="img"
                                src={icon.icon_path || ''}
                                alt={icon.icon_image_name}
                                sx={{
                                    width: {
                                        xs: '40px',
                                        sm: '50px',
                                        md: '60px',
                                    },
                                    height: 'auto',
                                }}
                            />
                        </Box>
                    ))
                ) : (
                    <p>アイコンがありません。</p>
                )}
            </Box>
        </div>
    );
};

IconDisplay.propTypes = {
    onClose: PropTypes.func.isRequired,
    iconId: PropTypes.number,
    onSelectSuccess: PropTypes.func,
};
export default IconDisplay;
