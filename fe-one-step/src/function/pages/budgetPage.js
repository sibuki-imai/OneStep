import React from 'react';
import Menuber from '../components/parts/iconlogo';
import BudegetAll from '../components/budegetAll';

function budgetPage() {
    const handle = () => {
        console.log('test', `${process.env.REACT_APP_FE_DOMAIN}/record-input`);
        window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/record-input`;
    };
    return (
        <div>
            <Menuber />
            <h1>予算</h1>
            <button type="button" onClick={handle}>
                Home遷移
            </button>
            <BudegetAll />
        </div>
    );
}

export default budgetPage;
