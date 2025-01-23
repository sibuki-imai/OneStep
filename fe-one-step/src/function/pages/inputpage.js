import React from 'react';
import Box from '@mui/material/Box';
import Menubar from '../components/menubar';
import Header from '../components/header';
import Calendar from '../components/calendar';
import IconSelect from '../components/IconSelect';
import InputNominal from '../components/parts/inputNominal';
import InputMoney from '../components/parts/inputMoney';
import DateDisplay from '../components/parts/dateDisplay';
import { DateProvider } from '../joint/DateContext';
import SendButton from '../components/parts/sendButton';

function Input() {
    return (
        <div>
            <DateProvider>
                <Menubar />
                <Header />
                <DateDisplay />
                <InputMoney />
                <Box
                    sx={{
                        marginTop: '-13%',
                        marginLeft: '85%',
                    }}
                >
                    <SendButton />
                </Box>

                <Calendar />
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                    }}
                >
                    <InputNominal />
                </Box>
                <IconSelect />
            </DateProvider>
        </div>
    );
}

export default Input;
