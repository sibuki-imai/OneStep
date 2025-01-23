import React, { useState } from 'react';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

// 各アイコンデータをリスト化
const icons = [
    { id: 'food', src: 'img/food.png', label: '食費' },
    { id: 'daily', src: 'img/dailyNecessities.png', label: '日用品' },
    { id: 'clothes', src: 'img/clothes.png', label: '衣服費' },
    { id: 'beauty', src: 'img/beauty.png', label: '美容費' },
    { id: 'study', src: 'img/study.png', label: '学習費' },
    { id: 'rent', src: 'img/rent.png', label: '家賃' },
    { id: 'gas', src: 'img/gas.png', label: '熱費' },
    { id: 'water', src: 'img/waterSupply.png', label: '水道費' },
    { id: 'electricity', src: 'img/electricity.png', label: '光費' },
    { id: 'communication', src: 'img/communication.png', label: '通信費' },
    { id: 'pocket', src: 'img/pocketMoney.png', label: '小遣い' },
    { id: 'medical', src: 'img/medicalCare.png', label: '医療費' },
    { id: 'saving', src: 'img/saving.png', label: '貯金' },
    { id: 'traffic', src: 'img/traffic.png', label: '交通費' },
];

// 再利用可能なアイコンコンポーネント
const IconButton = ({ icon, onClick, isSelected }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                width: '12%',
                marginLeft: '6%',
                textAlign: 'center',
                marginTop: '3%',
                padding: '0.5em 0.5em',
                color: isSelected ? '#ff0059' : '#000', // 選択時の文字色
                borderColor: isSelected ? '#ff0059' : '#000', // 選択時の外枠色
                border: 'solid 2px', // ボーダーの太さを統一
                borderRadius: '10px',
                cursor: 'pointer', // マウスカーソルをポインタに
                '&:hover': {
                    borderColor: isSelected ? '#ff0059' : '', // ホバー時の外枠色
                },
            }}
        >
            <Box
                component="img"
                src={icon.src}
                alt={`${icon.label} Icon`}
                sx={{
                    width: '100%',
                    objectFit: 'contain',
                }}
            />
            <span
                style={{
                    fontSize: '12px',
                    display: 'block',
                    whiteSpace: 'nowrap',
                }}
            >
                {icon.label}
            </span>
        </Box>
    );
};

const IconSelect = () => {
    const [selected, setSelected] = useState(null);

    const handleClick = (id) => {
        setSelected(id); // 選択状態の更新
        console.log(`${id} clicked`);
    };

    return (
        <div>
            <Box
                sx={{
                    width: '80%',
                    height: '130px',
                    marginLeft: '10%',
                    overflow: 'auto',
                    backgroundColor: '#f0f8ff',
                    display: 'flex',
                    marginTop: '2%',
                    borderRadius: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                    }}
                >
                    {icons.map((icon) => (
                        <IconButton
                            key={icon.id}
                            icon={icon}
                            onClick={() => handleClick(icon.id)}
                            isSelected={selected === icon.id}
                        />
                    ))}
                </Box>
            </Box>
        </div>
    );
};
IconButton.propTypes = {
    icon: PropTypes.shape({
        src: PropTypes.string.isRequired, // iconオブジェクト内のsrcプロパティ（必須）
        label: PropTypes.string.isRequired, // iconオブジェクト内のlabelプロパティ（必須）
    }).isRequired,
    onClick: PropTypes.func.isRequired, // onClickは必須の関数
    isSelected: PropTypes.bool.isRequired, // isSelectedは必須のブール値
};

export default IconSelect;
