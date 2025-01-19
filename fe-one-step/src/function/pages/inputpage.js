import React from 'react';
import Box from '@mui/material/Box';
import Menubar from '../components/menubar';
import Header from '../components/header';
import Calendar from '../components/calendar';
import IconSelect from '../components/IconSelect';
import InputNominal from '../components/parts/inputNominal';
import InputMoney from '../components/parts/inputMoney';
import DateDisplay from '../components/parts/dateDisplay';

function Input() {
    return (
        <div>
            <DateDisplay />
            <Menubar />
            <Header />
            <Calendar />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                }}
            >
                <InputMoney />
                <InputNominal />
            </Box>
            <IconSelect />
        </div>
    );
}

export default Input;
