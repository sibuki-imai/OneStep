import React from 'react';
import Box from '@mui/material/Box';
import Menubar from '../components/menubar';
import Header from '../components/header';
import Calendar from '../components/calendar';
import IconSelect from '../components/IconSelect';
import InputNominal from '../components/parts/inputNominal';
import InputMoney from '../components/parts/inputMoney';

function Input() {
    return (
        <div>
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
