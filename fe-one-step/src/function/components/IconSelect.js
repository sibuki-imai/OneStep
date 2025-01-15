import * as React from 'react';
import { Box } from '@mui/system';

const IconSelect = () => {
    return (
        <div>
            <Box // 枠全体
                sx={{
                    width: '80%',
                    height: '130px',
                    marginLeft: '10%',
                    overflow: 'auto',
                    backgroundColor: '#f0f8ff',
                    display: 'flex',
                    marginTop: '2%',
                    borderRadius: '20px' /*角の丸み*/,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                    }}
                >
                    {/* 食費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/food.png"
                            alt="Food Icon"
                            sx={{
                                width: '100%',
                                objectFit: 'contain',
                            }}
                        />
                        <span style={{ fontSize: '12px', display: 'block' }}>
                            食費
                        </span>
                    </Box>

                    {/* 日用雑費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/dailyNecessities.png"
                            alt="DailyNecessities Icon"
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
                            日用品
                        </span>
                    </Box>

                    {/* 衣服費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/clothes.png"
                            alt="Clothes Icon"
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
                            衣服費
                        </span>
                    </Box>
                    {/* 理美容費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/beauty.png"
                            alt="Beauty Icon"
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
                            美容費
                        </span>
                    </Box>

                    {/* 学習費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/study.png"
                            alt="Study Icon"
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
                            学習費
                        </span>
                    </Box>

                    {/* 家賃 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/rent.png"
                            alt="Rent Icon"
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
                            家賃
                        </span>
                    </Box>

                    {/* 熱費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/gas.png"
                            alt="Gas Icon"
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
                            熱費
                        </span>
                    </Box>
                    {/* 水道費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/waterSupply.png"
                            alt="WaterSupply Icon"
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
                            水道費
                        </span>
                    </Box>

                    {/* 光費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/electricity.png"
                            alt="Electricity Icon"
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
                            光費
                        </span>
                    </Box>

                    {/* 通信費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/communication.png"
                            alt="Communication Icon"
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
                            通信費
                        </span>
                    </Box>
                    {/*  お小遣い */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/pocketMoney.png"
                            alt="PocketMoney Icon"
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
                            小遣い
                        </span>
                    </Box>
                    {/*  医療費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/medicalCare.png"
                            alt="MedicalCare Icon"
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
                            医療費
                        </span>
                    </Box>

                    {/*  貯金 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/saving.png"
                            alt="Saving Icon"
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
                            貯金
                        </span>
                    </Box>
                    {/*  交通費 */}
                    <Box
                        sx={{
                            width: '12%',
                            marginLeft: '6%',
                            textAlign: 'center', // 子要素を中央揃え
                            marginTop: '3%',

                            padding: '0.5em 0.5em',
                            color: '#000' /*文字色*/,
                            border: 'solid 1px #000' /*線*/,
                            borderRadius: '10px' /*角の丸み*/,
                        }}
                    >
                        <Box
                            component="img"
                            src="img/traffic.png"
                            alt="Traffic Icon"
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
                            交通費
                        </span>
                    </Box>

                    {/* icon終わり */}
                </Box>
            </Box>
        </div>
    );
};
export default IconSelect;
