import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { ThemeProvider, createTheme } from '@mui/material';
import { DateCalendar, PickersCalendarHeader } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { jaJP } from '@mui/x-date-pickers/locales';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/system';
import { ja } from 'date-fns/locale';

class DateAdapter extends AdapterDateFns {
    constructor(...args) {
        super(...args);
        this.locale = ja; // 日本語ロケールを設定
    }
    getWeekdays = () => ['日', '月', '火', '水', '木', '金', '土'];

    format(date, formatStr) {
        if (formatStr === 'yyyy年 MM月') {
            return `${date.getFullYear()}年 ${date.getMonth() + 1}月`; // 月は0から始まるため+1
        }
        return super.format(date, formatStr);
    }
}

// カスタムヘッダーコンポーネント
const CustomCalendarHeader = (props) => {
    const {
        onViewChange,
        onMonthChange,
        currentView,
        setCurrentView,
        currentMonth,
        ...other
    } = props;

    // ビュー切り替え用関数
    const handleSwitchView = () => {
        const nextView = currentView === 'day' ? 'year' : 'day'; // 日→年、年→日
        setCurrentView(nextView);
        if (onViewChange) {
            onViewChange(nextView);
        }
    };

    return (
        <PickersCalendarHeader
            {...other}
            onViewChange={onViewChange} // Material-UI内部のビュー切り替えを保持
            onMonthChange={onMonthChange} // 月変更イベントを保持
            label={`${format(currentMonth, 'yyyy年 M月')}`} // 年月フォーマットを適用
            componentsProps={{
                switchViewButton: {
                    onClick: handleSwitchView, // ボタンをクリックしてビュー切り替え
                },
            }}
            sx={{
                '& .MuiPickersCalendarHeader-labelContainer': {
                    display: 'flex',
                    flexDirection: 'row-reverse', // 年を月の前に表示
                    gap: '8px',
                },
            }}
        />
    );
};

CustomCalendarHeader.propTypes = {
    onViewChange: PropTypes.func,
    onMonthChange: PropTypes.func,
    currentView: PropTypes.string.isRequired,
    setCurrentView: PropTypes.func.isRequired,
    currentMonth: PropTypes.instanceOf(Date).isRequired,
};

const Calendar = () => {
    const TODAY = new Date();
    const [selectedDate, setSelectedDate] = useState(TODAY);
    const [currentView, setCurrentView] = useState('day'); // 初期ビューを「日」に設定

    const theme = createTheme({}, jaJP); // MUIで日本語を有効化

    const onChangeHandler = (date) => {
        if (!date) return;
        setSelectedDate(date);
        console.log(`選択された日付: ${date.toLocaleDateString()}`);
    };

    return (
        <Box
            sx={{
                marginTop: '14%',
                marginLeft: '8%',
                width: '80%',
                height: '80%',
            }}
        >
            <ThemeProvider theme={theme}>
                <LocalizationProvider
                    dateAdapter={DateAdapter}
                    dateFormats={{
                        monthAndYear: 'yyyy年 MM月 ', // 年月の形式
                        monthShort: 'MM月', // 短縮表記
                    }}
                >
                    <DateCalendar
                        value={selectedDate}
                        onChange={onChangeHandler}
                        views={['year', 'month', 'day']} // 年 → 月 → 日の順番で選択可能
                        openTo="day" // 初期表示は「日」のビュー
                        onViewChange={(view) => setCurrentView(view)} // ビュー変更を管理
                        components={{
                            CalendarHeader: (props) => (
                                <CustomCalendarHeader
                                    {...props}
                                    currentView={currentView}
                                    setCurrentView={setCurrentView}
                                    CustomCalendarHeader
                                />
                            ),
                        }}
                    />
                </LocalizationProvider>
            </ThemeProvider>
        </Box>
    );
};

export default Calendar;
