import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; // PropTypesをインポート

// Contextを作成
const DateContext = createContext();

// Contextを提供するプロバイダーを作成
export const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // 初期値は現在の日付

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};

// 型チェックを追加
DateProvider.propTypes = {
    children: PropTypes.node.isRequired, // childrenは必須のノード
};

// Contextを使いやすくするカスタムフック
export const useDate = () => useContext(DateContext);
