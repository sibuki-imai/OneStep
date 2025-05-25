import React from 'react';
import Menuber from '../components/parts/iconlogo';
function ReportPage() {
    const handle = () => {
        console.log('test', `${process.env.REACT_APP_FE_DOMAIN}/record-input`);
        window.location.href = `${process.env.REACT_APP_FE_DOMAIN}/record-input`;
    };
    return (
        <div>
            <Menuber />
            <h1>レポート</h1>
            <h1>Coming Soon</h1>
            <button type="button" onClick={handle}>
                Home遷移
            </button>
        </div>
    );
}

export default ReportPage;
